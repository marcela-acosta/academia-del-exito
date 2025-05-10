import os
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
    raw_docs = loader.load()
    splitter = CharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_documents(raw_docs)


def create_vector_index(documents: List[Document], embedding_model_name="intfloat/multilingual-e5-large"):
    embeddings = HuggingFaceEmbeddings(model_name=embedding_model_name)
    faiss_index = FAISS.from_documents(documents, embeddings)
    retriever = faiss_index.as_retriever(search_type="similarity", search_kwargs={"k": 4})
    return retriever


def load_llm(model_id="meta-llama/Llama-3.2-3B-Instruct"):
    pipe = pipeline(
        "text-generation",
        model=model_id,
        torch_dtype="auto",
        device_map="auto",
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
    Si no sabes la respuesta, indica que no lo sabes, sin inventar nada.
    Siempre termina recomendando consultar con un experto.

    Contexto:
    {context}

    Pregunta: {question}
    Respuesta:
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
    llm = load_llm()
    return build_qa_chain(llm, retriever)
