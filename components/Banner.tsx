import Link from 'next/link'
import React from 'react'
import { Phone } from 'lucide-react'

const Banner = () => {
  return (
    <div className="bg-sky-600 text-white p-2 flex flex-col sm:flex-row justify-between items-center gap-2">
      <div className="flex items-center">
        <h3 className="font-bold text-base sm:text-lg pl-2">Avantajlı Fiyatlarımızdan Faydalanmak İçin Teklif Alın</h3>
      </div>
      
      <div className="flex items-center gap-3 pr-2">
        {/* Telefon Numarası */}
        <a 
          href="tel:+905395160183" 
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-colors"
        >
          <Phone className="h-4 w-4" />
          <span className="font-bold text-sm sm:text-base whitespace-nowrap">+90 539 516 01 83</span>
        </a>
        
        {/* Teklif Al Butonu */}
        <Link 
          href="/iletisim" 
          className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-1.5 rounded-md font-bold text-sm sm:text-base transition-colors whitespace-nowrap"
        >
          Hemen Teklif Alın
        </Link>
      </div>
    </div>
  )
}

export default Banner