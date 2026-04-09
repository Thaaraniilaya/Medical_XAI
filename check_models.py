import os
from dotenv import load_dotenv
from google import genai

load_dotenv("keys.env")
api_key = os.getenv("GEMINI_API_KEY")

try:
    client = genai.Client(api_key=api_key)
    print("Listing models...")
    for m in client.models.list(config={"page_size": 100}):
        print(f"Name: {m.name}")
        # print(f"Methods: {m.supported_generation_methods}") # skipping this as it caused error
except Exception as e:
    print(f"Error: {e}")
