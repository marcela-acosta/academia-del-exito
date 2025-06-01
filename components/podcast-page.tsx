"use client"

export default function PodcastPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6">
        🎙️ Episodios del Podcast de la Academia
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-100 mb-8">
        Aquí encontrarás los episodios de nuestro podcast donde hablamos sobre la <strong>Academia del Éxito</strong>,
        nuestros cursos y temas relevantes del fútbol.
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-4">
          Episodio Destacado: Comentarios de Periodistas Deportivos
        </h3>

        <p className="text-gray-700 dark:text-gray-100 mb-6">
          En este primer episodio, contamos con la participación de dos reconocidos periodistas deportivos que comparten
          sus impresiones y comentarios sobre la <strong>Academia del Éxito</strong>. Escucha sus perspectivas sobre
          nuestra propuesta educativa y el impacto que buscamos en la formación de entrenadores.
        </p>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-3">Escucha el episodio aquí:</h4>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <audio
              controls
              className="w-full"
              src="https://zwigp4wtrpf7zjex.public.blob.vercel-storage.com/episodio-RO2ksHbswS3pkQHYc2VtMzX5xuTVyx.wav"
            >
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-3">Sobre este episodio:</h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-100">
            <li>
              • <strong>Duración:</strong> Episodio completo
            </li>
            <li>
              • <strong>Tema:</strong> Presentación de la Academia del Éxito
            </li>
            <li>
              • <strong>Invitados:</strong> Periodistas deportivos especializados
            </li>
            <li>
              • <strong>Formato:</strong> Entrevista y análisis
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">Próximos episodios</h3>
        <p className="text-gray-700 dark:text-gray-100 mb-4">
          Mantente atento a nuestros próximos episodios donde abordaremos:
        </p>
        <ul className="space-y-2 text-gray-700 dark:text-gray-100">
          <li>• Metodologías de entrenamiento para fútbol infantil</li>
          <li>• Entrevistas con entrenadores profesionales</li>
          <li>• Análisis del reglamento FIFA y sus actualizaciones</li>
          <li>• Casos de éxito de nuestros estudiantes</li>
          <li>• Tendencias en el fútbol formativo</li>
        </ul>
      </div>

      <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8">
        <h3 className="text-xl font-semibold mb-4">¿Tienes sugerencias para el podcast?</h3>
        <p className="mb-4">
          Nos encantaría escuchar tus ideas para futuros episodios o temas que te gustaría que abordemos.
        </p>
        <p className="text-blue-100">
          Contáctanos a través de nuestros canales oficiales para compartir tus sugerencias.
        </p>
      </div>
    </div>
  )
}
