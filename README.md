# AeroVision

## Overview

AeroVision is a web application designed to streamline the process of waste data collection and analysis for flights. The application leverages modern web technologies and AI-driven insights to provide a comprehensive solution for managing and analyzing waste data. This project was developed as part of Cathay Hackathon 2024, focusing on rapid development and innovative solutions.

## Features

### Waste Data Collection

[![Waste Data Collection Flow](https://mermaid.ink/img/pako:eNp1VF1PGkEU_SubeWg0AQUWRTbRpNH0SZOmakwKPkx3R9l0Ych-pNWVRBsQKBhIih9Va6rWSluV2qaWtNb-GWaW_RcOrAJSOw-bO5tz7rmfYwIRSwgIYE7BL8QIVHVuaiwc49jRjGfzKoxHuEeKPB_RZ6CmozGow1GsKEjUZRzjQvXMZ6twSn4f0MOklf1E16v0zTYtXdg7q7OOl8ZpUXtCXdBa9TV59d1-v2K_O5jtvYfBDQ-PcNNxBUPpcQTr2HQYVurYyqYTXYRxWdND_ST10_5SagmR4ppVPieZzfp-mRaK1odf_R2hTWEdKjOokaBZv6yS1FGLaFX_2Om1Do221REQ96CtzbndI9zS-PhE_e26VVxd4iZ11RB1Q0VSI5dQj_WjSI9zJL9BN9J098SpgYvkUzR3QgoVsrPHakeXj0lmle4V65l0u1yVUu0qV7v8ap1t9t4ff1N9TNbiClx4gkSsSppp2vsVljHNLtPdbL28ZeeTCZZRm383wma177poQ-_-b6pNa0gdjWBZRKZVKtPMhb3CMursSxvRJDxU2JiNYlV1BkgLkdRKvXzukGt_z-jpoVOU2f-6mDSiUajKi4gN01meZorkKk_yFdatG2bHGHXLce6-RoccOVJYs49y3U1yyCgmOYbzbWk2C9S1D6EeWinQk_2bXbjKW9vJrjEnp1sk-e22b138m6AYgMFq1Y9O8_-NC7hAFKlRKEtsXc2GqzDQIyiKwkBgpgTV52EQjiUYDho6nlyIiUBgPpALqNiYjwBhDioauxlxCTJpGbL1jt5CkCTrWJ1wHoPmm-ACcRh7inELwq5AMMFLIPg83r7AgD_o9wUCg57AIO9zgQUguL3eYB8f9PKewBDv4QN-PuECi00PDD84EBzgeY-PH-L9Pl8wcQ3t0ewJ?type=png)](https://mermaid.live/edit#pako:eNp1VF1PGkEU_SubeWg0AQUWRTbRpNH0SZOmakwKPkx3R9l0Ych-pNWVRBsQKBhIih9Va6rWSluV2qaWtNb-GWaW_RcOrAJSOw-bO5tz7rmfYwIRSwgIYE7BL8QIVHVuaiwc49jRjGfzKoxHuEeKPB_RZ6CmozGow1GsKEjUZRzjQvXMZ6twSn4f0MOklf1E16v0zTYtXdg7q7OOl8ZpUXtCXdBa9TV59d1-v2K_O5jtvYfBDQ-PcNNxBUPpcQTr2HQYVurYyqYTXYRxWdND_ST10_5SagmR4ppVPieZzfp-mRaK1odf_R2hTWEdKjOokaBZv6yS1FGLaFX_2Om1Do221REQ96CtzbndI9zS-PhE_e26VVxd4iZ11RB1Q0VSI5dQj_WjSI9zJL9BN9J098SpgYvkUzR3QgoVsrPHakeXj0lmle4V65l0u1yVUu0qV7v8ap1t9t4ff1N9TNbiClx4gkSsSppp2vsVljHNLtPdbL28ZeeTCZZRm383wma177poQ-_-b6pNa0gdjWBZRKZVKtPMhb3CMursSxvRJDxU2JiNYlV1BkgLkdRKvXzukGt_z-jpoVOU2f-6mDSiUajKi4gN01meZorkKk_yFdatG2bHGHXLce6-RoccOVJYs49y3U1yyCgmOYbzbWk2C9S1D6EeWinQk_2bXbjKW9vJrjEnp1sk-e22b138m6AYgMFq1Y9O8_-NC7hAFKlRKEtsXc2GqzDQIyiKwkBgpgTV52EQjiUYDho6nlyIiUBgPpALqNiYjwBhDioauxlxCTJpGbL1jt5CkCTrWJ1wHoPmm-ACcRh7inELwq5AMMFLIPg83r7AgD_o9wUCg57AIO9zgQUguL3eYB8f9PKewBDv4QN-PuECi00PDD84EBzgeY-PH-L9Pl8wcQ3t0ewJ)

1. **Photo Upload and Analysis**: 
   - Users can upload photos of waste, which are analyzed using a Large Language Model (LLM) to identify waste types and estimate their quantities.
   - An input box is provided for users to enter the total weight of the waste, aiding the LLM in estimating proportions for each waste type.

2. **Manual Waste Type Input**:
   - A toggle button allows users to switch from photo upload to manual input mode.
   - In manual mode, users can select waste types from a dropdown menu and input quantities, ensuring data consistency.

3. **Structured Data Display**:
   - After analysis, structured data is displayed in a table format, including columns for waste type, estimated quantity, and recyclability status.

4. **Aggregated Summary**:
   - A summary table consolidates estimates and manual inputs, providing an overview of waste types and quantities.

5. **Data Management Options**:
   - A "Clear All" button allows users to reset all entries and analysis results.
   - A "Submit to Database" button saves the data to a shared database for future reference and analysis.

### Waste Data Analysis (Planned)

[![Waste Data Analysis Flow](https://mermaid.ink/img/pako:eNp9kl9r01AYxr9KOFcTstLmb5uLQVlBe-GVgmDjxVly1hxMk5KcqLX0thYctOI2cCsbnWNKoaxOpnMFP405zb6FJ8napeA8V-fwPr_3fV7O0waGayKggW3bfW1Y0CPc04rucOz4wVbdg02Lq0ACN13bRgbBrsPV6N4V_XhAd3_cHHZfpNr4PMI-cT1sQDsGamt08jPsX6TiB_fquPX1De4Z9AlKqag3nvcn4eyE7n9aZZFj_sNYBftNG7YWrsJve_PT68y0Zetk0Ga84S3CHKZIr0uPBuFwPxp9vRmdMzz89T3sT7Oes1zS6GFswK-tZeH_AuVq2YF2y8cMmu8e096gXL0PvtMmaNXxcd0iy2nzywE9Gka9d9HZ--jL5yyZ2kqo5Za3OyVTGJTtkUUXU7LwXXVllSQHcMtGZfMVNhDz1T-PRjvh7DqaTDWOXh2G0w90OP7zu0svx9HFbOULAQ8ayGtAbLLYteOCDoiFGkgHGrua0HupA93pMB0MiPuk5RhAI16AeOC5Qd0C2ja0ffYKmiZkf4shS0NjIUEmZul6nIY6yTYPmtB57rpLCXsCrQ3eAE0s5XNySZBVRZRkuSCpPGgBTVFzoiIogiCWikJJUQsdHrxN-HxOUUVJkovFvFQQ87Isdf4CV2JKew?type=png)](https://mermaid.live/edit#pako:eNp9kl9r01AYxr9KOFcTstLmb5uLQVlBe-GVgmDjxVly1hxMk5KcqLX0thYctOI2cCsbnWNKoaxOpnMFP405zb6FJ8napeA8V-fwPr_3fV7O0waGayKggW3bfW1Y0CPc04rucOz4wVbdg02Lq0ACN13bRgbBrsPV6N4V_XhAd3_cHHZfpNr4PMI-cT1sQDsGamt08jPsX6TiB_fquPX1De4Z9AlKqag3nvcn4eyE7n9aZZFj_sNYBftNG7YWrsJve_PT68y0Zetk0Ga84S3CHKZIr0uPBuFwPxp9vRmdMzz89T3sT7Oes1zS6GFswK-tZeH_AuVq2YF2y8cMmu8e096gXL0PvtMmaNXxcd0iy2nzywE9Gka9d9HZ--jL5yyZ2kqo5Za3OyVTGJTtkUUXU7LwXXVllSQHcMtGZfMVNhDz1T-PRjvh7DqaTDWOXh2G0w90OP7zu0svx9HFbOULAQ8ayGtAbLLYteOCDoiFGkgHGrua0HupA93pMB0MiPuk5RhAI16AeOC5Qd0C2ja0ffYKmiZkf4shS0NjIUEmZul6nIY6yTYPmtB57rpLCXsCrQ3eAE0s5XNySZBVRZRkuSCpPGgBTVFzoiIogiCWikJJUQsdHrxN-HxOUUVJkovFvFQQ87Isdf4CV2JKew)

- **Data Collection Module**:
  - Integrates with a shared database to store historical waste data from various flights, allowing for trend tracking and recycling rate measurement.

- **Data Display and Analysis Module**:
  - Provides a visual platform for data insights, including charts and graphs to understand waste distribution and recycling performance.
  - Utilizes generative AI to offer actionable insights and recommendations for optimizing waste management.

*Note: The web app for waste data analysis is planned but not yet implemented.*

## Technology Stack

- **Backend**: FastAPI for building the API endpoints, SQLite for database management.
- **Frontend**: React for building the user interface, Tailwind CSS for styling.
- **AI Integration**: Generative AI models for analyzing waste data and providing insights.

## Getting Started

### Prerequisites

- Node.js and npm for frontend development.
- Python and pip for backend development.

### Installation

1. **Backend**:
   - Navigate to the `aerovision-backend` directory.
   - Install dependencies: `pip install -r requirements.txt`
   - Run the server: `uvicorn analyze_main:app --reload`

2. **Frontend**:
   - Navigate to the `aerovision-frontend` directory.
   - Install dependencies: `npm install`
   - Start the development server: `npm run dev`

