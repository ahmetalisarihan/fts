import { TBrand } from '@/app/types'
import Link from 'next/link'
import React from 'react'
import getBrands from '@/actions/get-brands'


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