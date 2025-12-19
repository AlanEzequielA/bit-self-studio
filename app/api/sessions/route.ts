import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sessions = await prisma.sessionType.findMany({
      orderBy: { duration: 'asc' }
    })
    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Error al obtener las sesiones' },
      { status: 500 }
    )
  }
}

