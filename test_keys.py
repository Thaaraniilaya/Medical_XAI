
import os
from google import genai
from dotenv import load_dotenv

def test_key(key_name, api_key):
    print(f"--- Testing Key: {key_name} ({api_key[:10]}...) ---")
    client = genai.Client(api_key=api_key)
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents="Say 'Key OK'"
        )
        print(f"Response: {response.text}")
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

# Key 1 from keys.env
load_dotenv("keys.env")
key1 = os.getenv("GEMINI_API_KEY")

# Key 2 from llama_assisstant.py
key2 = "AIzaSyBTqMJV-NujxT9uvZBA2yhG85SeHvl4M-g"

test_key("Primary (keys.env)", key1)
print("\n")
test_key("Secondary (llama_assisstant)", key2)
