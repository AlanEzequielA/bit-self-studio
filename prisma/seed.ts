import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create session types
  const sessionTypes = [
    {
      name: 'Sesión Express',
      duration: 30,
      price: 80,
      description: 'Perfecta para fotos rápidas y profesionales'
    },
    {
      name: 'Sesión Clásica',
      duration: 60,
      price: 140,
      description: 'Ideal para sesiones completas con varios cambios'
    },
    {
      name: 'Sesión Premium',
      duration: 90,
      price: 200,
      description: 'Máximo tiempo para crear contenido profesional'
    }
  ]

  for (const sessionType of sessionTypes) {
    await prisma.sessionType.upsert({
      where: { name: sessionType.name },
      update: {},
      create: sessionType
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

