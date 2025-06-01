import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Contenido del reglamento FIFA (extracto principal)
const FIFA_RULES_CONTENT = `
REGLAS DE JUEGO FIFA 2015/2016

REGLA 1 – EL TERRENO DE JUEGO
- El terreno de juego será rectangular y estará marcado con líneas
- Longitud (línea de banda): mínimo 90 m, máximo 120 m
- Anchura (línea de meta): mínimo 45 m, máximo 90 m
- Para partidos internacionales: Longitud mínimo 100 m, máximo 110 m; Anchura mínimo 64 m, máximo 75 m
- Área de meta: líneas perpendiculares a 5.5 m de cada poste
- Área penal: líneas perpendiculares a 16.5 m de cada poste
- Punto penal: a 11 m de la línea de meta
- Metas: 7.32 m entre postes, 2.44 m de altura

REGLA 2 – EL BALÓN
- Será esférico, de cuero o material adecuado
- Circunferencia: 68-70 cm
- Peso: 410-450 g
- Presión: 0,6-1,1 atmósferas

REGLA 3 – EL NÚMERO DE JUGADORES
- Máximo 11 jugadores por equipo, uno como guardameta
- Mínimo 7 jugadores para comenzar
- Máximo 3 sustituciones en competiciones oficiales

REGLA 4 – EL EQUIPAMIENTO DE LOS JUGADORES
- Jersey/camiseta, pantalones cortos, medias, canilleras/espinilleras, calzado
- Canilleras deben estar cubiertas por las medias
- Prohibidas las joyas

REGLA 5 – EL ÁRBITRO
- Autoridad total para hacer cumplir las Reglas
- Controla el tiempo, toma nota de incidentes
- Puede mostrar tarjetas amarillas y rojas
- Sus decisiones son definitivas

REGLA 6 – LOS ÁRBITROS ASISTENTES
- Indican si el balón sale del campo
- Señalan fuera de juego
- Ayudan en decisiones de faltas

REGLA 7 – LA DURACIÓN DEL PARTIDO
- Dos tiempos de 45 minutos cada uno
- Descanso máximo de 15 minutos
- Tiempo adicional por pérdidas

REGLA 8 – EL INICIO Y LA REANUDACIÓN DEL JUEGO
- Saque de salida al inicio y después de goles
- Balón a tierra para reanudar en ciertas situaciones

REGLA 9 – EL BALÓN EN JUEGO O FUERA DE JUEGO
- Fuera cuando cruza completamente las líneas
- En juego cuando rebota de postes, travesaño o árbitros

REGLA 10 – EL GOL MARCADO
- Gol cuando el balón cruza completamente la línea de meta

REGLA 11 – EL FUERA DE JUEGO
- Posición: más cerca de la línea de meta que el balón y penúltimo adversario
- Infracciones: interferir en juego, interferir adversario, ganar ventaja

REGLA 12 – FALTAS E INCORRECCIONES
Tiro libre directo por:
- Patear, poner zancadilla, saltar, cargar, golpear, empujar, entrada contra adversario
- Sujetar, escupir, tocar balón con manos

Tiro libre indirecto por:
- Guardameta: más de 6 segundos con balón, tocar balón dos veces, recibir pase de pie
- Juego peligroso, obstaculizar

Tarjeta amarilla (amonestación):
- Conducta antideportiva
- Desaprobar decisiones
- Infringir persistentemente
- Retardar reanudación
- No respetar distancia
- Entrar sin permiso

Tarjeta roja (expulsión):
- Juego brusco grave
- Conducta violenta
- Escupir
- Impedir gol con mano
- Malograr oportunidad manifiesta
- Lenguaje ofensivo
- Segunda amonestación

REGLA 13 – TIROS LIBRES
- Directos e indirectos
- Adversarios a 9.15 m mínimo
- Ejecutor no puede tocar dos veces seguidas

REGLA 14 – EL TIRO PENAL
- Por infracciones de tiro libre directo en área penal
- Desde punto penal (11 m)
- Guardameta en línea de meta
- Otros jugadores fuera del área

REGLA 15 – EL SAQUE DE BANDA
- Cuando balón cruza línea de banda
- Con ambas manos, desde atrás y por encima de cabeza
- Adversarios a 2 m mínimo

REGLA 16 – EL SAQUE DE META
- Cuando balón cruza línea de meta tocado por atacante
- Desde área de meta
- Adversarios fuera del área penal

REGLA 17 – EL SAQUE DE ESQUINA
- Cuando balón cruza línea de meta tocado por defensor
- Desde cuadrante de esquina
- Adversarios a 9.15 m mínimo
`

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json()

    if (!question) {
      return NextResponse.json({ error: "Pregunta requerida" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `Eres un experto asistente del reglamento FIFA. Tu trabajo es responder preguntas sobre las reglas del fútbol basándote únicamente en el reglamento oficial FIFA 2015/2016 que se te proporciona.

Instrucciones:
- Responde SOLO basándote en el contenido del reglamento FIFA proporcionado
- Si la pregunta no está cubierta en el reglamento, indica que no tienes esa información específica
- Sé preciso y cita la regla correspondiente cuando sea posible
- Responde en español de manera clara y profesional
- Si hay dudas sobre interpretación, menciona que se debe consultar al árbitro

Contenido del reglamento FIFA:
${FIFA_RULES_CONTENT}`,
      prompt: `Pregunta sobre el reglamento FIFA: ${question}`,
    })

    return NextResponse.json({ respuesta: text })
  } catch (error) {
    console.error("Error en el chatbot:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
