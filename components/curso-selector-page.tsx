"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import Image from "next/image"

type Question = {
  id: number
  question: string
  options: {
    id: string
    text: string
    value: string
  }[]
}

type CourseRecommendation = {
  title: string
  description: string
  image: string
  points: string[]
}

export default function CursoSelectorPage({ onNavigateToCursos }: { onNavigateToCursos?: () => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [recommendation, setRecommendation] = useState<CourseRecommendation | null>(null)

  const questions: Question[] = [
    {
      id: 1,
      question: "¿Cuál es tu nivel de experiencia como entrenador?",
      options: [
        { id: "q1-1", text: "Principiante, sin experiencia previa", value: "beginner" },
        { id: "q1-2", text: "Intermedio, alguna experiencia informal", value: "intermediate" },
        { id: "q1-3", text: "Avanzado, con experiencia formal", value: "advanced" },
      ],
    },
    {
      id: 2,
      question: "¿Qué grupo de edad te interesa entrenar principalmente?",
      options: [
        { id: "q2-1", text: "Niños (5-12 años)", value: "children" },
        { id: "q2-2", text: "Adolescentes (13-17 años)", value: "teens" },
        { id: "q2-3", text: "Adultos (18+ años)", value: "adults" },
      ],
    },
    {
      id: 3,
      question: "¿Cuál es tu objetivo principal como entrenador?",
      options: [
        { id: "q3-1", text: "Desarrollo integral de los jugadores", value: "development" },
        { id: "q3-2", text: "Competición y resultados", value: "competition" },
        { id: "q3-3", text: "Enseñanza de fundamentos técnicos", value: "technical" },
      ],
    },
    {
      id: 4,
      question: "¿Cuánto tiempo puedes dedicar semanalmente a tu formación?",
      options: [
        { id: "q4-1", text: "Menos de 3 horas", value: "low" },
        { id: "q4-2", text: "Entre 3 y 6 horas", value: "medium" },
        { id: "q4-3", text: "Más de 6 horas", value: "high" },
      ],
    },
    {
      id: 5,
      question: "¿Qué aspecto del entrenamiento te interesa más?",
      options: [
        { id: "q5-1", text: "Metodología y pedagogía", value: "methodology" },
        { id: "q5-2", text: "Táctica y estrategia", value: "tactics" },
        { id: "q5-3", text: "Preparación física", value: "physical" },
        { id: "q5-4", text: "Reglamento y arbitraje", value: "rules" },
      ],
    },
  ]

  const courseRecommendations: Record<string, CourseRecommendation> = {
    infantil: {
      title: "Entrenador de Fútbol Infantil",
      description:
        "Este curso es perfecto para quienes desean trabajar con niños y desarrollar habilidades pedagógicas adaptadas a las etapas formativas.",
      image: "/favicon.png",
      points: [
        "Metodología adaptada a diferentes edades",
        "Juegos y ejercicios formativos",
        "Psicología infantil aplicada al deporte",
        "Organización de festivales y torneos",
      ],
    },
    base: {
      title: "Entrenador de Fútbol Base",
      description:
        "Ideal para quienes buscan una formación completa en los fundamentos del entrenamiento para categorías juveniles.",
      image: "/favicon.png",
      points: [
        "Fundamentos técnicos y tácticos",
        "Desarrollo de sesiones de entrenamiento",
        "Gestión de equipos juveniles",
        "Planificación de temporada",
      ],
    },
    avanzado: {
      title: "Entrenador de Fútbol Juvenil FIFA",
      description:
        "Curso avanzado para quienes buscan profundizar en metodologías competitivas y desarrollo de talento.",
      image: "/favicon.png",
      points: [
        "Análisis táctico avanzado",
        "Desarrollo de modelo de juego",
        "Detección y desarrollo de talentos",
        "Preparación para competiciones",
      ],
    },
    especializado: {
      title: "Especialista en Rondos en el Fútbol Moderno",
      description:
        "Curso especializado en una metodología específica de entrenamiento muy valorada en el fútbol actual.",
      image: "/favicon.png",
      points: [
        "Metodología de rondos por objetivos",
        "Progresiones y variantes",
        "Aplicación táctica de los rondos",
        "Diseño de sesiones específicas",
      ],
    },
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Determinar recomendación basada en respuestas
      determineRecommendation()
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: value,
    })

    // Avanzar automáticamente a la siguiente pregunta después de un pequeño delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        // Determinar recomendación basada en respuestas
        determineRecommendation()
        setShowResult(true)
      }
    }, 300)
  }

  const determineRecommendation = () => {
    // Lógica simple para determinar recomendación basada en respuestas
    const experienceLevel = answers[1]
    const ageGroup = answers[2]
    const objective = answers[3]
    const interest = answers[5]

    if (ageGroup === "children" || experienceLevel === "beginner") {
      setRecommendation(courseRecommendations.infantil)
    } else if (interest === "methodology" || interest === "rules") {
      setRecommendation(courseRecommendations.base)
    } else if (experienceLevel === "advanced" || objective === "competition") {
      setRecommendation(courseRecommendations.avanzado)
    } else {
      setRecommendation(courseRecommendations.especializado)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResult(false)
    setRecommendation(null)
  }

  const currentQuestion = questions[currentQuestionIndex]
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6">🔍 ¿Qué curso elijo?</h2>
      <p className="text-lg text-gray-700 dark:text-gray-100 mb-8">
        Responde estas preguntas y te ayudaremos a encontrar el <strong>curso ideal</strong> para tu perfil y objetivos.
      </p>

      {!showResult ? (
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-blue-800 dark:text-blue-300 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                {currentQuestionIndex + 1}
              </span>
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  onClick={() => handleAnswerChange(option.value)}
                  className="w-full text-left justify-start p-4 h-auto border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {option.text}
                </Button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                onClick={handlePrevious}
                variant="outline"
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Anterior
              </Button>
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                Selecciona una opción para continuar
              </div>
            </div>

            <div className="pt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                {currentQuestionIndex + 1} de {questions.length} preguntas
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-blue-800 dark:text-blue-300 flex items-center">
              <CheckCircle2 className="h-6 w-6 mr-2 text-green-500" />
              Tu curso recomendado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {recommendation && (
              <div className="space-y-6">
                <div
                  className="flex flex-col md:flex-row gap-6 items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg transition-colors"
                  onClick={() => onNavigateToCursos?.()}
                >
                  <div className="w-48 h-48 relative">
                    <Image
                      src="https://zwigp4wtrpf7zjex.public.blob.vercel-storage.com/soccer-O0LwwU2TsHukDxUJUoi509sAnGZRnH.png"
                      alt={recommendation.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">{recommendation.title}</h3>
                    <p className="text-gray-700 dark:text-gray-200 mt-2">{recommendation.description}</p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">Este curso incluye:</h4>
                  <ul className="space-y-2">
                    {recommendation.points.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-200">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button onClick={resetQuiz} variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Volver a empezar
                  </Button>
                  <Button onClick={() => onNavigateToCursos?.()} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Inscribirme en este curso
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800 dark:text-blue-300">
            ¿Por qué usar este selector de cursos?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-200">
            Nuestro selector de cursos te ayuda a encontrar la formación que mejor se adapta a tu perfil, experiencia y
            objetivos profesionales. Basado en tus respuestas, te recomendamos el programa que maximizará tu desarrollo
            como entrenador.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
