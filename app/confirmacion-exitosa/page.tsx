'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function ConfirmacionContent() {
  const searchParams = useSearchParams()
  const [appointment, setAppointment] = useState<any>(null)

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      fetch(`/api/appointments/${id}`)
        .then(res => res.json())
        .then(data => setAppointment(data))
    }
  }, [searchParams])

  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  const appointmentDate = new Date(appointment.date)

  return (
    <main className="flex-1 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Illustration */}
          <div className="bg-amber-50 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-32 h-32 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          {/* Right: Confirmation Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Confirmación de Sesión (Directa)
            </h1>
            <p className="text-gray-700 mb-8">
              Tu cita para una Sesión de Auto-Fotografía ha sido agendada correctamente.
            </p>

            {/* Session Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4 text-gray-900">Detalles de tu Sesión</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-900">
                    {appointmentDate.toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-900">{appointmentDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-900">{appointment.duration} minutos</span>
                </div>
              </div>
            </div>

            {/* Preparation Tips */}
            <div className="mb-6">
              <h2 className="font-semibold mb-4 text-gray-900">Cómo Prepararse para tu Sesión</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Llega 10 minutos antes para familiarizarte con el equipo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Trae varios cambios de ropa y accesorios para variar tus fotos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">El espacio es tuyo: ¡diviértete y experimenta con poses!</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Recibirás todas tus fotos digitales poco después de la sesión.</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-full transition-colors">
                Agregar a mi Calendario
              </button>
              <Link
                href="/mis-citas"
                className="flex-1 bg-white border-2 border-gray-300 hover:border-yellow-400 text-gray-700 font-semibold py-3 px-6 rounded-full transition-colors text-center"
              >
                Ver Mis Citas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function ConfirmacionExitosaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <p>Cargando...</p>
        </div>
      }>
        <ConfirmacionContent />
      </Suspense>
      <Footer />
    </div>
  )
}
