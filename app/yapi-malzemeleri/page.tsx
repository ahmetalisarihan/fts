import React from 'react'
import { TProduct } from '../types'
import Link from 'next/link';
import CategoriesList from '@/components/CategoriesList';
import BrandList from '@/components/BrandList';
import ProductCard from '@/components/ProductCard';


const getProducts = async ():Promise<TProduct[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/`)
    if(res.ok) {
      const products = await res.json()
      return products
    }
  } catch (error) {
    console.log(error)
  }
  return null
};



export default async function YapiMalzemeleri() {
  const products= await getProducts();

  return (
    <div className='flex pt-6'>
      <div className='flex flex-col '>
        <div className='px-4 border-x border-t border-slate-300 '>
          <span className='font-bold'>Kategori</span>
          <div>
          <CategoriesList />

            </div>
        </div>
        <div className='px-4 border border-slate-300'>
          <span className='font-bold'>Marka</span>
          <BrandList />
        </div>
      </div>
      <div className='flex flex-col'>
        <h2 className='font-bold pl-4'>MALZEME PORTFÖYÜMÜZ</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {products && products.length > 0 ? (
  products.map((product: TProduct) => (
    <ProductCard key={product.slug} product={product}
    />
  ))
) : (
  <div className="py-6">Ürün bulunamadı</div>
)}
        </div>
      </div>
    </div>
  )
}
