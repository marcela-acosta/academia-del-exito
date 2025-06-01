# ⚽ Academia del Éxito: Tu Centro de Formación en Fútbol

Este repositorio contiene el código para el sitio web de la **Academia del Éxito**, una plataforma dedicada a la formación de entrenadores y aficionados al fútbol. Incluye un asistente de reglamento basado en IA, información sobre cursos especializados y episodios de podcast.

## ✨ Características Principales

- **🤖 Asistente de Reglamento FIFA:** Consulta instantáneamente el Reglamento de Fútbol FIFA mediante un chatbot inteligente (usando OpenAI).
- **🎓 Cursos para Entrenadores:** Información detallada sobre programas de formación, incluyendo un curso gratuito destacado.
- **🎙️ Podcast:** Acceso a episodios del podcast de la Academia con contenido relevante sobre fútbol y formación.
- **💻 Interfaz Web Intuitiva:** Desarrollada con Streamlit para una experiencia de usuario amigable.

## 🚀 Cómo Ejecutar el Proyecto Localmente

Sigue estos pasos para poner en marcha la Academia del Éxito en tu máquina local:

1.  **Clonar el Repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO> # Reemplaza con la URL de tu repositorio
    cd academia-del-exito
    ```

2.  **Crear y Activar un Entorno Virtual:**
    Es altamente recomendable usar un entorno virtual para gestionar las dependencias.

    ```bash
    python3 -m venv venv
    source venv/bin/activate # En macOS/Linux
    # Para Windows, usar: .\venv\Scripts\activate
    ```

3.  **Instalar Dependencias:**
    Asegúrate de tener `pip` actualizado y luego instala las librerías necesarias.

    ```bash
    pip install --upgrade pip
    pip install -r requirements.txt
    ```

4.  **Configurar la Clave de API de OpenAI:**
    Crea un archivo llamado `.env` en la **raíz del proyecto** (el mismo directorio donde está `requirements.txt`) y añade tu clave de API de OpenAI de la siguiente manera:

    ```
    OPENAI_API_KEY='tu_clave_secreta_de_openai'
    ```

    _Reemplaza `tu_clave_secreta_de_openai` con tu clave real._ Este archivo `.env` ya está incluido en `.gitignore` para evitar que subas tu clave por error.

5.  **Ejecutar el Backend (API):**
    Abre una **nueva terminal**, activa tu entorno virtual en ella (`source venv/bin/activate` o el comando correspondiente) y navega a la raíz del proyecto (`cd academia-del-exito` si no estás allí). Luego ejecuta el backend:

    ```bash
    uvicorn backend.main:app --reload
    ```

    Mantén esta terminal abierta y el backend en ejecución.

6.  **Ejecutar el Frontend (Streamlit App):**
    Abre otra **nueva terminal**, activa tu entorno virtual (`source venv/bin/activate` o el comando correspondiente) y navega a la raíz del proyecto. Luego ejecuta la aplicación Streamlit:
    ```bash
    streamlit run frontend/main_page.py
    ```
    Esto abrirá la aplicación en tu navegador web.

## 🧠 Detalles del Sistema RAG (para el Chatbot)

### 📚 Fuente de Datos

- **Documento:** `Reglamento_Fútbol.pdf` (ubicado en la carpeta `data/`)
- **Contenido:** Reglas oficiales de juego FIFA (temporada 2015/2016).

### ⚙️ Preprocesamiento y Parseo

- **Herramienta:** `PyPDFLoader` de LangChain.
- **Segmentación:** Fragmentos de ~1000 caracteres con solapamiento de 200 (`CharacterTextSplitter`).

### 🔎 Embeddings y Base Vectorial

- **Modelo de Embeddings:** `intfloat/multilingual-e5-large`
- **Vector Store:** `FAISS`
- **Tipo de búsqueda:** `similarity` con `k=4` vecinos.

### 🤖 Modelo de Lenguaje (LLM)

- **Modelo:** `gpt-3.5-turbo` (o similar) de **OpenAI**.
- **Configuración:** La configuración específica se maneja en el código del backend (`backend/rag_chain.py`).

### 💬 Prompt utilizado

El prompt utilizado para guiar las respuestas del LLM está integrado en el código del backend (`backend/rag_chain.py`) y se basa en los fragmentos de contexto recuperados del reglamento.

---

_Nota: Este README ha sido actualizado para reflejar el estado actual del proyecto y facilitar su ejecución local._

## 🧠 Sistema RAG Implementado

### 📝 Arquitectura General

El sistema está basado en una arquitectura de tipo **RAG (Retrieval-Augmented Generation)**, combinando recuperación de información semántica y generación de texto, para responder preguntas sobre el **Reglamento de Fútbol FIFA**.

### 📚 Fuente de Datos

- **Documento:** `Reglamento_Fútbol.pdf`
- **Contenido:** Reglas oficiales de juego FIFA (temporada 2015/2016).
- **Motivación:** Documento estructurado, claro, disponible en PDF y con valor práctico en el dominio deportivo.

### ⚙️ Preprocesamiento y Parseo

- **Herramienta:** `PyPDFLoader` de LangChain.
- **Segmentación:** Fragmentos de ~1000 caracteres con solapamiento de 200 (`CharacterTextSplitter`).
- **Motivo:** Asegurar coherencia contextual en la recuperación.

### 🔎 Embeddings y Base Vectorial

- **Modelo de Embeddings:** `intfloat/multilingual-e5-large`
  - ✔️ Alta precisión semántica.
  - ✔️ Soporte multilingüe (aunque el documento está en español).
- **Vector Store:** `FAISS`
- **Tipo de búsqueda:** `similarity` con `k=4` vecinos.

### 🤖 Modelo de Lenguaje (LLM)

- **Modelo:** `meta-llama/Llama-3.2-3B-Instruct` (Hugging Face).
- **Configuración:**
  - `temperature = 0.1`
  - `do_sample = True`
  - `repetition_penalty = 1.1`
  - `max_new_tokens = 500`
- **Framework:** Transformers + LangChain

### 💬 Prompt utilizado

```plaintext
Eres un experto en las reglas de fútbol y tu tarea es responder preguntas basado en el reglamento.
Utiliza los siguientes fragmentos de contexto para responder la pregunta.
Debes proveer una respuesta conversacional y en español.
Cita siempre el número de regla y la página.
Si no sabes la respuesta, indica que no lo sabes, sin inventar nada.
No generes información que no se encuentre en el contexto dado.
Siempre debes terminar el mensaje recomendando consultar con un experto en el tema.
```
