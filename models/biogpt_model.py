# models/biogpt_model.py (SDK-Based - Fixes 404 Error)

import os
from google import genai
from google.genai import types

class BioGPTModel:
    def __init__(self):
        print("🔬 Initializing Gemini API Client for Report Analysis...")
        
        # Use the key you provided directly for testing purposes
        self.api_key = "AIzaSyBTqMJV-NujxT9uvZBA2yhG85SeHvl4M-g" 
        
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not set.")

        try:
            self.client = genai.Client(api_key=self.api_key)
            self.model_name = "gemini-2.5-flash"
        except Exception as e:
            raise RuntimeError(f"Failed to initialize Gemini Client: {e}")

    def analyze_report(self, report_text):
        
        prompt = f"""
You are a highly specialized MedXAI agent. Analyze the medical report below and generate a clear, professional summary.
Follow this strict output format:
SUMMARY: A concise summary of the key medical findings and the primary diagnosis.
INTERPRETATION (Patient Language): Explain the findings and diagnosis in simple, non-medical terms.
RECOMMENDATIONS: Suggest 3 general health tips based on the report.
REPORT: {report_text}
"""
        config = types.GenerateContentConfig(
            max_output_tokens=1024,
            temperature=0.5
        )

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=config
            )
            return response.text.strip()
            
        except genai.errors.APIError as e:
            return f"Error during Gemini API analysis: {e}. Check API Key or Quota limits."
        except Exception as e:
            return f"An unexpected error occurred during analysis: {e}"