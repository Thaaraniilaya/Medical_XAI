# models/llama_assisstant.py (SDK-Based - Fixes 404 Error)

import os
from google import genai
from google.genai import types

class LlamaAssistant:
    def __init__(self):
        print("🤖 Initializing Gemini API Client for Chat Assistant...")
        
        from dotenv import load_dotenv
        import os
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        load_dotenv(os.path.join(base_dir, "keys.env"))
        self.api_key = os.getenv("GEMINI_API_KEY")
        
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not set.")

        try:
            self.client = genai.Client(api_key=self.api_key)
            self.model_name = "models/gemini-2.5-flash"
        except Exception as e:
            raise RuntimeError(f"Failed to initialize Gemini Client: {e}")

    def chat(self, prompt):
        
        system_prompt = "You are a friendly, compassionate, and simple medical assistant. Keep responses brief and focused on the user's health doubt."
        
        config = types.GenerateContentConfig(
            system_instruction=system_prompt,
            max_output_tokens=300,
            temperature=0.3
        )

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=config
            )
            return response.text.strip()
            
        except genai.errors.APIError as e:
            # Specific error handling for API issues
            return f"Assistant: Error during Gemini API call: {e}. Check API key, endpoint, or quota."
        except Exception as e:
            return f"Assistant: An unexpected error occurred: {e}"