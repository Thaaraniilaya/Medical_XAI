# backend/chat.py
import sys
import os

# Add the project root to sys.path for imports to work when running this file directly
current_dir = os.path.dirname(os.path.abspath(__file__))  # backend/
project_root = os.path.dirname(current_dir)  # MEDXAI/
if project_root not in sys.path:
    sys.path.insert(0, project_root)
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from flask import Blueprint, request, jsonify
from models.llama_assisstant import LlamaAssistant

chat_bp = Blueprint("chat_bp", __name__)
# Initialize the Llama Assistant for chat/Q&A
assistant = LlamaAssistant()

@chat_bp.route("/chat", methods=["POST"])
def chat():
    """Endpoint for clarifying health doubts (Virtual Assistant)."""
    # Use request.get_json() for robustness
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Invalid JSON or missing data in request body"}), 400
        
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "Prompt required"}), 400
        
    reply = assistant.chat(prompt)
    return jsonify({"reply": reply})

@chat_bp.route("/alert_caretaker", methods=["POST"])
def alert_caretaker():
    """Placeholder for Emergency Alert System."""
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Invalid JSON or missing data in request body"}), 400
        
    user_id = data.get("user_id", "Default User")
    reason = data.get("reason", "Immediate medical assistance required.")
    
    # ⚠️ Placeholder Alert Logic ⚠️
    print(f"🚨🚨 EMERGENCY ALERT TRIGGERED for {user_id}: {reason}")
    
    return jsonify({
        "status": "Alert triggered (Placeholder)",
        "message": f"Caretaker for {user_id} has been notified with reason: '{reason}'.",
        "action": "Integration with Twilio/Email service is required for live functionality."
    })