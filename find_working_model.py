
import os
import time
from google import genai
from dotenv import load_dotenv

load_dotenv("keys.env")
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

print("Discovering models that support generateContent...")
available_models = []
for m in client.models.list():
    if "generateContent" in m.supported_actions:
        available_models.append(m.name)

print(f"Found {len(available_models)} candidate models.")

for model_name in available_models:
    print(f"Testing {model_name}...")
    try:
        response = client.models.generate_content(
            model=model_name,
            contents="hi"
        )
        print(f"SUCCESS with {model_name}!")
        time.sleep(1) # Slow down to avoid burst limit
    except Exception as e:
        print(f"Failed {model_name}: {str(e)[:50]}")
