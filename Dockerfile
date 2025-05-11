# Imagen base con PyTorch + CUDA (GPU)
FROM pytorch/pytorch:2.1.0-cuda12.1-cudnn8-runtime

# Evitar prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive

# Seteo de directorio de trabajo
WORKDIR /app

# Copiar primero requirements.txt y .env (cache óptima)
COPY requirements.txt ./
COPY .env .env
COPY data data

# Instalar dependencias del sistema si hace falta
RUN apt-get update && apt-get install -y \
    gcc \
 && rm -rf /var/lib/apt/lists/*

# Instalar dependencias Python (con soporte GPU)
# Instalar pip y PyTorch con GPU manualmente
RUN pip install --upgrade pip && \
    pip install torch==2.1.0+cu121 torchvision==0.16.0+cu121 torchaudio==2.1.0+cu121 --index-url https://download.pytorch.org/whl/cu121 && \
    pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código
COPY . .

# Exponer puertos necesarios
EXPOSE 8000 8501

# Comando por defecto (puede ser FastAPI, Streamlit, etc.)
CMD ["bash", "start.sh"]
