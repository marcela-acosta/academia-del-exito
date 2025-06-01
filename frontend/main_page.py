import streamlit as st

st.set_page_config(
    page_title="Academia del Éxito",
    page_icon="⚽",
    layout="wide"
)

import requests # Necesario para el chatbot
import os # Necesario para cargar variables de entorno si aplica en el frontend
import base64 # Importar base64

# --- Estilos CSS para los títulos y elementos principales ---
st.markdown("""
<style>
h1, h2, h3 {
    color: #1E3A8A; /* Azul oscuro */
}

/* Force light background for the main container */
.stApp {
    background-color: #FFFFFF !important;
    color-scheme: light !important; /* Ensure light color scheme */
    color: #262730 !important; /* Set default text color to dark */
}

/* Set background for the header bar */
.stApp > header {
    background-color: #FFFFFF !important;
}

/* Hide the horizontal line/divider in the header */
.stApp > header > div:first-child > div:first-child {
    display: none !important;
}

/* Set background for the sidebar */
.stSidebar {
    background-color: rgb(240, 242, 246) !important;
}

/* Adjust background for main content area */
.stApp > div:first-child > div {
    background-color: #FFFFFF !important;
}

/* Adjust background for block container */
.st-emotion-cache-janbn0 {
    background-color: #FFFFFF !important;
}

/* Hide the stDecoration div */
.stDecoration {
    display: none !important;
}

/* Estilos para los botones generales */
.stButton>button {
    background-color: #3B82F6 !important; /* Azul más claro */
    color: white !important; /* Texto blanco */
    padding: 10px 20px !important; /* Añadir padding */
    font-size: 1.1rem !important; /* Aumentar tamaño de fuente */
    border-radius: 8px !important; /* Mantener esquinas redondeadas */
    border: none !important; /* Sin borde */
    display: block; /* Hacer que el botón ocupe su propia línea */
    margin: 20px auto; /* Centrar el botón y añadir margen vertical */
}

.stButton>button:hover {
    background-color: #60A5FA !important; /* Azul aún más claro al pasar el ratón */
    color: white !important;
}

.stButton>button:active {
     background-color: #2563EB !important; /* Volver al azul original o similar al hacer clic */
     color: white !important;
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem; /* Ajustar el margen inferior */
    gap: 5px; /* Reducir el espacio entre los elementos flex */
}

.header-container .main-title-text {
    font-size: 3.5rem;
    font-weight: 700;
    background: linear-gradient(45deg, #1E3A8A, #2563EB);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0; /* Asegurarse de que no haya márgenes extra */
    padding: 0;
    line-height: 1.2; /* Ajustar altura de línea para alinear con emoji */
}

.header-container .soccer-emoji {
    font-size: 3.5rem; /* Ajustar tamaño del emoji */
    line-height: 1.2; /* Ajustar altura de línea para alinear con título */
    margin: 0;
    padding: 0;
    vertical-align: middle; /* Alinear verticalmente el emoji */
}

.subtitle {
    font-size: 1.5rem;
    text-align: center;
    color: #4B5563;
    margin-top: 0; /* Reducir el margen superior del subtítulo */
    margin-bottom: 2rem;
    font-style: italic;
}

.divider {
    height: 4px;
    background: linear-gradient(90deg, #1E3A8A, #2563EB);
    margin: 20px 0;
    border-radius: 2px;
}

.future-step {
    color: #1E3A8A; /* Usar el mismo azul oscuro de los títulos */
    font-size: 1.2rem; /* Opcional: ajustar tamaño si quieres */
    font-weight: bold; /* Opcional: poner en negrita */
    text-align: center; /* Opcional: centrar el texto */
    margin-top: 15px; /* Espacio arriba */
    margin-bottom: 15px; /* Espacio abajo */
}

/* Estilos para los botones de navegación lateral */
.stSidebar .stButton>button {
    width: 100%; /* Que ocupe todo el ancho disponible en la sidebar */
    background-color: #525a61 !important; /* Color de fondo oscuro, similar a la imagen */
    color: white !important; /* Color del texto blanco */
    border-radius: 8px !important; /* Esquinas redondeadas */
    margin-bottom: 10px; /* Espacio entre botones */
    padding: 10px !important; /* Añadir algo de padding */
    padding-left: 10px !important; /* Asegurar padding a la izquierda */
    border: none !important; /* Sin borde */
    text-align: left !important; /* Alinear texto a la izquierda */
    cursor: pointer; /* Mostrar cursor de mano */
}

/* Opcional: Estilo hover para los botones */
.stSidebar .stButton>button:hover {
    background-color: #495057 !important; /* Color ligeramente más claro al pasar el ratón */
    color: white !important;
}

/* Opcional: Estilo para el botón activo/seleccionado */
.stSidebar .stButton>button:active {
     background-color: #212529 !important; /* Color más oscuro al hacer clic */
     color: white !important;
}

/* Estilos para los enlaces de navegación lateral */
.sidebar-nav-link {
    display: block; /* Hace que el enlace ocupe su propia línea */
    width: 100%; /* Ocupa todo el ancho disponible */
    background-color: #444c54; /* Color de fondo un poquito más claro */
    color: white; /* Color del texto blanco */
    border-radius: 8px; /* Esquinas redondeadas */
    margin-bottom: 10px; /* Espacio entre enlaces */
    padding: 10px; /* Padding interno */
    text-decoration: none; /* Quitar subrayado de enlace */
    text-align: left; /* Alinear texto a la izquierda */
    cursor: pointer; /* Mostrar cursor de mano */
}

.sidebar-nav-link:hover {
    background-color: #616a72; /* Color un poco más claro cuando hover */
    color: white;
}

.sidebar-nav-link.active {
     background-color: #212529; /* Color más oscuro para el elemento activo */
     color: white;
}

/* Estilos específicos para el botón dentro del formulario */
.stForm .stButton>button {
     background-color: #3B82F6 !important; /* Azul más claro para el botón del formulario */
     color: white !important; /* Texto blanco */
}

.stForm .stButton>button:hover {
     background-color: #60A5FA !important; /* Azul aún más claro al pasar el ratón en el form */
     color: white !important;
}

.stForm .stButton>button:active {
     background-color: #2563EB !important; /* Color al hacer clic en el form */
     color: white !important;
}

/* Estilos específicos para el botón de enviar inscripción en el formulario - Attempt 2 */
.stForm [data-testid="stBaseButton-secondaryFormSubmit"] > button {
    background-color: #3B82F6 !important; /* Azul más claro */
    color: white !important; /* Texto blanco */
}

.stForm [data-testid="stBaseButton-secondaryFormSubmit"] > button:hover {
    background-color: #60A5FA !important; /* Azul aún más claro al pasar el ratón */
    color: white !important;
    outline: none !important; /* Remove the outline on hover */
    border-color: transparent !important; /* Ensure no border color on hover */
}

.stForm [data-testid="stBaseButton-secondaryFormSubmit"] > button:active {
    background-color: #2563EB !important; /* Color al hacer clic */
    color: white !important;
}

/* Comprehensive styles to remove outline, border, and box-shadow from buttons */
button, .stButton>button, .stForm button,
button:focus, .stButton>button:focus, .stForm button:focus,
button:active, .stButton>button:active, .stForm button:active,
button:focus-visible {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
}

/* Estilos para los campos de entrada dentro del formulario */
.stForm .stTextInput>div>div>input {
    background-color: #F0F2F6 !important; /* Light background for input fields */
    color: #262730 !important; /* Dark text for input fields */
    -webkit-text-fill-color: #262730 !important; /* Ensure text color for autocomplete */
}

/* Estilos para las etiquetas de los campos de entrada dentro del formulario */
.stForm .stTextInput label {
    color: #262730 !important; /* Dark color for input labels */
}

/* Estilos específicos para el botón 'Obtener respuesta' en el formulario del chatbot */
.stForm [data-testid="stFormSubmitButton"] > button {
    background-color: #3B82F6 !important; /* Azul más claro */
    color: white !important; /* Texto blanco */
}

.stForm [data-testid="stFormSubmitButton"] > button:hover {
    background-color: #60A5FA !important; /* Azul aún más claro al pasar el ratón */
    color: white !important;
}

.stForm [data-testid="stFormSubmitButton"] > button:active {
    background-color: #2563EB !important; /* Color al hacer clic */
    color: white !important;
}

/* Style for warning messages */
.stAlert.stWarning {
    color: #262730 !important; /* Dark text for warning messages */
}

/* More specific style for text within warning messages */
.stAlert.stWarning * {
    color: #262730 !important; /* Ensure dark color for all elements inside the warning */
}

/* Even more specific style for paragraph text within warning messages */
.stAlert.stWarning p {
    color: #262730 !important; /* Ensure dark color for paragraph text */
}

/* Forzar texto oscuro dentro del st.warning */
div[data-testid="stAlert"] {
    color: #262730 !important; /* texto principal */
    background-color: #FFF9DB !important; /* opcional: fondo amarillo claro */
}

div[data-testid="stAlert"] * {
    color: #262730 !important; /* todo el contenido interno */
}

</style>
""", unsafe_allow_html=True)

