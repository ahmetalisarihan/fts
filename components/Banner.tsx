import Link from 'next/link'
import React from 'react'

const Banner = () => {
  return (
<div className="bg-sky-600 text-white p-1 flex justify-between items-center">
      <div className="flex items-center">
        {/* <img src="/indir indirimi.jpg" alt="İndirim" className="w-6 h-6 mr-4" /> */}
        <h3 className="font-bold text-lg pl-2">Avantajlı Fiyatlarımızdan Faydalanmak İçin Teklif Alın</h3>
      </div>
      <Link href="/teklif-al" className="bg-white text-blue-500 px-4 py-1 rounded-md font-bold">
        Hemen Teklif Alın
      </Link>
    </div>
  )
}

export default Banner