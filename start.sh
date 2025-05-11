#!/bin/bash
set -e

echo "🔧 Iniciando backend (FastAPI)..."
uvicorn backend.main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

sleep 3

# Verificar si FastAPI sigue vivo
if ps -p $BACKEND_PID > /dev/null; then
  echo "✅ Backend (FastAPI) iniciado correctamente."
else
  echo "❌ Error: FastAPI no se está ejecutando. Verificá la ruta o errores de importación."
  exit 1
fi

echo "🌐 Iniciando frontend (Streamlit)..."
streamlit run frontend/app.py --server.port 8501 --server.address 0.0.0.0
