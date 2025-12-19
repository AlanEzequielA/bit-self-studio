import Link from 'next/link'

interface HeaderProps {
  currentPage?: 'inicio' | 'servicios' | 'portafolio' | 'nosotros' | 'contacto'
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-black">bit.</span>
            <span className="text-lg text-gray-600">Self Studio</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                currentPage === 'inicio'
                  ? 'text-yellow-500'
                  : 'text-gray-700 hover:text-yellow-500'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/servicios"
              className={`text-sm font-medium transition-colors ${
                currentPage === 'servicios'
                  ? 'text-yellow-500'
                  : 'text-gray-700 hover:text-yellow-500'
              }`}
            >
              Servicios
            </Link>
            <Link
              href="/portafolio"
              className={`text-sm font-medium transition-colors ${
                currentPage === 'portafolio'
                  ? 'text-yellow-500'
                  : 'text-gray-700 hover:text-yellow-500'
              }`}
            >
              Portafolio
            </Link>
            <Link
              href="/contacto"
              className={`text-sm font-medium transition-colors ${
                currentPage === 'contacto'
                  ? 'text-yellow-500'
                  : 'text-gray-700 hover:text-yellow-500'
              }`}
            >
              Contacto
            </Link>
            <Link
              href="/reservar"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Reservar Cita
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

