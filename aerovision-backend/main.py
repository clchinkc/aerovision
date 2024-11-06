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

# Add predefined waste types
WASTE_TYPES = [
    "Plastic Waste",
    "Metal Waste",
    "Food Waste",
    "Paper Waste",
    "Glass Waste",
    "Textile Waste",
    "Electronic Waste",
]

class WasteItem(BaseModel):
    waste_type: str = Field(description="Type of waste material", enum=WASTE_TYPES)
    quantity: float = Field(description="Weight in kilograms")
    recyclable: bool = Field(description="Whether the waste is recyclable")

class WasteAnalysis(BaseModel):
    visible_weight: float = Field(description="Estimated visible weight in kilograms")
    hidden_weight: Optional[float] = Field(description="Weight of hidden/obscured waste")
    items: List[WasteItem] = Field(description="List of individual waste items")

@dataclass
class AnalysisResult:
    """Container for analysis results and metadata"""
    analysis: WasteAnalysis
    timestamp: str
    flight_id: Optional[str] = None

@ell.complex(
    client=client,
    model="gpt-4o",
    temperature=0.1,
    response_format=WasteAnalysis
)
def analyze_waste_image(image: Image.Image) -> WasteAnalysis:
    """Analyze waste image and provide structured analysis."""
    return [
        ell.system(f"""You are a waste analysis expert. Analyze the image and:
        1. Identify all different types of visible waste from this list: {', '.join(WASTE_TYPES)}
        2. Estimate relative proportions and approximate weights of visible waste
        3. Determine recyclability of each waste type
        
        Focus only on visible waste in the image. Do not try to guess hidden waste.
        Provide weight estimates in kilograms based on visual assessment.
        
        Return the analysis in a structured format with:
        - visible_weight: Total estimated weight of visible waste
        - items: List of waste items with type, estimated weight, and recyclability
        """),
        ell.user([
            "Please analyze this waste image and provide detailed waste analysis.",
            image
        ])
    ]

def adjust_weights(analysis: WasteAnalysis, total_weight: Optional[float] = None) -> WasteAnalysis:
    """Adjust waste item weights if total weight is provided."""
    if total_weight is None:
        return analysis
    
    visible_weight = analysis.visible_weight
    if visible_weight == 0:
        return analysis
    
    # Calculate hidden weight
    hidden_weight = max(0, total_weight - visible_weight)
    
    # Calculate visible ratio (e.g., if visible_weight is 5kg and total_weight is 10kg, ratio is 0.5)
    visible_ratio = visible_weight / total_weight if total_weight > 0 else 0
    
    if visible_ratio > 0:
        # Scale up each item's weight by dividing by the visible ratio
        # For example: if an item is 0.5kg and visible_ratio is 0.5, 
        # the true weight should be 0.5/0.5 = 1.0kg
        adjusted_items = []
        for item in analysis.items:
            adjusted_item = WasteItem(
                waste_type=item.waste_type,
                quantity=item.quantity / visible_ratio,
                recyclable=item.recyclable,
            )
            adjusted_items.append(adjusted_item)
        
        return WasteAnalysis(
            visible_weight=total_weight - hidden_weight,
            hidden_weight=hidden_weight,
            items=adjusted_items,
        )
    
    return analysis

def analyze_real_image(image_path: str, total_weight: Optional[float] = None, flight_id: Optional[str] = None) -> AnalysisResult:
    """Analyze a real waste image and provide detailed analysis."""
    try:
        # Load and process image
        image = Image.open(image_path)
        
        # Get initial analysis from LLM
        analysis = analyze_waste_image(image)
        result = analysis.parsed
        
        # Adjust weights if total_weight is provided
        if total_weight is not None:
            result = adjust_weights(result, total_weight)
        
        # Create AnalysisResult with metadata
        return AnalysisResult(
            analysis=result,
            timestamp=datetime.datetime.now().isoformat(),
            flight_id=flight_id
        )
        
    except Exception as e:
        print(f"Error analyzing image: {str(e)}")
        raise

def main():
    # For testing with a real image
    image_path = "assets/WasteLandscape.jpg"
    total_weight = 10.0  # Optional: provide known total weight
    flight_id = "FL123"  # Optional: provide flight ID
    result = analyze_real_image(image_path, total_weight, flight_id)
    
    # Print analysis results
    print("\n=== Waste Analysis Results ===")
    print(f"Flight ID: {result.flight_id}")
    print(f"Timestamp: {result.timestamp}")
    print(f"Visible Weight: {result.analysis.visible_weight}kg")
    if result.analysis.hidden_weight:
        print(f"Hidden/Obscured Weight: {result.analysis.hidden_weight}kg")
    
    print("\nDetailed Breakdown:")
    recyclable_total = 0.0
    non_recyclable_total = 0.0
    
    for item in result.analysis.items:
        print(
            f"- {item.waste_type}: {item.quantity:.2f}kg "
            f"(Recyclable: {item.recyclable})"
        )
        if item.recyclable:
            recyclable_total += item.quantity
        else:
            non_recyclable_total += item.quantity
    
    total_analyzed = recyclable_total + non_recyclable_total
    print("\nSummary:")
    if total_analyzed > 0:
        print(f"Recyclable Waste: {recyclable_total:.2f}kg ({recyclable_total/total_analyzed*100:.1f}%)")
        print(f"Non-recyclable Waste: {non_recyclable_total:.2f}kg ({non_recyclable_total/total_analyzed*100:.1f}%)")
    else:
        print("No waste items were analyzed.")

if __name__ == "__main__":
    main()
