import { TProduct } from '@/app/types';
import ProductCard from '@/components/ProductCard';
import React from 'react'

const getProducts = async (subcatName : string):Promise<TProduct[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/subcategories/${subcatName}`,
    // {cache: "no-store"}
    )
    if(res.ok) {
      const subcategories = await res.json()
      const products = subcategories.products;
      return products
    }
  } catch (error) {
    console.log(error)
  }
  return null
};


const ProductsSubCategory = async ({params} : {
  params: { subcatName: string }
}) => {
  const subcategory = params.subcatName;
  const products = await getProducts(subcategory);
  
  return (
    <div>
            <h1>
        <span className="font-normal">Kategori: </span>{" "}
        {decodeURIComponent(subcategory)}
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

export default ProductsSubCategory