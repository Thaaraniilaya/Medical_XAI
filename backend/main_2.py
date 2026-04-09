import streamlit as st
from gemini_api import ask_gemini

st.set_page_config(
    page_title="MedXAI",
    layout="wide"
)

# Sidebar
st.sidebar.title("🩺 MedXAI")
menu = st.sidebar.radio(
    "Navigation",
    ["Dashboard", "Chatbot", "Report Analysis"]
)

# ---------------- DASHBOARD ----------------
if menu == "Dashboard":
    st.title("🧠 MedXAI Dashboard")

    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Patients", "124")
    with col2:
        st.metric("Reports Analyzed", "68")
    with col3:
        st.metric("Health Score", "89%")

    st.subheader("AI Powered Medical Assistant")

# ---------------- CHATBOT ----------------
elif menu == "Chatbot":
    st.title("🤖 Medical AI Assistant")

    if "chat" not in st.session_state:
        st.session_state.chat = []

    user_input = st.chat_input("Ask a medical question")

    if user_input:
        st.session_state.chat.append(("user", user_input))
        reply = ask_gemini(user_input)
        st.session_state.chat.append(("ai", reply))

    for role, msg in st.session_state.chat:
        if role == "user":
            st.chat_message("user").write(msg)
        else:
            st.chat_message("assistant").write(msg)

# ---------------- REPORT ANALYSIS ----------------
elif menu == "Report Analysis":
    st.title("📄 Medical Report Analysis")

    file = st.file_uploader("Upload medical report (.txt)", type=["txt"])

    if file:
        text = file.read().decode("utf-8")
        st.text_area("Report Content", text, height=200)

        if st.button("Analyze Report"):
            with st.spinner("Analyzing..."):
                result = ask_gemini(
                    f"Analyze this medical report and give summary, risks and health tips:\n{text}"
                )
            st.success("Analysis Complete")
            st.write(result)
