
import PriceList from '@/components/PriceList'
import React from 'react'

// ISR - Free Plan dostu ayarlar
export const revalidate = 28800 // 8 saat

const fiyatlisteleri = () => {
  return (
    <div className='mt-4'>
      <span className='text-xl'>Fiyat Listeleri</span>
      <div className=''>
      <PriceList/>

      </div>
      </div>
  )
}

export default fiyatlisteleri