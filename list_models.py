import os
from google import genai
from dotenv import load_dotenv

def exhaustive_tester():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    keys_path = os.path.join(base_dir, "keys.env")
    load_dotenv(keys_path)
    
    api_key = os.getenv("GEMINI_API_KEY")
    client = genai.Client(api_key=api_key)
    
    print("\nExhaustively testing all models...")
    for m in client.models.list():
        # Clean candidates often don't have v1beta methods in the list or are structured differently
        # So we just try to generate content with any model that looks like a text model
        if "embed" in m.name.lower() or "vision" in m.name.lower() or "aqa" in m.name.lower():
            continue
            
        print(f"Testing {m.name}...")
        try:
            response = client.models.generate_content(
                model=m.name,
                contents="Hi"
            )
            print(f"   SUCCESS: {response.text[:30]}...")
            return m.name
        except Exception as e:
            err = str(e)
            if "RESOURCE_EXHAUSTED" in err:
                print(f"   QUOTA EXCEEDED for {m.name}")
            elif "NOT_FOUND" in err:
                print(f"   NOT FOUND: {m.name}")
            else:
                print(f"   ERROR for {m.name}: {err[:50]}...")
    return None

if __name__ == "__main__":
    try:
        working = exhaustive_tester()
        if working:
            print(f"\nFINAL RECOMMENDED MODEL: {working}")
        else:
            print("\nNO WORKING MODEL FOUND.")
    except Exception as e:
        print(f"Master Error: {e}")
