import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Academia del Éxito",
  description: "Tu centro de formación para convertirte en un entrenador de élite",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1e40af",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
