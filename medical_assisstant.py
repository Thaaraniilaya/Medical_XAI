# medical_assisstant.py — Powered by Groq (LLaMA 3)

import os
import json
from dotenv import load_dotenv
from typing import Dict, Any, Optional

try:
    from groq import Groq
except ImportError:
    print("Error: groq library not found. Run: pip install groq")
    exit()

# --- Load env and init client ---
def initialize_client() -> Optional[Groq]:
    base_dir = os.path.dirname(os.path.abspath(__file__))
    keys_path = os.path.join(base_dir, "keys.env")
    load_dotenv(keys_path)

    global GROQ_API_KEY
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")

    if not GROQ_API_KEY:
        print("FATAL: GROQ_API_KEY not found in keys.env.")
        return None

    try:
        client = Groq(api_key=GROQ_API_KEY)
        print("[OK] Groq Client Initialized.")
        return client
    except Exception as e:
        print(f"Error initializing Groq client: {e}")
        return None

# Best free Groq models (fast and capable)
MODEL_POOL = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "mixtral-8x7b-32768",
]

client = initialize_client()

def call_groq(prompt: str, system: str = "You are a helpful medical assistant.", max_tokens: int = 512) -> str:
    """Core Groq API call with model fallback."""
    if not client:
        return "[ERROR] Groq client not initialized. Check your GROQ_API_KEY in keys.env."

    for model in MODEL_POOL:
        try:
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": system},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=max_tokens,
                temperature=0.3,
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            err = str(e)
            print(f"Groq model {model} failed: {err[:80]}")
            if "401" in err or "invalid_api_key" in err.lower():
                return f"[ERROR] Invalid Groq API Key. Please update GROQ_API_KEY in keys.env."
            # Try next model on quota/rate limit
            continue

    return "[ERROR] All Groq models are busy right now. Please try again in a moment."


def extract_text_from_image(image_bytes: bytes, mime_type: str) -> str:
    """Groq doesn't support vision yet — return helpful message."""
    return "Image OCR is not supported with Groq. Please paste the report text directly."


def medical_text_parser(report_text: str, target_language: str = "English") -> Dict[str, Any]:
    """Analyzes medical text and returns structured data."""
    prompt = f"""Analyze the following medical report and return a JSON object with these exact keys:
- Condition: string
- Key_Metrics: list of strings
- Medications: list of strings
- Recommendations: list of strings
- Diet_Plan: string
- Health_Tips: list of strings

Respond in {target_language}. Return ONLY valid JSON, no extra text.

REPORT:
{report_text}"""

    system = "You are an expert medical analyst. Always respond with valid JSON only."
    result = call_groq(prompt, system=system, max_tokens=800)

    try:
        # Strip markdown code fences if present
        clean = result.strip().strip("```json").strip("```").strip()
        return json.loads(clean)
    except Exception as e:
        print(f"JSON parse error: {e}, raw: {result[:100]}")
        return {
            "Condition": "Parsing Error",
            "Key_Metrics": [],
            "Medications": [],
            "Recommendations": [result[:300]],
            "Diet_Plan": "",
            "Health_Tips": []
        }


def schedule_hospital_appointment(doctor: str, date: str, time: str, purpose: str) -> str:
    return f"✅ Appointment booked with **{doctor}** for **{purpose}** on **{date}** at **{time}**."


def get_user_friendly_summary(structured_data: Dict[str, Any], target_language: str = "English") -> str:
    prompt = f"Turn this medical data into a simple, friendly explanation in {target_language}:\n{json.dumps(structured_data, indent=2)}"
    return call_groq(prompt, max_tokens=600)


def get_dashboard_health_summary(history_context: str) -> str:
    prompt = f"Give a motivating and brief health status summary based on: {history_context}"
    return call_groq(prompt, max_tokens=200)


def orchestrate_request(user_input: str, report_text: str = None, target_language: str = "English", history: str = "") -> str:
    """Main routing function."""
    if not client:
        return "[ERROR] Groq client not initialized. Please check GROQ_API_KEY in keys.env."

    user_input_lower = user_input.lower()

    # 1. Report Analysis
    if report_text and ("summary" in user_input_lower or "explain" in user_input_lower or "analyze" in user_input_lower):
        print("-> Routing to: Medical Report Analysis")
        structured = medical_text_parser(report_text, target_language)
        return get_user_friendly_summary(structured, target_language)

    # 2. Scheduling
    elif any(k in user_input_lower for k in ["schedule", "appointment", "book"]):
        print("-> Routing to: Scheduling")
        return schedule_hospital_appointment("Dr. Priya (Cardiologist)", "2026-01-15", "11:30 AM", "Follow-up Checkup")

    # 3. Dashboard
    elif "dashboard" in user_input_lower:
        print("-> Routing to: Dashboard Summary")
        return get_dashboard_health_summary("Last 7 days: BP stable, Hydration good.")

    # 4. General Chat
    else:
        print("-> Routing to: General Chat")
        system = f"You are a friendly, compassionate medical assistant. Always respond in {target_language}. Keep answers brief and helpful."
        prompt = f"Conversation history: {history}\n\nUser question: {user_input}" if history else user_input
        return call_groq(prompt, system=system, max_tokens=300)


if __name__ == "__main__":
    print(orchestrate_request("What is anemia?"))