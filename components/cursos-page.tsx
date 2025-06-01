"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function CursosPage({ showEnrollmentForm: showFormProp }: { showEnrollmentForm?: boolean }) {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(showFormProp || false)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.email.includes("@")) {
      alert("Por favor, completa todos los campos y asegúrate de que el email sea válido.")
      return
    }
    setSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6">
        🎓 Cursos para Entrenadores de Fútbol
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-100 mb-8">
        Encuentra la formación ideal para desarrollar tus <strong>habilidades</strong> como entrenador.
      </p>

      {/* Featured Course Image */}
      <div className="flex justify-center mb-8">
        <Image
          src="https://zwigp4wtrpf7zjex.public.blob.vercel-storage.com/soccer-O0LwwU2TsHukDxUJUoi509sAnGZRnH.png"
          alt="Curso de entrenamiento"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>

      <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800 dark:text-blue-300">
            Curso destacado: <strong>Entrenador de Fútbol Infantil</strong>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-100">
            Un programa completo para formar a los entrenadores del futuro, basado en la metodología FIFA.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Duración:</strong> 6 semanas
            </div>
            <div>
              <strong>Lecciones:</strong> 17
            </div>
            <div>
              <strong>Costo:</strong> ¡Completamente Gratis!
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-100">
            Este programa, inspirado en los prestigiosos contenidos de FIFA Grassroots, está diseñado para equiparte con
            todo lo necesario para convertirte en el entrenador que todo niño deseará tener. Cubre aspectos esenciales
            como la psicología infantil y deportiva, estrategias de enseñanza efectivas, organización de eventos
            futbolísticos y la habilidad para inculcar valores esenciales.
          </p>
        </CardContent>
      </Card>

      {/* Program Content */}
      <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800 dark:text-blue-300">📚 Programa de estudios:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">Módulo 1:</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Bienvenidos al Campus</li>
                <li>La filosofía del fútbol base</li>
                <li>Actividad Inicial</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">Módulo 2:</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>El entrenador-educador de fútbol</li>
                <li>El niño y el fútbol</li>
                <li>Las 3 fases</li>
                <li>El entrenador en las 3 fases</li>
                <li>La organización de los entrenamientos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">Módulo 3:</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>La iniciación</li>
                <li>La realidad madurativa</li>
                <li>Los esquemas motores</li>
                <li>Las habilidades motrices básicas</li>
                <li>Las habilidades motrices específicas</li>
                <li>Capacidad de transformación</li>
                <li>Habilidades sensoperceptivas</li>
                <li>La orientación del cuerpo</li>
                <li>Gestos técnicos basados en esquemas motores</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">Módulo 4:</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>El desarrollo</li>
                <li>El reglamento</li>
                <li>Las superficies y los arcos</li>
                <li>El balón</li>
                <li>La vestimenta</li>
                <li>Los partidos reducidos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-300">Módulo 5:</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>El rendimiento</li>
                <li>La preparación</li>
                <li>Los retos modernos</li>
                <li>La competición</li>
                <li>La organización de torneos</li>
                <li>La organización de festivales</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Content and Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800 dark:text-blue-300">Contenido Clave:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>- Filosofía del Fútbol Base</li>
              <li>- El Papel del Entrenador como Educador</li>
              <li>- Métodos Pedagógicos Adaptados a Niños</li>
              <li>- Organización de Torneos y Festivales</li>
              <li>- Reglamento del Fútbol Infantil</li>
              <li>- Fundamentos Técnicos y Partidos Reducidos</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800 dark:text-blue-300">Beneficios Principales:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>- Certificado Internacional Personalizado</li>
              <li>- Visibilidad Profesional</li>
              <li>- Flexibilidad en el Estudio</li>
              <li>- Desarrollo Profesional y Personal</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* What to Expect */}
      <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800 dark:text-blue-300">🚀 Qué esperar al concluir:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-100">
            Al finalizar, habrás enriquecido tu <strong>perfil profesional</strong> con una{" "}
            <strong>certificación internacional</strong> y mayor visibilidad. Obtendrás <strong>flexibilidad</strong> en
            tu aprendizaje y estarás bien preparado para los desafíos y oportunidades en el ámbito del entrenamiento
            deportivo.
          </p>
        </CardContent>
      </Card>

      {/* Enrollment Button */}
      {!showEnrollmentForm && (
        <div className="text-center">
          <Button
            onClick={() => setShowEnrollmentForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Inscríbete aquí
          </Button>
        </div>
      )}

      {/* Enrollment Form */}
      {showEnrollmentForm && !submitted && (
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-blue-800 dark:text-blue-300">Formulario de inscripción</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre:</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="apellido">Apellido:</Label>
                <Input id="apellido" name="apellido" value={formData.apellido} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email:</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Enviar inscripción
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Success Message */}
      {submitted && (
        <Card className="mb-8 border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-green-800 dark:text-green-200 font-semibold">
                ¡Gracias por tu interés! Nos pondremos en contacto para completar tu inscripción.
              </p>
              <p className="text-blue-800 dark:text-blue-300 font-bold text-lg">Ya estás a un paso de tu futuro:</p>
              <video
                controls
                className="w-full max-w-2xl mx-auto rounded-lg"
                src="https://zwigp4wtrpf7zjex.public.blob.vercel-storage.com/video-pSabsj1WEObygDwryLGdpGgAdKEKUS.mp4"
              >
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Other Courses */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800 dark:text-blue-300">Próximamente otros cursos:</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>• Pretemporada para Futbolistas</li>
            <li>• Curso de Motivación para Fútbolistas</li>
            <li>• Entrenador de Futsal | Contenidos UEFA</li>
            <li>• Entrenador de fútbol | Contenidos licencia B</li>
            <li>• Entrenador de Futbol Infantil - Contenidos UEFA</li>
            <li>• Entrenador Futbol Base</li>
            <li>• Entrenador de Futbol Juvenil FIFA</li>
            <li>• Entrenador de Futbol Infantil (Programa Grassroots)</li>
            <li>• Videoanalisis Deportivo (Longomatch + Post Producción + Scout)</li>
            <li>• Entrenador de Arqueros | Contenidos UEFA</li>
            <li>• Especialista en Rondos en el Fútbol Moderno</li>
            <li>• Entrenador de Arqueros</li>
            <li>• Preparación Física en el Fútbol Juvenil</li>
            <li>• Dirección Técnica de Equipos de Fútbol Femenino</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
