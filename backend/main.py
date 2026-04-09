# backend/main_flask_api.py

import sys
import os
import json
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS

# ----------------------------------------------------------------------
# 🚨 PATH FIX: Ensure imports work correctly
# ----------------------------------------------------------------------
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)
if project_root not in sys.path:
    sys.path.insert(0, project_root)

# Import the unified logic
from medical_assisstant import orchestrate_request

# ----------------------------------------------------------------------
# 1. FLASK SETUP
# ----------------------------------------------------------------------
# Point to the React build folder
import os
backend_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(backend_dir)
frontend_dist = os.path.abspath(os.path.join(project_root, 'frontend', 'dist'))

print(f"DEBUG: Backend Dir: {backend_dir}")
print(f"DEBUG: Frontend Dist Path: {frontend_dist}")
print(f"DEBUG: Frontend Dist Exists: {os.path.exists(frontend_dist)}")

app = Flask(__name__, 
            static_folder=frontend_dist,
            static_url_path='', # Empty string means serve from root
            template_folder=frontend_dist)
CORS(app) 

# ----------------------------------------------------------------------
# 2. FLASK ROUTES
# ----------------------------------------------------------------------

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "frontend_dist": frontend_dist, "exists": os.path.exists(frontend_dist)})

@app.route('/api/analyze', methods=['POST'])
def analyze_report():
    try:
        report_text = ""
        data = {} # Initialize data as empty dict
        
        # 1. Handle File Uploads (Multipart/Form-Data)
        if 'file' in request.files:
            file = request.files['file']
            if file.filename == '':
                return jsonify({"error": "No file selected"}), 400
            
            filename = file.filename.lower()
            
            # --- PDF Processing ---
            if filename.endswith('.pdf'):
                import pypdf
                pdf_reader = pypdf.PdfReader(file)
                for page in pdf_reader.pages:
                    report_text += page.extract_text() + "\n"
            
            # --- Word Doc Processing ---
            elif filename.endswith('.docx'):
                import docx
                doc = docx.Document(file)
                for para in doc.paragraphs:
                    report_text += para.text + "\n"
            
            # --- Image Processing (JPG/PNG) ---
            elif filename.endswith(('.png', '.jpg', '.jpeg')):
                from medical_assisstant import extract_text_from_image
                image_bytes = file.read()
                report_text = extract_text_from_image(image_bytes, file.mimetype)
            
            # --- Text File ---
            elif filename.endswith('.txt'):
                report_text = file.read().decode('utf-8')
            
            else:
                return jsonify({"error": "Unsupported file format. Please use PDF, DOCX, JPG, or PNG."}), 400

        # 2. Handle Raw Text (JSON)
        else:
            data = request.get_json(silent=True) or {}
            report_text = data.get('report_text', '')

        if not report_text.strip():
            return jsonify({"error": "No content found to analyze"}), 400
            
        # Get Language preference (default to English)
        target_language = "English"
        if request.is_json:
             target_language = data.get('language', 'English')
        else:
             target_language = request.form.get('language', 'English')

        print(f"DEBUG: Analyze Report Request - Target Language: {target_language}")

        # Use simple explanation intent
        summary = orchestrate_request("Please explain this report simply and summarize it.", report_text, target_language)
        return jsonify({"summary": summary})
        
    except Exception as e:
        print(f"Analysis Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/save', methods=['POST'])
def save_report():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Save to a local json file as a mock database
        records_path = os.path.join(project_root, 'medical_records.json')
        
        records = []
        if os.path.exists(records_path):
            with open(records_path, 'r') as f:
                try:
                    records = json.load(f)
                except json.JSONDecodeError:
                    records = []
        
        # Add timestamp
        from datetime import datetime
        data['timestamp'] = datetime.now().isoformat()
        records.append(data)
        
        with open(records_path, 'w') as f:
            json.dump(records, f, indent=4)
            
        print(f"DEBUG: Saved report record. Total records: {len(records)}")
        return jsonify({"message": "Record saved successfully!"}), 200
    except Exception as e:
        print(f"Save Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat_assistant():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        language = data.get('language', 'English')
        history = data.get('history', '')

        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400
            
        print(f"DEBUG: Chat Request - Language: {language}, Prompt: {prompt[:50]}...")

        # Use orchestrator for chat with history
        reply = orchestrate_request(prompt, target_language=language, history=history)
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # Try to serve requested path from static folder
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        print(f"DEBUG: Serving static file: {path}")
        return send_from_directory(app.static_folder, path)
    
    # Fallback to index.html for SPA routing
    print(f"DEBUG: Serving index.html for path: {path}")
    return send_from_directory(app.static_folder, 'index.html')

# ----------------------------------------------------------------------
# 3. SERVER START
# ----------------------------------------------------------------------
if __name__ == '__main__':
    print("--- Flask Server Starting (Integrated Frontend) ---")
    app.run(debug=True, port=5000)
