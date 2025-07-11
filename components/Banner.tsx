import Link from 'next/link'
import React from 'react'

const Banner = () => {
  return (
<div className="bg-sky-600 text-white p-1 flex justify-between items-center">
      <div className="flex items-center">
        <h3 className="font-bold text-lg pl-2">Avantajlı Fiyatlarımızdan Faydalanmak İçin Teklif Alın</h3>
      </div>
      <Link href="/iletisim" className="bg-white text-blue-500 px-4 py-1 rounded-md font-bold">
        Hemen Teklif Alın
      </Link>
    </div>
  )
}

export default Banner