# Cargar variables de entorno si es necesario para el frontend (ej. para la URL del backend)
# from dotenv import load_dotenv
# load_dotenv()

# Definir la URL del backend
API_URL = "http://localhost:8000/preguntar"

# --- Función para codificar imagen a base64 ---
@st.cache_data # Usar el nuevo decorador para cachear datos
def get_img_as_base64(file_path):
    try:
        with open(file_path, "rb") as f:
            data = f.read()
        return base64.b64encode(data).decode()
    except FileNotFoundError:
        st.error(f"Error: Archivo no encontrado en {file_path}")
        return None

# --- Título Principal y Descripción ----
st.markdown(
    '''
    <div class="header-container">
        <span class="soccer-emoji">⚽</span>
        <h1 class="main-title-text">Academia del Éxito</h1>
    </div>
    ''',
    unsafe_allow_html=True
)
st.markdown('<p class="subtitle">Tu centro de formación para convertirte en un <strong>entrenador de élite</strong></p>', unsafe_allow_html=True)
st.markdown('<div class="divider"></div>', unsafe_allow_html=True)

# --- Funciones para el contenido de cada página ---

def show_chatbot_page():
    st.header("🤖 Asistente de Reglamento de Fútbol")
    st.markdown("Aquí puedes consultar dudas sobre el **reglamento de fútbol FIFA**. ¡Pregunta al experto!")

    # Mostrar el video explicativo del asistente en una columna más pequeña
    video_col1, video_col2, video_col3 = st.columns([1, 2, 1]) # Ajustar las proporciones para hacerlo más pequeño aún

    with video_col2:
        st.video("frontend/asistente.mp4", format="mp4")

    # Usar un formulario para permitir el envío con la tecla Enter
    with st.form(key='chatbot_form'):
        # Input del usuario
        pregunta = st.text_input("Escribe tu pregunta sobre el reglamento:", key="chatbot_input_3")

        # Botón para enviar la pregunta
        submit_button = st.form_submit_button(label="Obtener respuesta")

    # Procesar la pregunta si se envió el formulario (ya sea por clic o por Enter)
    if submit_button and pregunta.strip():
        with st.spinner("Consultando al modelo..."):
            try:
                response = requests.post(API_URL, json={"question": pregunta})
                response.raise_for_status()
                respuesta = response.json()["respuesta"]
                st.subheader("Respuesta:")
                st.info(respuesta)
            except Exception as e:
                st.error(f"Error al consultar la API: {e}")

    # Separador opcional al final de la sección
    st.markdown("--- ")


