import { TBrand } from '@/app/types'
import Link from 'next/link'
import React from 'react'

const getBrands = async (): Promise<TBrand[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/brands`, {
      cache: 'no-store'
    })
    if (res.ok) {
      const response = await res.json()
      // API response'u success wrapper içinde olabilir
      const brands = response.data || response
      return Array.isArray(brands) ? brands : null
    }
  } catch (error) {
    console.error('Brands fetch error:', error)
  }
  return null
}

const BrandList = async () => {
  const brands = await getBrands()

  if (!brands || brands.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p>Henüz marka bulunmamaktadır.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {brands.map((brand) => (
        <Link
          key={brand.id}
          href={`/brands/${encodeURIComponent(brand.brandName)}`}
          className='block text-sm cursor-pointer hover:text-blue-500 py-1 px-2 rounded hover:bg-blue-50 transition-colors'
        >
          {brand.brandName}
        </Link>
      ))}
    </div>
  )
}

export default BrandList