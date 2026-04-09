@echo off
echo ==========================================
echo    MedXAI - Starting Services
echo ==========================================

REM Start Backend
start "MedXAI Backend" cmd /k "python backend/main.py"

REM Start Frontend
echo Starting Frontend...
cd frontend
npm run dev
