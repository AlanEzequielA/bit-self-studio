import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const dateParam = searchParams.get('date')
    const durationParam = searchParams.get('duration')

    if (!dateParam || !durationParam) {
      return NextResponse.json(
        { error: 'Fecha y duración son requeridos' },
        { status: 400 }
      )
    }

    const selectedDate = new Date(dateParam)
    const duration = parseInt(durationParam)

    // Set time to start of day
    const startOfDay = new Date(selectedDate)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(selectedDate)
    endOfDay.setHours(23, 59, 59, 999)

    // Get all appointments for this date
    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay
        },
        status: {
          in: ['PENDING', 'CONFIRMED']
        }
      }
    })

    // Define available time slots (9 AM to 6 PM)
    const timeSlots = []
    const startHour = 9
    const endHour = 18

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute of [0, 30]) {
        if (hour === endHour - 1 && minute === 30) break

        const slotStart = new Date(selectedDate)
        slotStart.setHours(hour, minute, 0, 0)

        const slotEnd = new Date(slotStart)
        slotEnd.setMinutes(slotEnd.getMinutes() + duration)

        // Check if this slot conflicts with existing appointments
        const hasConflict = appointments.some((apt: { date: Date; duration: number }) => {
          const aptStart = new Date(apt.date)
          const aptEnd = new Date(aptStart.getTime() + apt.duration * 60000)

          return (
            (slotStart >= aptStart && slotStart < aptEnd) ||
            (slotEnd > aptStart && slotEnd <= aptEnd) ||
            (slotStart <= aptStart && slotEnd >= aptEnd)
          )
        })

        // Check if slot is in the past
        const isPast = slotStart < new Date()

        if (!hasConflict && !isPast) {
          timeSlots.push({
            start: slotStart.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }),
            end: slotEnd.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }),
            available: true
          })
        }
      }
    }

    return NextResponse.json(timeSlots)
  } catch (error) {
    console.error('Error checking availability:', error)
    return NextResponse.json(
      { error: 'Error al verificar disponibilidad' },
      { status: 500 }
    )
  }
}