def show_cursos_entrenadores_page():
    st.header("🎓 Cursos para Entrenadores de Fútbol Infantil")
    st.markdown("Encuentra la formación ideal para desarrollar tus **habilidades** como entrenador.")

    # --- Imagen para el curso destacado (usando base64) ---
    image_path = "frontend/soccer.png" # Ruta relativa a la raiz del proyecto
    img_base66 = get_img_as_base64(image_path)

    if img_base66:
        st.markdown(
            f'''
            <p style="text-align: center;">
                <img src="data:image/png;base64,{img_base66}" alt="Imagen del curso" style="max-width: 100%; height: auto; border-radius: 10px;">
            </p>
            ''',
            unsafe_allow_html=True
        )

    st.subheader("Curso destacado: **Entrenador de Fútbol Infantil**")
    st.write("Un programa completo para formar a los entrenadores del futuro, basado en la metodología FIFA.")
    st.write("**Duración:** 6 semanas")
    st.write("**Lecciones:** 17")
    st.write("**Costo:** ¡Completamente Gratis!")

    st.markdown("Este programa, inspirado en los prestigiosos contenidos de FIFA Grassroots, está diseñado para equiparte con todo lo necesario para convertirte en el entrenador que todo niño deseará tener. Cubre aspectos esenciales como la psicología infantil y deportiva, estrategias de enseñanza efectivas, organización de eventos futbolísticos y la habilidad para inculcar valores esenciales.")

    st.subheader("📚 Programa de estudios:")
    st.markdown("""
    * **Módulo 1:**
        * Bienvenidos al Campus
        * La filosofía del fútbol base
        * Actividad Inicial
    * **Módulo 2:**
        * El entrenador-educador de fútbol
        * El niño y el fútbol
        * Las 3 fases
        * El entrenador en las 3 fases
        * La organización de los entrenamientos
    * **Módulo 3:**
        * La iniciación
        * La realidad madurativa
        * Los esquemas motores
        * Las habilidades motrices básicas
        * Las habilidades motrices específicas
        * Capacidad de transformación
        * Habilidades sensoperceptivas
        * La orientación del cuerpo
        * Gestos técnicos basados en esquemas motores
    * **Módulo 4:**
        * El desarrollo
        * El reglamento
        * Las superficies y los arcos
        * El balón
        * La vestimenta
        * Los partidos reducidos
    * **Módulo 5:**
        * El rendimiento
        * La preparación
        * Los retos modernos
        * La competición
        * La organización de torneos
        * La organización de festivales
    """)

    # Usando columnas para el contenido clave y beneficios
    col1, col2 = st.columns(2)

    with col1:
        st.markdown("**Contenido Clave:**")
        st.write("- Filosofía del Fútbol Base")
        st.write("- El Papel del Entrenador como Educador")
        st.write("- Métodos Pedagógicos Adaptados a Niños")
        st.write("- Organización de Torneos y Festivales")
        st.write("- Reglamento del Fútbol Infantil")
        st.write("- Fundamentos Técnicos y Partidos Reducidos")

    with col2:
        st.markdown("**Beneficios Principales:**")
        st.write("- Certificado Internacional Personalizado")
        st.write("- Visibilidad Profesional")
        st.write("- Flexibilidad en el Estudio")
        st.write("- Desarrollo Profesional y Personal")

    st.subheader("🚀 Qué esperar al concluir:")
    st.markdown("Al finalizar, habrás enriquecido tu **perfil profesional** con una **certificación internacional** y mayor visibilidad. Obtendrás **flexibilidad** en tu aprendizaje y estarás bien preparado para los desafíos y oportunidades en el ámbito del entrenamiento deportivo.")

    # --- Botón para mostrar formulario de inscripción ---
    if st.button("Inscríbete aquí"):
        st.session_state.show_enrollment_form = True

    # --- Formulario de inscripción (se muestra condicionalmente) ---
    if st.session_state.get('show_enrollment_form', False):
        st.subheader("Formulario de inscripción")
        with st.form(key='enrollment_form'):
            nombre = st.text_input("Nombre:")
            apellido = st.text_input("Apellido:")
            email = st.text_input("Email:")

            submit_button = st.form_submit_button(label='Enviar inscripción')

            if submit_button:
                # Aquí va la lógica para procesar la inscripción
                # Validar que los campos no estén vacíos y que el email contenga @
                if not nombre or not apellido or not email or "@" not in email:
                    st.warning("Por favor, completa todos los campos y asegúrate de que el email sea válido.")
                else:
                    st.success("¡Gracias por tu interés! Nos pondremos en contacto para completar tu inscripción.")
                    st.markdown('<p class="future-step">Ya estás a un paso de tu futuro:</p>', unsafe_allow_html=True)
                    # Mostrar el video motivador
                    st.video("../video.mp4")
                # Opcional: Limpiar el formulario o ocultarlo
                # st.session_state.show_enrollment_form = False # Para ocultar el form después de enviar

    st.subheader("Próximamente otros cursos:")
    # Listado de otros cursos con formato más simple
    st.markdown("""
    * Pretemporada para Futbolistas
    * Curso de Motivación para Fútbolistas
    * Entrenador de Futsal | Contenidos UEFA
    * Entrenador de fútbol | Contenidos licencia B
    * Entrenador de Futbol Infantil - Contenidos UEFA
    * Entrenador Futbol Base
    * Entrenador de Futbol Juvenil FIFA
    * Entrenador de Futbol Infantil (Programa Grassroots)
    * Videoanalisis Deportivo (Longomatch + Post Producción + Scout)
    * Entrenador de Arqueros | Contenidos UEFA
    * Especialista en Rondos en el Fútbol Moderno
    * Entrenador de Arqueros
    * Preparación Física en el Fútbol Juvenil
    * Dirección Técnica de Equipos de Fútbol Femenino
    """)

    # Separador opcional al final de la sección
    st.markdown("--- ")


