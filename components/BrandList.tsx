import { TBrand } from '@/app/types'
import Link from 'next/link'
import React from 'react'

const getBrands = async (): Promise<TBrand[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/brands`)
    if(res.ok) {
      const brands = await res.json()
      return brands
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

const BrandList = async () => {
    const brands = await getBrands()
  return (
    <div>
        {brands?.map((brand) => (
            <Link
            key={brand.id}
            href={`/brands/${brand.brandName}`}
            className='flex text-sm cursor-pointer hover:text-blue-500'
            >
                {brand.brandName}
            </Link>
        ))}
    </div>
  )
}

export default BrandList