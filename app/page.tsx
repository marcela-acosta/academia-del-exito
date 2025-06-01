"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import CursosPage from "@/components/cursos-page"
import AsistentePage from "@/components/asistente-page"
import PodcastPage from "@/components/podcast-page"
import CursoSelectorPage from "@/components/curso-selector-page"
import Image from "next/image"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("cursos")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)

  useEffect(() => {
    if (currentPage !== "cursos") {
      setShowEnrollmentForm(false)
    }
  }, [currentPage])

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "cursos":
        return <CursosPage showEnrollmentForm={showEnrollmentForm} />
      case "asistente":
        return <AsistentePage />
      case "podcast":
        return <PodcastPage />
      case "selector":
        return (
          <CursoSelectorPage
            onNavigateToCursos={() => {
              setShowEnrollmentForm(true)
              setCurrentPage("cursos")
            }}
          />
        )
      default:
        return <CursosPage />
    }
  }

  const navigationItems = [
    { id: "cursos", label: "🎓 Cursos para Entrenadores", icon: "🎓" },
    { id: "selector", label: "🔍 ¿Qué curso elijo?", icon: "🔍" },
    { id: "asistente", label: "🤖 Asistente del Reglamento", icon: "🤖" },
    { id: "podcast", label: "🎙️ Podcast", icon: "🎙️" },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden dark:text-white dark:border-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <div className="flex items-center justify-center flex-1">
              <Image src="/favicon.png" alt="Soccer ball" width={48} height={48} className="w-8 h-8 lg:w-12 lg:h-12" />
              <h1 className="text-2xl lg:text-5xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                Academia del Éxito
              </h1>
            </div>
            <ThemeToggle />
          </div>
          <p className="text-sm lg:text-xl text-center text-gray-600 dark:text-gray-100 italic px-2">
            Tu centro de formación para convertirte en un <strong>entrenador de élite</strong>
          </p>
          <div className="h-1 bg-gradient-to-r from-blue-800 to-blue-600 rounded-full mt-4 lg:mt-6"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Desktop Sidebar Navigation */}
        <div className="hidden lg:block w-64 bg-gray-100 dark:bg-gray-800 min-h-screen p-4">
          <nav className="space-y-3">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                variant={currentPage === item.id ? "default" : "outline"}
                className="w-full justify-start text-left bg-gray-600 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id)
                    setMobileMenuOpen(false)
                  }}
                  variant={currentPage === item.id ? "default" : "outline"}
                  className="w-full justify-start text-left bg-gray-600 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 bg-white dark:bg-gray-900">{renderCurrentPage()}</div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center text-sm lg:text-base text-gray-600 dark:text-gray-100">
          © 2025 Academia del Éxito | Creado con Next.js
        </div>
      </footer>
    </div>
  )
}
