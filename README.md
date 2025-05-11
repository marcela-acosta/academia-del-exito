# ⚽ Asistente RAG sobre el Reglamento de Fútbol FIFA 2015/2016

Este proyecto implementa un asistente inteligente que responde preguntas sobre el **Reglamento de Fútbol FIFA 2015/2016**, combinando técnicas de *Retrieval-Augmented Generation* (RAG), modelos de lenguaje grandes (LLMs) y recuperación semántica.



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
