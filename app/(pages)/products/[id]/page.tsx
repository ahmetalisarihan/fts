import { TProduct } from '@/app/types';
import Link from 'next/link';
import React from 'react';

const getProductById = async (id: string): Promise<TProduct | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`);
    if (res.ok) {
      const product = await res.json();
      return product;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const product = await getProductById(params.id);

  if (!product) {
    return <div className='py-6'>Ürün bulunamadı</div>;
  }

  return (
    <div>
      <div className='flex'>
        <div>
          <img src={product.imageUrl || ""} alt={product.name || ""} width={400} height={400} />
        </div>
        <div className='p-12'>
          <h1>
            <span className="font-bold">Malzeme Adı: </span>{" "}
            {decodeURIComponent(product.name || "")}
          </h1>

          <div>
            <span className="font-bold">Kategori: </span>{" "}
            <Link
              href={`/categories/${product.catName || ""}`}
              className='text-blue-500'
            >
              {decodeURIComponent(product.catName || "")}
            </Link>
          </div>
          <div>
            <span className="font-bold">Marka: </span>{" "}
            <Link href={`/brands/${product.brandName || ""}`} className='text-blue-500'>
              {decodeURIComponent(product.brandName || "")}
            </Link>
          </div>
          <div>
            <span className="font-bold">Fiyat Listesi: </span>{" "}
            <Link
              href={`/fiyat-listesi/${product.priceName || ""}`}
              target='_blank'
              className='text-blue-500'
            >
              {decodeURIComponent(product.priceName || "")}
            </Link>
          </div>
        </div>
      </div>
      <div className='py-8'>
        <span className="font-bold">Malzeme Açıklaması: </span>{" "}
        <p>{product.description || ""}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
