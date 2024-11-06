import os
from dotenv import load_dotenv
import ell
from typing import List, Optional
from PIL import Image
from pydantic import BaseModel, Field
from openai import AzureOpenAI
import datetime
from dataclasses import dataclass

# Initialize ell with local storage
ell.init(store='./logdir')

load_dotenv()

# Azure OpenAI Client Configuration
client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
)

# Define analysis categories
ANALYSIS_CATEGORIES = [
    "Trend Analysis",
    "Pattern Recognition",
    "Anomaly Detection",
    "Correlation Analysis",
    "Seasonal Variations",
]

class InsightPoint(BaseModel):
    category: str = Field(description="Type of analysis insight", enum=ANALYSIS_CATEGORIES)
    description: str = Field(description="Detailed description of the insight")
    confidence: float = Field(description="Confidence level (0-1)")

class RecommendationItem(BaseModel):
    title: str = Field(description="Brief title of the recommendation")
    description: str = Field(description="Detailed description of the recommendation")
    priority: int = Field(description="Priority level (1-5)")
    estimated_impact: str = Field(description="Estimated impact of implementing this recommendation")

class ChartAnalysis(BaseModel):
    chart_type: str = Field(description="Type of chart detected")
    time_period: Optional[str] = Field(description="Time period covered by the data")
    key_metrics: List[str] = Field(description="Key metrics identified in the chart")
    insights: List[InsightPoint] = Field(description="List of analytical insights")
    recommendations: List[RecommendationItem] = Field(description="Action recommendations")

@dataclass
class AnalysisResult:
    """Container for analysis results and metadata"""
    analysis: ChartAnalysis
    timestamp: str
    chart_id: Optional[str] = None

@ell.complex(
    client=client,
    model="gpt-4o",
    temperature=0.1,
    response_format=ChartAnalysis
)
def analyze_chart_image(image: Image.Image) -> ChartAnalysis:
    """Analyze chart image and provide structured analysis and insights."""
    return [
        ell.system("""You are a data analysis expert. Analyze the chart image and provide:
        1. Identify the type of chart and key metrics shown
        2. Extract meaningful insights across different analysis categories
        3. Provide actionable recommendations based on the insights
        
        Focus on clear patterns and statistically significant insights.
        Provide confidence levels for each insight based on visual clarity and data quality.
        
        Return the analysis in a structured format with:
        - chart_type: Type of visualization
        - time_period: Time range shown (if applicable)
        - key_metrics: Main metrics being visualized
        - insights: List of analytical insights with categories and confidence levels
        - recommendations: Actionable recommendations with priority levels
        """),
        ell.user([
            "Please analyze this chart and provide detailed insights and recommendations.",
            image
        ])
    ]

def analyze_chart(image_path: str, chart_id: Optional[str] = None) -> AnalysisResult:
    """Analyze a chart image and provide detailed analysis with insights."""
    try:
        # Load and process image
        image = Image.open(image_path)
        
        # Get analysis from LLM
        analysis = analyze_chart_image(image)
        result = analysis.parsed
        
        # Create AnalysisResult with metadata
        return AnalysisResult(
            analysis=result,
            timestamp=datetime.datetime.now().isoformat(),
            chart_id=chart_id
        )
        
    except Exception as e:
        print(f"Error analyzing chart: {str(e)}")
        raise

def main():
    # For testing with a sample chart
    image_path = "assets/CabinWaste.jpg"
    chart_id = "CH123"  # Optional: provide chart ID
    result = analyze_chart(image_path, chart_id)
    
    # Print analysis results
    print("\n=== Chart Analysis Results ===")
    print(f"Chart ID: {result.chart_id}")
    print(f"Timestamp: {result.timestamp}")
    print(f"Chart Type: {result.analysis.chart_type}")
    if result.analysis.time_period:
        print(f"Time Period: {result.analysis.time_period}")
    
    print("\nKey Metrics:")
    for metric in result.analysis.key_metrics:
        print(f"- {metric}")
    
    print("\nInsights:")
    for insight in result.analysis.insights:
        print(f"\nCategory: {insight.category}")
        print(f"Description: {insight.description}")
        print(f"Confidence: {insight.confidence:.2f}")
    
    print("\nRecommendations:")
    for rec in result.analysis.recommendations:
        print(f"\nTitle: {rec.title} (Priority: {rec.priority})")
        print(f"Description: {rec.description}")
        print(f"Estimated Impact: {rec.estimated_impact}")

if __name__ == "__main__":
    main()
