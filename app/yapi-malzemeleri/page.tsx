import React from 'react'
import { TProduct } from '../types';
import getProducts from '@/actions/get-products'
import CategoriesList from '@/components/CategoriesList';
import BrandList from '@/components/BrandList';
import ProductCard from '@/components/ProductCard';


export default async function YapiMalzemeleri() {
  const products= await getProducts();

  return (
    <div className='flex pt-6 gap-2'>
      <div className='flex flex-col pt-12'>
        <div className='px-4 border-x rounded-t-lg border-t border-slate-300 '>
          <span className='font-bold'>Kategori</span>
          <div className='font-semibold pt-1 pb-3'>
          <CategoriesList />

            </div>
        </div>
        <div className='px-4 border rounded-b-lg border-slate-300'>
          <span className='font-bold'>Marka</span>
          <div className='font-semibold pt-1 pb-3'>
          <BrandList />
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <h2 className='font-bold pl-4 py-2 text-2xl'>MALZEME PORTFÖYÜMÜZ</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {products && products.length > 0 ? (
  products.map((product: TProduct) => (
    <ProductCard key={product.id} product={product}
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
