"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AsistentePage() {
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      const data = await res.json()
      if (data.respuesta) {
        setResponse(data.respuesta)
      } else {
        setResponse("Error al obtener respuesta")
      }
    } catch (error) {
      setResponse("Error al consultar la API")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6">
        🤖 Asistente de Reglamento de Fútbol FIFA
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-100 mb-8">
        Aquí puedes consultar dudas sobre el <strong>reglamento de fútbol FIFA</strong>. ¡Pregunta al experto!
      </p>

      {/* Video explicativo */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-xs">
          <video
            controls
            className="w-full rounded-lg shadow-lg"
            src="https://zwigp4wtrpf7zjex.public.blob.vercel-storage.com/asistente-JBICjJiLKw5ZR34HCmEe7M8Ss2cjR5.mp4"
          >
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>

      {/* Chatbot Form */}
      <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800 dark:text-blue-300">Consulta al Asistente FIFA</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="question">Escribe tu pregunta sobre el reglamento:</Label>
              <Input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ej: ¿Cuáles son las dimensiones del terreno de juego?"
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !question.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Consultando..." : "Obtener respuesta"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Response */}
      {response && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800 dark:text-blue-300">Respuesta:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-100">{response}</div>
          </CardContent>
        </Card>
      )}

      {/* Examples */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800 dark:text-blue-300">
            Ejemplos de preguntas que puedes hacer:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700 dark:text-gray-200">
            <li>• ¿Cuáles son las dimensiones del terreno de juego?</li>
            <li>• ¿Cuántos jugadores puede tener un equipo?</li>
            <li>• ¿Qué infracciones se sancionan con tarjeta roja?</li>
            <li>• ¿Cuándo se marca un fuera de juego?</li>
            <li>• ¿Cuáles son las características del balón?</li>
            <li>• ¿Qué equipamiento deben usar los jugadores?</li>
            <li>• ¿Cuándo se concede un tiro penal?</li>
            <li>• ¿Cómo se ejecuta un saque de banda?</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
