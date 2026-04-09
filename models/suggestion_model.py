# models/suggestion_model.py
class SuggestionModel:
    def __init__(self):
        print("💡 Initializing Suggestion Model (Placeholder)...")
        self.general_tips = [
            "Maintain a balanced diet rich in vegetables and fruits.",
            "Exercise at least 30 minutes daily, focusing on cardiovascular health.",
            "Stay hydrated; drinking plenty of water supports overall metabolic function.",
            "Regularly monitor key metrics like blood pressure and glucose levels.",
            "Always consult your primary care physician immediately if symptoms worsen or change."
        ]

    def generate_tips(self, report_text):
        # Placeholder logic: returns three relevant tips.
        # This could be improved by using Gemini API to tailor tips based on the report_text.
        return self.general_tips[:3]