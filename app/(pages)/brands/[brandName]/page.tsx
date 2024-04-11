import { TProduct } from '@/app/types';
import Product from '@/components/Product';
import ProductCard from '@/components/ProductCard';
import React from 'react';

const getProducts = async (brandName: string): Promise<TProduct[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/brands/${brandName}`);
    if (res.ok) {
      const brands = await res.json();
      const products = brands.products;
      return products;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

const ProductsBrand = async ({ params }: { params: { brandName: string } }) => {
  const brand = params.brandName;
  const products = await getProducts(brand);

  if (!products) {
    return <div className='py-6'>Ürün bulunamadı</div>;
  }

  const productCount = products.length; 

  return (
    <div>
      <h1 className='font-bold text-xl py-2'>
        <span >Marka: </span>{" "}
        {decodeURIComponent(brand)}
      </h1>
      <h2 className='font-bold pl-4 py-1 text-blue-500'>Ürün Sayımız: {productCount}</h2> 
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {products.map((product: TProduct) => (
          <ProductCard key={product.id} product={product} /> 
         
        ))}
      </div>
    </div>
  );
};

export default ProductsBrand;