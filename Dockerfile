# Imagen base con Python
FROM python:3.10-slim

# Evitar prompts interactivos al instalar paquetes
ENV DEBIAN_FRONTEND=noninteractive

# Seteo de directorio de trabajo
WORKDIR /app

# Copiar primero requirements.txt y .env (mejor para cache de build)
COPY requirements.txt ./
COPY .env .env

# Instalar dependencias del sistema si alguna lib lo necesita (opcional)
RUN apt-get update && apt-get install -y \
    gcc \
 && rm -rf /var/lib/apt/lists/*

# Instalar dependencias Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código
COPY . .

# Exponer puertos (FastAPI:8000, Streamlit:8501)
EXPOSE 8000 8501

# Comando por defecto (se usa en docker-compose)
CMD ["bash", "start.sh"]
