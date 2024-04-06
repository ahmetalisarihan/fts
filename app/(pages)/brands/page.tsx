import BrandList from '@/components/BrandList'
import React from 'react'

const Markalar = () => {
  return (
    <div className='p-4 border border-slate-300'>
          <span className='font-bold'>Ürün Markalarımız</span>
          <div className=' font-semibold text-xl'>
          <BrandList />
          </div>
        </div>
  )
}

export default Markalar