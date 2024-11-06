from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict
import os
from PIL import Image
import io
from datetime import datetime
from pydantic import BaseModel
import prototype as waste_analyzer

app = FastAPI(title="AeroVision Waste Analysis API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary storage for draft entries (replace with database in production)
draft_entries: Dict[str, List[waste_analyzer.WasteItem]] = {}
analysis_storage = []

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
        if session_id not in draft_entries:
            draft_entries[session_id] = []
            
        waste_item = waste_analyzer.WasteItem(
            waste_type=item.waste_type,
            quantity=item.quantity,
            recyclable=item.recyclable
        )
        
        draft_entries[session_id].append(waste_item)
        return {"message": "Item added successfully", "items": draft_entries[session_id]}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/draft/{session_id}/items/{item_index}")
async def remove_waste_item(session_id: str, item_index: int):
    """Remove a waste item from the draft session"""
    try:
        if session_id not in draft_entries:
            raise HTTPException(status_code=404, detail="Session not found")
            
        if item_index < 0 or item_index >= len(draft_entries[session_id]):
            raise HTTPException(status_code=404, detail="Item index out of range")
            
        draft_entries[session_id].pop(item_index)
        return {"message": "Item removed successfully", "items": draft_entries[session_id]}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/draft/{session_id}")
async def get_draft_items(session_id: str):
    """Get all items in the draft session"""
    if session_id not in draft_entries:
        draft_entries[session_id] = []
    return draft_entries[session_id]

@app.post("/api/draft/{session_id}/submit")
async def submit_analysis(session_id: str, submission: SubmitAnalysis):
    """Submit the final analysis with all items"""
    try:
        if session_id not in draft_entries:
            raise HTTPException(status_code=404, detail="Session not found")
            
        items = draft_entries[session_id]
        if not items:
            raise HTTPException(status_code=400, detail="No items to submit")
            
        # Calculate visible weight from items if not provided
        visible_weight = submission.total_weight or sum(item.quantity for item in items)
        
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
        analysis_storage.append({
            "id": len(analysis_storage),
            "timestamp": result.timestamp,
            "flight_id": result.flight_id,
            "analysis": result.analysis.dict()
        })
        
        # Clear draft entries
        del draft_entries[session_id]
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/draft/{session_id}")
async def clear_draft(session_id: str):
    """Clear all items in the draft session"""
    if session_id in draft_entries:
        del draft_entries[session_id]
    return {"message": "Draft cleared successfully"}

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
        
        # Store analysis result
        analysis_storage.append({
            "id": len(analysis_storage),
            "timestamp": result.timestamp,
            "flight_id": result.flight_id,
            "analysis": result.analysis.dict()
        })
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/history")
async def get_history(
    flight_id: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
):
    filtered_results = analysis_storage
    
    if flight_id:
        filtered_results = [r for r in filtered_results if r["flight_id"] == flight_id]
    
    if start_date:
        start = datetime.fromisoformat(start_date)
        filtered_results = [
            r for r in filtered_results 
            if datetime.fromisoformat(r["timestamp"]) >= start
        ]
    
    if end_date:
        end = datetime.fromisoformat(end_date)
        filtered_results = [
            r for r in filtered_results 
            if datetime.fromisoformat(r["timestamp"]) <= end
        ]
    
    return filtered_results

@app.get("/api/waste-types")
async def get_waste_types():
    """Get the list of predefined waste types"""
    return waste_analyzer.WASTE_TYPES
