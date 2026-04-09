# models/xai_explainer.py
def build_explanation(report_text, summary):
    """
    Placeholder for an Explainable AI function.
    In a real system, this would use LIME or SHAP to highlight words 
    that led to the diagnosis/summary.
    """
    critical_words = ["high", "low", "elevated", "abnormal", "acute", "inflammation", "cancer", "malignant"]
    highlights = []
    
    # Simple keyword search
    for word in critical_words:
        if word in report_text.lower():
            highlights.append({"word": word, "reason": "Critical indicator in report"})
            
    # Remove duplicates
    unique_highlights = list({v['word']:v for v in highlights}.values())

    return {
        "summary": summary,
        "highlights": unique_highlights
    }