import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="inicio" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-900 to-amber-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Captura tu Esencia.
              <br />
              Agenda tu Espacio de Auto-Fotografía.
            </h1>
            <p className="text-xl mb-8 text-amber-100">
              Un estudio privado donde tú eres el fotógrafo y el modelo. Sin fotógrafos, sin presión. Solo tú y el espejo.
            </p>
            <Link
              href="/reservar"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold transition-colors"
            >
              Reservar Cita
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Nuestros Servicios
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Sesiones de Auto-Retrato</h3>
              <p className="text-gray-800 mb-4">
                Disfruta de una sesión privada de 30 o 60 minutos con equipo profesional pre-configurado.
              </p>
              <Link href="/servicios" className="text-yellow-500 font-medium hover:underline">
                Ver detalles →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fotografía de Producto DIY</h3>
              <p className="text-gray-600 mb-4">
                Ideal para emprendedores. Trae tus productos y usa nuestro set de luces y fondos.
              </p>
              <Link href="/servicios" className="text-yellow-500 font-medium hover:underline">
                Ver detalles →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Alquiler de Estudio Privado</h3>
              <p className="text-gray-800 mb-4">
                El espacio completo para creadores de contenido. Fondos infinitos y privacidad total.
              </p>
              <Link href="/servicios" className="text-yellow-500 font-medium hover:underline">
                Ver detalles →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Testimonios</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-yellow-400 text-4xl mb-4">"</div>
              <p className="text-gray-800 mb-4">
                Una experiencia liberadora. Pude tomarme el tiempo que necesitaba para conseguir la foto perfecta para mi LinkedIn.
              </p>
              <p className="font-semibold">— Ana G.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-yellow-400 text-4xl mb-4">"</div>
              <p className="text-gray-800 mb-4">
                Increíble calidad de iluminación. Mis fotos de producto parecen hechas por una agencia, pero lo hice yo mismo en una hora.
              </p>
              <p className="font-semibold">— Carlos M.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-yellow-400 text-4xl mb-4">"</div>
              <p className="text-gray-800 mb-4">
                El espacio es muy privado y cómodo. Fui con mi pareja y nos divertimos muchísimo haciendo las fotos. ¡Repetiremos!
              </p>
              <p className="font-semibold">— Sofía & Luis</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
