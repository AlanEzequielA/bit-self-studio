'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface AppointmentDetails {
  sessionType: {
    name: string
    duration: number
  }
  date: string
  time: string
}

export default function ConfirmarPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [details, setDetails] = useState<AppointmentDetails | null>(null)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const date = searchParams.get('date')
    const time = searchParams.get('time')
    const sessionId = searchParams.get('sessionId')

    if (date && time && sessionId) {
      // Fetch session details
      fetch(`/api/sessions/${sessionId}`)
        .then(res => res.json())
        .then(session => {
          setDetails({
            sessionType: {
              name: session.name,
              duration: session.duration
            },
            date: date,
            time: time
          })
        })
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const date = searchParams.get('date')
      const time = searchParams.get('time')
      const sessionId = searchParams.get('sessionId')

      const [startTime, endTime] = time?.split('-') || []
      const appointmentDate = new Date(date || '')
      const [startHour, startMin] = startTime.split(':')
      appointmentDate.setHours(parseInt(startHour), parseInt(startMin), 0, 0)

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionTypeId: sessionId,
          date: appointmentDate.toISOString(),
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone
        })
      })

      if (response.ok) {
        const appointment = await response.json()
        router.push(`/confirmacion-exitosa?id=${appointment.id}`)
      } else {
        alert('Error al confirmar la cita. Por favor intenta de nuevo.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al confirmar la cita. Por favor intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  const appointmentDate = new Date(details.date)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
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

            {/* Right: Confirmation Form */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Confirmación de Sesión
              </h1>
              <p className="text-gray-600 mb-8">
                Tu cita para una Sesión de Auto-Fotografía ha sido agendada correctamente.
              </p>

              {/* Session Details */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="font-semibold mb-4">Detalles de tu Sesión</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
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
                    <span>{details.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{details.sessionType.duration} minutos</span>
                  </div>
                </div>
              </div>

              {/* Customer Info Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono (Opcional)
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-full transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Confirmando...' : 'Confirmar Cita'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

