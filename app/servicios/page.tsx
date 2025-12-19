import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { prisma } from '@/lib/prisma'

export default async function ServiciosPage() {
  // Obtener las sesiones directamente desde la base de datos
  const sessionTypes = await prisma.sessionType.findMany({
    orderBy: {
      duration: 'asc'
    }
  })

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage="servicios" />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Reservar Sesión y Precios
            </h1>
            <p className="text-xl text-gray-700">
              Tu estudio de auto-fotografía profesional. Tú tienes el control. Reserva tu tiempo.
            </p>
          </div>

          {/* Service Description Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400 rounded-full -ml-12 -mb-12 opacity-20"></div>

            <div className="relative">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Estudio de Auto-Fotografía
                  </h2>
                  <p className="text-gray-900 text-lg">
                    Controla tu propia sesión en nuestro estudio profesional. Incluye equipo de alta calidad y espacio privado. ¡Captura tus mejores momentos a tu ritmo!
                  </p>
                </div>
              </div>

              {/* Session Packages */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {sessionTypes.length > 0 ? (
                  sessionTypes.map((session: { id: string; name: string; description: string | null; duration: number; price: number }) => (
                    <div key={session.id} className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {session.name}
                      </h3>
                      <p className="text-gray-900 mb-2">
                        {session.description}
                      </p>
                      <p className="text-gray-900 mb-4">
                        ({session.duration} min) | ${session.price} MXN
                      </p>
                      <Link
                        href={`/reservar?session=${session.name.toLowerCase().replace(' ', '-')}`}
                        className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-full transition-colors"
                      >
                        Seleccionar
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-gray-800">No hay sesiones disponibles en este momento.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
