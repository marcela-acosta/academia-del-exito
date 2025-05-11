from fastapi import FastAPI
from pydantic import BaseModel
from backend.rag_chain import initialize_rag_pipeline

print("🔥 Inicializando FastAPI...")

app = FastAPI(title="Asistente RAG - Reglamento de Fútbol")

print("📥 Cargando pipeline RAG...")
qa_chain = initialize_rag_pipeline("data/Reglamento_Futbol.pdf")
print("✅ Pipeline cargado con éxito")

class Question(BaseModel):
    question: str

@app.post("/preguntar")
async def preguntar(item: Question):
    respuesta = qa_chain.run(item.question)
    return {"respuesta": respuesta}
