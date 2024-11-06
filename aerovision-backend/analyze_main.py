from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict
import os
from PIL import Image
import io
from datetime import datetime
from pydantic import BaseModel
import analyze_prototype as chart_analyzer

app = FastAPI(title="AeroVision Chart Analysis API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Storage for analysis results (replace with database in production)
analysis_storage = []

@app.post("/api/charts/analyze")
async def analyze_chart(
    image: UploadFile = File(...),
    chart_id: Optional[str] = None
):
    """Analyze a chart image using AI"""
    try:
        # Validate file type
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
            
        # Read and process the uploaded image
        contents = await image.read()
        image_pil = Image.open(io.BytesIO(contents))
        
        # Save image temporarily
        temp_path = f"temp_chart_{datetime.now().timestamp()}.jpg"
        image_pil.save(temp_path)
        
        # Analyze the chart
        result = chart_analyzer.analyze_chart(
            temp_path,
            chart_id=chart_id
        )
        
        # Clean up temporary file
        os.remove(temp_path)
        
        # Store analysis result
        analysis_entry = {
            "id": len(analysis_storage),
            "timestamp": result.timestamp,
            "chart_id": result.chart_id,
            "analysis": result.analysis.dict()
        }
        analysis_storage.append(analysis_entry)
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/charts/history")
async def get_analysis_history(
    chart_id: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    limit: Optional[int] = None
):
    """Get historical chart analyses with optional filters"""
    filtered_results = analysis_storage
    
    if chart_id:
        filtered_results = [r for r in filtered_results if r["chart_id"] == chart_id]
    
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
    
    # Sort by timestamp in descending order (newest first)
    filtered_results.sort(
        key=lambda x: datetime.fromisoformat(x["timestamp"]), 
        reverse=True
    )
    
    # Apply limit if specified
    if limit:
        filtered_results = filtered_results[:limit]
    
    return filtered_results

@app.get("/api/charts/categories")
async def get_analysis_categories():
    """Get the list of predefined analysis categories"""
    return chart_analyzer.ANALYSIS_CATEGORIES

@app.get("/api/charts/{chart_id}")
async def get_chart_analysis(chart_id: str):
    """Get a specific chart analysis by ID"""
    results = [r for r in analysis_storage if r["chart_id"] == chart_id]
    if not results:
        raise HTTPException(status_code=404, detail="Chart analysis not found")
    return results[0]
