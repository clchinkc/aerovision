from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict
import os
from PIL import Image
import io
from datetime import datetime
from pydantic import BaseModel
import generativeai.chart_analyzer as chart_analyzer
from database import get_db
import json

app = FastAPI(title="AeroVision Chart Analysis API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        
        # Store in database
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO chart_analyses 
                (timestamp, chart_id, chart_type, time_period, 
                key_metrics_json, insights_json, recommendations_json)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                result.timestamp,
                result.chart_id,
                result.analysis.chart_type,
                result.analysis.time_period,
                json.dumps(result.analysis.key_metrics),
                json.dumps([i.dict() for i in result.analysis.insights]),
                json.dumps([r.dict() for r in result.analysis.recommendations])
            ))
            conn.commit()
        
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
    with get_db() as conn:
        cursor = conn.cursor()
        
        query = "SELECT * FROM chart_analyses WHERE 1=1"
        params = []
        
        if chart_id:
            query += " AND chart_id = ?"
            params.append(chart_id)
        
        if start_date:
            query += " AND timestamp >= ?"
            params.append(start_date)
        
        if end_date:
            query += " AND timestamp <= ?"
            params.append(end_date)
        
        query += " ORDER BY timestamp DESC"
        
        if limit:
            query += " LIMIT ?"
            params.append(limit)
        
        cursor.execute(query, params)
        results = cursor.fetchall()
        
        return [{
            "id": row['id'],
            "timestamp": row['timestamp'],
            "chart_id": row['chart_id'],
            "analysis": {
                "chart_type": row['chart_type'],
                "time_period": row['time_period'],
                "key_metrics": json.loads(row['key_metrics_json']),
                "insights": json.loads(row['insights_json']),
                "recommendations": json.loads(row['recommendations_json'])
            }
        } for row in results]

@app.get("/api/charts/categories")
async def get_analysis_categories():
    """Get the list of predefined analysis categories"""
    return chart_analyzer.ANALYSIS_CATEGORIES

@app.get("/api/charts/{chart_id}")
async def get_chart_analysis(chart_id: str):
    """Get a specific chart analysis by ID"""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM chart_analyses WHERE chart_id = ?", (chart_id,))
        row = cursor.fetchone()
        
        if not row:
            raise HTTPException(status_code=404, detail="Chart analysis not found")
        
        return {
            "id": row['id'],
            "timestamp": row['timestamp'],
            "chart_id": row['chart_id'],
            "analysis": {
                "chart_type": row['chart_type'],
                "time_period": row['time_period'],
                "key_metrics": json.loads(row['key_metrics_json']),
                "insights": json.loads(row['insights_json']),
                "recommendations": json.loads(row['recommendations_json'])
            }
        }

# Add new endpoint for trend analysis
@app.get("/api/charts/trends")
async def analyze_trends(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    chart_type: Optional[str] = None
):
    """Get trend analysis across multiple chart analyses"""
    with get_db() as conn:
        cursor = conn.cursor()
        
        query = """
            SELECT 
                chart_type,
                COUNT(*) as analysis_count,
                insights_json,
                recommendations_json
            FROM chart_analyses
            WHERE 1=1
        """
        params = []
        
        if chart_type:
            query += " AND chart_type = ?"
            params.append(chart_type)
            
        if start_date:
            query += " AND timestamp >= ?"
            params.append(start_date)
            
        if end_date:
            query += " AND timestamp <= ?"
            params.append(end_date)
            
        query += " GROUP BY chart_type"
        
        cursor.execute(query, params)
        results = cursor.fetchall()
        
        trends = []
        for row in results:
            insights = json.loads(row['insights_json'])
            recommendations = json.loads(row['recommendations_json'])
            
            trends.append({
                "chart_type": row['chart_type'],
                "analysis_count": row['analysis_count'],
                "common_insights": [i for i in insights if i['confidence'] > 0.8],
                "top_recommendations": sorted(
                    recommendations, 
                    key=lambda x: x['priority'], 
                    reverse=True
                )[:3]
            })
            
        return trends

# Add endpoint for comparative analysis
@app.post("/api/charts/compare")
async def compare_charts(chart_ids: List[str]):
    """Compare multiple chart analyses"""
    with get_db() as conn:
        cursor = conn.cursor()
        
        analyses = []
        for chart_id in chart_ids:
            cursor.execute(
                "SELECT * FROM chart_analyses WHERE chart_id = ?", 
                (chart_id,)
            )
            row = cursor.fetchone()
            if row:
                analyses.append({
                    "chart_id": row['chart_id'],
                    "chart_type": row['chart_type'],
                    "time_period": row['time_period'],
                    "key_metrics": json.loads(row['key_metrics_json']),
                    "insights": json.loads(row['insights_json'])
                })
        
        if not analyses:
            raise HTTPException(
                status_code=404, 
                detail="No charts found for comparison"
            )
            
        return {
            "analyses": analyses,
            "common_metrics": list(set.intersection(*[
                set(a['key_metrics']) for a in analyses
            ])),
            "timeline": sorted(set(
                a['time_period'] for a in analyses if a['time_period']
            ))
        }
