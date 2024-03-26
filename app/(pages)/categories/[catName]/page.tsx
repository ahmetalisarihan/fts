import { TProduct } from '@/app/types';
import Product from '@/components/Product';
import React from 'react'

const getProducts = async (catName : string):Promise<TProduct[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
    // {cache: "no-store"}
    )
    if(res.ok) {
      const categories = await res.json()
      const products = categories.products;
      return products
    }
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
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {products && products.length > 0 ? (
          products.map((product:TProduct) => (
          <Product
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.imageUrl}
          description={product.description}
          category={product.catName}
          brand={product.brandName}
          
          />
        ))
        ):(<div className='py-6'>Ürün bulunamadı</div>
        )}
      </div>
    </div>
  )
}

export default ProductsCategory