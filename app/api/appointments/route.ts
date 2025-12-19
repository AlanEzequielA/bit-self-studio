import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sessionTypeId, date, customerName, customerEmail, customerPhone } = body

    if (!sessionTypeId || !date || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Get session type to get duration
    const sessionType = await prisma.sessionType.findUnique({
      where: { id: sessionTypeId }
    })

    if (!sessionType) {
      return NextResponse.json(
        { error: 'Tipo de sesión no encontrado' },
        { status: 404 }
      )
    }

    // Check if the time slot is still available
    const appointmentDate = new Date(date)
    const startOfSlot = new Date(appointmentDate)
    startOfSlot.setSeconds(0, 0)
    
    const endOfSlot = new Date(startOfSlot.getTime() + sessionType.duration * 60000)

    const conflictingAppointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfSlot,
          lt: endOfSlot
        },
        status: {
          in: ['PENDING', 'CONFIRMED']
        }
      }
    })

    if (conflictingAppointments.length > 0) {
      return NextResponse.json(
        { error: 'Este horario ya no está disponible' },
        { status: 409 }
      )
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        sessionTypeId,
        date: startOfSlot,
        duration: sessionType.duration,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        status: 'PENDING'
      },
      include: {
        sessionType: true
      }
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Error al crear la cita' },
      { status: 500 }
    )
  }
}

