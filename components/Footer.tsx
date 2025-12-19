import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">bit. Self Studio</h3>
            <p className="text-gray-400 text-sm">
              Tu estudio de auto-fotografía profesional. Captura tu mejor versión, a tu propio ritmo.
            </p>
          </div>
          <div>
            <h4 className="text-yellow-400 font-semibold mb-4">CONTACTO</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Email: info@bitselfstudio.com</p>
              <p>Teléfono: +1 555-1234</p>
            </div>
          </div>
          <div>
            <h4 className="text-yellow-400 font-semibold mb-4">SOCIAL</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                YouTube
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-yellow-400 font-semibold mb-4">INTERNET</h4>
            <div className="space-y-2 text-sm">
              <Link href="/terminos" className="text-gray-300 hover:text-yellow-400 block transition-colors">
                Términos y Condiciones
              </Link>
              <Link href="/privacidad" className="text-gray-300 hover:text-yellow-400 block transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-yellow-400 block transition-colors">
                Preguntas Frecuentes
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 bit. Self Studio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

