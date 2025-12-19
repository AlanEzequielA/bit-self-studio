'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface SessionType {
  id: string
  name: string
  duration: number
  price: number
}

interface TimeSlot {
  start: string
  end: string
  available: boolean
}

export default function ReservarPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedSession, setSelectedSession] = useState<SessionType | null>(null)
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>([])
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch session types
    fetch('/api/sessions')
      .then(res => res.json())
      .then(data => {
        setSessionTypes(data)
        // Set default session if coming from servicios page
        const sessionParam = searchParams.get('session')
        if (sessionParam && data.length > 0) {
          const session = data.find((s: SessionType) => 
            s.name.toLowerCase().includes(sessionParam.replace('-', ' '))
          )
          if (session) setSelectedSession(session)
        } else if (data.length > 0) {
          setSelectedSession(data[0]) // Default to first session
        }
        setLoading(false)
      })
  }, [searchParams])

  useEffect(() => {
    if (selectedDate && selectedSession) {
      // Fetch available time slots for selected date
      fetch(`/api/availability?date=${selectedDate.toISOString()}&duration=${selectedSession.duration}`)
        .then(res => res.json())
        .then(data => setTimeSlots(data))
    }
  }, [selectedDate, selectedSession])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleConfirm = () => {
    if (selectedDate && selectedTime && selectedSession) {
      router.push(`/confirmar?date=${selectedDate.toISOString()}&time=${selectedTime}&sessionId=${selectedSession.id}`)
    }
  }

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  const defaultTimeSlots = [
    { start: '10:00', end: '11:00', available: true },
    { start: '11:30', end: '12:30', available: true },
    { start: '14:00', end: '15:00', available: true },
    { start: '15:30', end: '16:30', available: true },
    { start: '17:00', end: '18:00', available: true },
  ]

  const availableSlots = timeSlots.length > 0 ? timeSlots : defaultTimeSlots

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Estudio de Auto-Fotografía
            </h1>
            <p className="text-xl text-gray-600">
              Agenda tu sesión de fotografía con nosotros.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar and Time Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Calendar */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    ←
                  </button>
                  <h3 className="text-lg font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    →
                  </button>
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {generateCalendarDays().map((date, idx) => {
                    if (!date) return <div key={idx}></div>
                    const isSelected = selectedDate?.toDateString() === date.toDateString()
                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => !isPast && handleDateSelect(date)}
                        disabled={isPast}
                        className={`p-2 rounded ${
                          isSelected
                            ? 'bg-yellow-400 text-black font-semibold'
                            : isPast
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Horarios Disponibles</h3>
                  <div className="space-y-2">
                    {availableSlots.map((slot, idx) => {
                      const isSelected = selectedTime === `${slot.start}-${slot.end}`
                      return (
                        <button
                          key={idx}
                          onClick={() => slot.available && setSelectedTime(`${slot.start}-${slot.end}`)}
                          disabled={!slot.available}
                          className={`w-full p-3 rounded-lg text-left transition-colors ${
                            isSelected
                              ? 'bg-yellow-400 text-black font-semibold'
                              : slot.available
                              ? 'bg-white border border-gray-200 hover:border-yellow-400 text-gray-700'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {slot.start} - {slot.end}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Session Selection and Summary */}
            <div className="space-y-6">
              {/* Session Selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Tipo de Sesión</h3>
                <div className="space-y-3">
                  {sessionTypes.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => setSelectedSession(session)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                        selectedSession?.id === session.id
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}
                    >
                      <div className="font-semibold">{session.name}</div>
                      <div className="text-sm text-gray-600">
                        {session.duration} min - ${session.price} USD
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Appointment Summary */}
              {selectedDate && selectedTime && selectedSession && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Resumen de la Cita:</h3>
                  <div className="space-y-2 text-sm mb-6">
                    <p className="font-medium">{selectedSession.name}</p>
                    <p>{selectedDate.toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                    <p>{selectedTime}</p>
                    <p>Duración: {selectedSession.duration} min</p>
                    <p className="font-semibold text-lg mt-4">
                      Total: ${selectedSession.price} USD
                    </p>
                  </div>
                  <button
                    onClick={handleConfirm}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-full transition-colors"
                  >
                    Confirmar Cita
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

