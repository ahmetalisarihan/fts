import { TProduct } from '@/app/types';
import ProductCard from '@/components/ProductCard';
import React from 'react'
import { OptimizedAPI } from '@/utils/api-optimization';

const getProducts = async (catName : string):Promise<TProduct[] | null> => {
  try {
    const categories = await OptimizedAPI.getCategoryProducts(catName);
    return categories.products;
  } catch (error) {
    console.log(error)
  }
  return null
};


const ProductsCategory = async ({params} : {
  params: { catName: string }
}) => {
  const category = params.catName;
  const products = await getProducts(category);
  
  return (
    <div>
            <h1>
        <span className="font-normal">Kategori: </span>{" "}
        {decodeURIComponent(category)}
        <h2 className='font-bold pl-4 py-1 text-blue-500'>Ürün Sayımız: {products?.length}</h2> 
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {products && products.length > 0 ? (
          products.map((product:TProduct) => (
          <ProductCard
          key={product.id}
          product={product}
          />
        ))
        ):(<div className='py-6'>Ürün bulunamadı</div>
        )}
      </div>
    </div>
  )
}

export default ProductsCategory