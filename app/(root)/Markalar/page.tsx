import BrandList from '@/components/BrandList'
import React from 'react'

const markalar = () => {
  return (
    <div className='px-4 border border-slate-300'>
          <span className='font-bold'>Marka</span>
          <BrandList />
        </div>
  )
}

export default markalar