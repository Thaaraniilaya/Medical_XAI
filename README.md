# Medical XAI - AI-Powered Medical Report Explainer 🏥🤖

A state-of-the-art Medical AI Assistant designed to simplify complex medical reports and provide a personalized health dashboard. This project combines advanced AI reasoning with a premium user experience to make healthcare information accessible to everyone.

## 🚀 Key Features

- **🧠 Advanced AI Chatbot**: A contextual medical assistant capable of answering health queries, scheduling appointments, and providing health tips.
- **📄 Report Analysis (Parsing + AI)**: Upload medical reports and get an instant, simplified summary that explains complex medical jargon in plain language.
- **🌐 Multi-Language Support**: Fully localized in multiple languages including **English, Tamil, Hindi, Spanish, and French**.
- **⚡ Blazing Fast AI (Groq + LLaMA 3)**: Utilizing the Groq Inference Engine and LLaMA 3 models for near-instant responses.
- **📊 Health Dashboard**: Interactive analytics for tracking vitals like heart rate, blood pressure, and sleep quality.
- **🎨 Premium UI/UX**: Built with React, Tailwind CSS, and Framer Motion for a sleek, responsive, and modern "Dark Mode" aesthetic.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Flask (Python), Flask-CORS.
- **AI/ML**: Groq API (LLaMA 3 70B & 8B).
- **Parsing**: PyPDF2, python-docx.

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/medical-xai.git
cd medical-xai
```

### 2. Backend Setup
- Create a `keys.env` file in the root directory.
- Add your Groq API Key:
  ```env
  GROQ_API_KEY=your_actual_api_key_here
  ```
- Install dependencies:
  ```bash
  pip install flask flask-cors groq python-dotenv
  ```
- Run the server:
  ```bash
  python backend/main.py
  ```

### 3. Frontend Setup (for development)
- Navigate to the frontend folder:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

## 🔋 Usage

Once the server is running, access the integrated application at:
**`http://localhost:5000`**

---

### 🌟 Project Highlight: The "Model Rotation" System

One of the core technical achievements of this project is the **Model Rotation Engine**. 
Since direct API quotas on free tiers are often restrictive, the system maintains a pool of 6+ different LLM models. It monitors the health and rate-limits of each request; if a model hits a 429 (Resource Exhausted) error, the orchestrator immediately rotates the request to a different available model in the pool, ensuring a seamless user experience without interruptions.

---

**Developed with ❤️ for the future of HealthTech.**
