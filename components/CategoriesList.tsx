import React from 'react'
import { TCategory } from '@/app/types'
import Link from 'next/link'


const getCategories = async (): Promise<TCategory[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
      cache: 'no-store'
    })
    if(res.ok) {
      const response = await res.json()
      // API response format: { success: true, data: categories }
      return response.data || response
    }
  } catch (error) {
    console.log(error)
  }
  return null
}


export default async function CategoriesList() {
  const categories = await getCategories()
  
  if (!categories || !Array.isArray(categories)) {
    return <div className="text-sm text-gray-500">Kategori bulunamadı</div>
  }
  
  return (
    <div>
      {categories.map((category) => (
        <Link 
        key={category.id} 
        href={`/categories/${category.catName}`}
        className='flex text-sm cursor-pointer hover:text-blue-500'
        >
          {category.catName}
        </Link>
      ))}
    </div>
  )
}
