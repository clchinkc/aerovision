from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict
import os
from PIL import Image
import io
from datetime import datetime
from pydantic import BaseModel
import generativeai.waste_analyzer as waste_analyzer
from database import get_db
import json

app = FastAPI(title="AeroVision Waste Analysis API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WasteItemEntry(BaseModel):
    waste_type: str
    quantity: float
    recyclable: bool

class SubmitAnalysis(BaseModel):
    flight_id: str
    total_weight: Optional[float] = None

@app.post("/api/draft/{session_id}/items")
async def add_waste_item(session_id: str, item: WasteItemEntry):
    """Add a single waste item to the draft session"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            
            # Get existing items or create new list
            cursor.execute('SELECT items_json FROM draft_entries WHERE session_id = ?', (session_id,))
            result = cursor.fetchone()
            
            items = []
            if result:
                items = json.loads(result['items_json'])
            
            # Add new item
            waste_item = waste_analyzer.WasteItem(
                waste_type=item.waste_type,
                quantity=item.quantity,
                recyclable=item.recyclable
            )
            items.append(waste_item.dict())
            
            # Update or insert
            cursor.execute('''
                INSERT OR REPLACE INTO draft_entries (session_id, items_json)
                VALUES (?, ?)
            ''', (session_id, json.dumps(items)))
            
            conn.commit()
            return {"message": "Item added successfully", "items": items}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/draft/{session_id}/items/{item_index}")
async def remove_waste_item(session_id: str, item_index: int):
    """Remove a waste item from the draft session"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            
            # Get existing items
            cursor.execute('SELECT items_json FROM draft_entries WHERE session_id = ?', (session_id,))
            result = cursor.fetchone()
            
            items = json.loads(result['items_json'])
            
            if item_index < 0 or item_index >= len(items):
                raise HTTPException(status_code=404, detail="Item index out of range")
            
            # Remove item
            items.pop(item_index)
            
            # Update or insert
            cursor.execute('''
                INSERT OR REPLACE INTO draft_entries (session_id, items_json)
                VALUES (?, ?)
            ''', (session_id, json.dumps(items)))
            
            conn.commit()
            return {"message": "Item removed successfully", "items": items}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/draft/{session_id}")
async def get_draft_items(session_id: str):
    """Get all items in the draft session"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            
            # Get existing items
            cursor.execute('SELECT items_json FROM draft_entries WHERE session_id = ?', (session_id,))
            result = cursor.fetchone()
            
            items = json.loads(result['items_json'])
            
            return items
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/draft/{session_id}/submit")
async def submit_analysis(session_id: str, submission: SubmitAnalysis):
    """Submit the final analysis with all items"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            
            # Get existing items
            cursor.execute('SELECT items_json FROM draft_entries WHERE session_id = ?', (session_id,))
            result = cursor.fetchone()
            
            items = json.loads(result['items_json'])
            
            if not items:
                raise HTTPException(status_code=400, detail="No items to submit")
            
            # Calculate visible weight from items if not provided
            visible_weight = submission.total_weight or sum(item['quantity'] for item in items)
            
            # Create analysis
            analysis = waste_analyzer.WasteAnalysis(
                visible_weight=visible_weight,
                items=items
            )
            
            result = waste_analyzer.AnalysisResult(
                analysis=analysis,
                timestamp=datetime.now().isoformat(),
                flight_id=submission.flight_id
            )
            
            # Store final analysis
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO waste_analyses 
                    (timestamp, flight_id, visible_weight, hidden_weight, items_json)
                    VALUES (?, ?, ?, ?, ?)
                ''', (
                    result.timestamp,
                    result.flight_id,
                    result.analysis.visible_weight,
                    result.analysis.hidden_weight,
                    json.dumps([item.dict() for item in result.analysis.items])
                ))
                conn.commit()
            
            # Clear draft entries
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute('DELETE FROM draft_entries WHERE session_id = ?', (session_id,))
                conn.commit()
            
            return result
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/draft/{session_id}")
async def clear_draft(session_id: str):
    """Clear all items in the draft session"""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM draft_entries WHERE session_id = ?', (session_id,))
            conn.commit()
        return {"message": "Draft cleared successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze")
async def analyze_image(
    image: UploadFile = File(...),
    total_weight: Optional[float] = None,
    flight_id: Optional[str] = None
):
    try:
        # Read and process the uploaded image
        contents = await image.read()
        image_pil = Image.open(io.BytesIO(contents))
        
        # Save image temporarily (optional, for debugging)
        temp_path = f"temp_{datetime.now().timestamp()}.jpg"
        image_pil.save(temp_path)
        
        # Analyze the image
        result = waste_analyzer.analyze_real_image(
            temp_path,
            total_weight=total_weight,
            flight_id=flight_id
        )
        
        # Clean up temporary file
        os.remove(temp_path)
        
        # Store in database
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO waste_analyses 
                (timestamp, flight_id, visible_weight, hidden_weight, items_json)
                VALUES (?, ?, ?, ?, ?)
            ''', (
                result.timestamp,
                result.flight_id,
                result.analysis.visible_weight,
                result.analysis.hidden_weight,
                json.dumps([item.dict() for item in result.analysis.items])
            ))
            conn.commit()
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/history")
async def get_history(
    flight_id: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
):
    with get_db() as conn:
        cursor = conn.cursor()
        
        query = "SELECT * FROM waste_analyses WHERE 1=1"
        params = []
        
        if flight_id:
            query += " AND flight_id = ?"
            params.append(flight_id)
        
        if start_date:
            query += " AND timestamp >= ?"
            params.append(start_date)
        
        if end_date:
            query += " AND timestamp <= ?"
            params.append(end_date)
        
        cursor.execute(query, params)
        results = cursor.fetchall()
        
        return [{
            "id": row['id'],
            "timestamp": row['timestamp'],
            "flight_id": row['flight_id'],
            "analysis": {
                "visible_weight": row['visible_weight'],
                "hidden_weight": row['hidden_weight'],
                "items": json.loads(row['items_json'])
            }
        } for row in results]

