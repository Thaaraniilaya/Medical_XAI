# utils.py
import os
import pandas as pd

# ⚠️ IN-MEMORY STORAGE FOR TRACKING ⚠️
# This dictionary will hold all tracked user data (placeholder for a database)
HEALTH_TRACKER_DATA = {}

def track_health_metric(user_id, metric, value, date):
    """Placeholder to add a health record to in-memory tracker."""
    if user_id not in HEALTH_TRACKER_DATA:
        HEALTH_TRACKER_DATA[user_id] = []
    HEALTH_TRACKER_DATA[user_id].append({"metric": metric, "value": value, "date": date})
    return HEALTH_TRACKER_DATA[user_id]

def get_health_status(user_id):
    """Placeholder to retrieve the tracked data as a Pandas DataFrame."""
    data = HEALTH_TRACKER_DATA.get(user_id, [])
    if not data:
        return None
    # Return as DataFrame for easy Streamlit visualization
    return pd.DataFrame(data)

def save_file(file_bytes, filename):
    """Placeholder for saving a file (used by the Flask routes if you use them)."""
    os.makedirs("data/medical_reports", exist_ok=True)
    filepath = os.path.join("data/medical_reports", filename)
    with open(filepath, "wb") as f:
        f.write(file_bytes)
    return filepath