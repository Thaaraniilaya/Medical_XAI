import requests
import os

API_KEY = "AIzaSyAXgGir54yFkU9waK0OoLJ_k3lSo8QeebQ"

def ask_gemini(prompt: str):
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

    headers = {
        "Content-Type": "application/json"
    }

    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }

    response = requests.post(
        f"{url}?key={API_KEY}",
        headers=headers,
        json=payload
    )

    if response.status_code == 200:
        return response.json()["candidates"][0]["content"]["parts"][0]["text"]
    else:
        return "Error from Gemini API"