def show_podcast_page():
    st.header("🎙️ Episodios del Podcast de la Academia")
    st.markdown("Aquí encontrarás los episodios de nuestro podcast donde hablamos sobre la **Academia del Éxito**, nuestros cursos y temas relevantes del fútbol.")

    st.subheader("Episodio Destacado: Comentarios de Periodistas Deportivos")
    st.write("En este primer episodio, contamos con la participación de dos reconocidos periodistas deportivos que comparten sus impresiones y comentarios sobre la **Academia del Éxito**. Escucha sus perspectivas sobre nuestra propuesta educativa y el impacto que buscamos en la formación de entrenadores.")

    st.markdown("**Escucha el episodio aquí:**")
    # Incrustar el reproductor de audio directamente
    st.audio("frontend/episodio.wav")

    # Separador opcional al final de la sección
    st.markdown("--- ")


# Inicializar el estado de la página si no existe
if 'page_selection' not in st.session_state:
    st.session_state.page_selection = "🎓 Cursos Entrenadores" # Página por defecto

# Botones en la barra lateral
if st.sidebar.button("🎓 Cursos Entrenadores"):
    st.session_state.page_selection = "🎓 Cursos Entrenadores"

if st.sidebar.button("🤖 Asistente del Reglamento FIFA"):
    st.session_state.page_selection = "🤖 Asistente del Reglamento FIFA"

if st.sidebar.button("🎙️ Podcast"):
    st.session_state.page_selection = "🎙️ Podcast"

# --- Mostrar la página seleccionada ---
if st.session_state.page_selection == "🎓 Cursos Entrenadores":
    show_cursos_entrenadores_page()
elif st.session_state.page_selection == "🤖 Asistente del Reglamento FIFA":
    show_chatbot_page()
elif st.session_state.page_selection == "🎙️ Podcast":
    show_podcast_page()

# --- Pie de página ---
st.markdown("--- ")
st.markdown("© 2025 Academia del Éxito | Creado con [Streamlit](https://streamlit.io/)")