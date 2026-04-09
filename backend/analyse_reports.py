# backend/routes/analyze_report.py
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Blueprint, request, jsonify
from models.biogpt_model import BioGPTModel
from models.suggestion_model import SuggestionModel
from models.xai_explainer import build_explanation
from backend.utils import save_file

analyze_bp = Blueprint("analyze_bp", __name__)
biogpt = BioGPTModel()
suggestion_model = SuggestionModel()

@analyze_bp.route("/upload_report", methods=["POST"])
def upload_report():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files["file"]
    filepath = save_file(file.read(), file.filename)
    
    with open(filepath, "r", encoding="utf-8") as f:
        report_text = f.read()

    # Analyze report
    summary = biogpt.analyze_report(report_text)
    tips = suggestion_model.generate_tips(report_text)
    xai = build_explanation(report_text, summary)

    return jsonify({
        "report_text": report_text,
        "summary": summary,
        "health_tips": tips,
        "xai": xai
    })
