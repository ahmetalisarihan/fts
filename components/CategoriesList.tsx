import React from 'react'
import { TCategory } from '@/app/types'
import Link from 'next/link'
import getCategories from '@/actions/get-categories'





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