@app.get("/api/waste-types")
async def get_waste_types():
    """Get the list of predefined waste types"""
    return waste_analyzer.WASTE_TYPES

# Add new endpoint for batch image upload
@app.post("/api/analyze/batch")
async def analyze_images_batch(
    images: List[UploadFile] = File(...),
    flight_id: Optional[str] = None,
    total_weight: Optional[float] = None
):
    """Analyze multiple waste images in a batch"""
    try:
        results = []
        for image in images:
            contents = await image.read()
            image_pil = Image.open(io.BytesIO(contents))
            
            temp_path = f"temp_{datetime.now().timestamp()}.jpg"
            image_pil.save(temp_path)
            
            result = waste_analyzer.analyze_real_image(
                temp_path,
                total_weight=total_weight,
                flight_id=flight_id
            )
            
            os.remove(temp_path)
            results.append(result)
            
        # Store all results in database
        with get_db() as conn:
            cursor = conn.cursor()
            for result in results:
                cursor.execute('''
                    INSERT INTO waste_analyses 
                    (timestamp, flight_id, visible_weight, hidden_weight, items_json)
                    VALUES (?, ?, ?, ?, ?)
                ''', (
                    result.timestamp,
                    result.flight_id,
                    result.analysis.visible_weight,
                    result.analysis.hidden_weight,
                    json.dumps([item.dict() for item in result.analysis.items])
                ))
            conn.commit()
        
        return results
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/statistics")
async def get_waste_statistics(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    flight_id: Optional[str] = None
):
    """Get waste statistics and trends"""
    with get_db() as conn:
        cursor = conn.cursor()
        
        query = """
            SELECT 
                SUM(visible_weight) as total_visible_weight,
                SUM(hidden_weight) as total_hidden_weight,
                COUNT(*) as total_analyses,
                AVG(visible_weight) as avg_visible_weight,
                items_json
            FROM waste_analyses 
            WHERE 1=1
        """
        params = []
        
        if flight_id:
            query += " AND flight_id = ?"
            params.append(flight_id)
            
        if start_date:
            query += " AND timestamp >= ?"
            params.append(start_date)
            
        if end_date:
            query += " AND timestamp <= ?"
            params.append(end_date)
            
        cursor.execute(query, params)
        result = cursor.fetchone()
        
        # Calculate waste type distribution
        all_items = []
        cursor.execute("SELECT items_json FROM waste_analyses")
        for row in cursor.fetchall():
            items = json.loads(row['items_json'])
            all_items.extend(items)
            
        waste_distribution = {}
        for item in all_items:
            waste_type = item['waste_type']
            if waste_type not in waste_distribution:
                waste_distribution[waste_type] = 0
            waste_distribution[waste_type] += item['quantity']
        
        return {
            "total_visible_weight": result['total_visible_weight'],
            "total_hidden_weight": result['total_hidden_weight'],
            "total_analyses": result['total_analyses'],
            "average_visible_weight": result['avg_visible_weight'],
            "waste_distribution": waste_distribution
        }

# Add new endpoint for manual waste entry without image
@app.post("/api/analyze/manual")
async def analyze_manual(
    items: List[WasteItemEntry],
    total_weight: Optional[float] = None,
    flight_id: Optional[str] = None
):
    """Submit waste analysis manually without image"""
    try:
        # Create analysis from manual entries
        analysis = waste_analyzer.WasteAnalysis(
            visible_weight=total_weight or sum(item.quantity for item in items),
            items=[waste_analyzer.WasteItem(**item.dict()) for item in items]
        )
        
        result = waste_analyzer.AnalysisResult(
            analysis=analysis,
            timestamp=datetime.now().isoformat(),
            flight_id=flight_id
        )
        
        # Store in database
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO waste_analyses 
                (timestamp, flight_id, visible_weight, hidden_weight, items_json)
                VALUES (?, ?, ?, ?, ?)
            ''', (
                result.timestamp,
                result.flight_id,
                result.analysis.visible_weight,
                result.analysis.hidden_weight,
                json.dumps([item.dict() for item in result.analysis.items])
            ))
            conn.commit()
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
