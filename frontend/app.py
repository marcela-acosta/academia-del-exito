import streamlit as st
import requests

API_URL = "http://localhost:8000/preguntar"

st.set_page_config(page_title="Asistente RAG - Reglamento de Fútbol", page_icon="⚽")
st.title("⚽ Asistente RAG sobre Reglamento de Fútbol")

st.markdown("Haz una pregunta sobre el reglamento de fútbol FIFA 2015/2016 y obtén una respuesta basada en el documento oficial.")

# Input del usuario
pregunta = st.text_input("Escribe tu pregunta:")

if st.button("Preguntar") and pregunta.strip():
    with st.spinner("Consultando al modelo..."):
        try:
            response = requests.post(API_URL, json={"question": pregunta})
            response.raise_for_status()
            respuesta = response.json()["respuesta"]
            st.success("Respuesta:")
            st.write(respuesta)
        except Exception as e:
            st.error(f"Error al consultar la API: {e}")