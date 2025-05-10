#!/bin/bash

# Habilitar modo estricto de bash
set -e

echo "🔧 Iniciando backend (FastAPI)..."
uvicorn backend.main:app --host 0.0.0.0 --port 8000 &

# Capturar el PID del backend para monitoreo (opcional)
FASTAPI_PID=$!

# Esperar a que backend arranque
sleep 5

echo "🌐 Iniciando frontend (Streamlit)..."
streamlit run frontend/app.py --server.port 8501 --server.address 0.0.0.0

# (opcional) Esperar a que terminen ambos procesos si lo necesitás
# wait $FASTAPI_PID
