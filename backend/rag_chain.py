import os
import torch
from dotenv import load_dotenv
from typing import List

from transformers import pipeline
from huggingface_hub import login

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.llms import HuggingFacePipeline
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.schema import Document

# Cargar variables de entorno
load_dotenv()
hf_token = os.getenv("HF_TOKEN")

if not hf_token:
    raise ValueError("El token de HuggingFace (HF_TOKEN) no está definido en el archivo .env")

login(token=hf_token)

def load_documents(pdf_path: str, chunk_size=1000, chunk_overlap=200) -> List[Document]:
    loader = PyPDFLoader(pdf_path)
    pages = loader.load()

    # Agregar metadatos de página
    for i, page in enumerate(pages):
        page.metadata["source"] = f"Página {i+1}"
        page.page_content = f"[{page.metadata['source']}] {page.page_content}"

    splitter = CharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_documents(pages)

def create_vector_index(documents: List[Document], embedding_model_name="intfloat/multilingual-e5-large"):
    embeddings = HuggingFaceEmbeddings(model_name=embedding_model_name)
    faiss_index = FAISS.from_documents(documents, embeddings)
    retriever = faiss_index.as_retriever(search_type="similarity", search_kwargs={"k": 4})
    return retriever


def load_llm(model_id="meta-llama/Llama-3.2-3B-Instruct"):
    print(f"🟢 Ejecutando en: {'GPU - ' + torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'CPU'}")
    pipe = pipeline(
        "text-generation",
        model=model_id,
        torch_dtype=torch.float16,
        device=0,
        temperature=0.1,
        do_sample=True,
        repetition_penalty=1.1,
        return_full_text=False,
        max_new_tokens=500,
    )
    return HuggingFacePipeline(pipeline=pipe)


def build_qa_chain(llm, retriever):
    prompt_template = """
    Eres un experto en las reglas de fútbol y tu tarea es responder preguntas basado en el reglamento.
    Utiliza los siguientes fragmentos de contexto para responder la pregunta.
    Debes proveer una respuesta conversacional y en español.
    Cita siempre el número de regla y la página.
    Si no sabes la respuesta, indica que no lo sabes, sin inventar nada.
    No generes información que no se encuentre en el contexto dado.
    Siempre debes terminar el mensaje recomendando consultar con un experto en el tema.
    
    Contexto:
    {context}
    
    Pregunta: {question}
    Respuesta en español:
    """
    prompt = PromptTemplate.from_template(prompt_template)

    return RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt}
    )


# Método utilitario para cargar todo en uno
def initialize_rag_pipeline(pdf_path: str):
    docs = load_documents(pdf_path)
    retriever = create_vector_index(docs)

    print("🧠 Cargando modelo LLM...")
    llm = load_llm()

    return build_qa_chain(llm, retriever)
