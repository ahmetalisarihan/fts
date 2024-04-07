import React from 'react'
import { TCategory } from '@/app/types'
import Link from 'next/link'


const getCategories = async (): Promise<TCategory[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`)
    if(res.ok) {
      const categories = await res.json()
      return categories
    }
  } catch (error) {
    console.log(error)
  }
  return null
}


export default async function CategoriesList() {
  const categories = await getCategories()
  return (
    <div >
      {categories?.map((category) => (
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
