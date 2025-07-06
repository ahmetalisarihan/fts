import { TProduct } from '@/app/types';
import { generateProductMetadata } from '@/libs/metadata';
import { ResolvingMetadata } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  params: { slug: string };
};

// Get single product by slug
async function getProduct(slug: string): Promise<TProduct | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      cache: 'no-store' // Always get fresh data
    });
    
    if (res.ok) {
      const product = await res.json();
      return product;
    } else {
      console.error('Product not found:', res.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Metadata oluşturma fonksiyonu
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata) {
  return generateProductMetadata(params.slug, parent); // 'parent' argümanını ekledik
}

const ProductDetail = async ({ params }: Props) => {
  const product = await getProduct(params.slug);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Ürün Bulunamadı!</h1>
          <p className="text-gray-600 mb-4">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
          <p className="text-sm text-gray-500">Slug: {params.slug}</p>
          <Link href="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{`${product.name ? product.name + ' - ' : ''}${product.metaTitle ? product.metaTitle + ' | ' : ''}FTS`}</title>
        <meta name="description" content={product.metaDescription || ''} />
        <meta name="keywords" content={product.metaKeywords || ''} />
      </Head>
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        <div className='border rounded-lg p-4 hover:shadow-md flex flex-col items-center transform transition duration-500 hover:scale-105 my-3'>
          <Image src={product.imageUrl || ''} alt={product.name || ''} width={400} height={400} />
        </div>
        <div className='py-4 pl-6'>
          <h1 className='font-bold text-xl py-2'>
            <span>Malzeme Adı: </span>
            <span className='text-blue-500'>{decodeURIComponent(product.name || '')}</span>
          </h1>
          <div>
            <span className='font-bold'>Kategori: </span>
            {product.catName && product.subcatName ? (
              <span>
                <Link href={`/categories/${product.catName}`} className='text-blue-500'>
                  {decodeURIComponent(product.catName)}
                </Link>
                {' / '}
                <Link href={`/categories/${product.catName}/subcategories/${product.subcatName}`} className='text-blue-500'>
                  {decodeURIComponent(product.subcatName)}
                </Link>
              </span>
            ) : (
              <Link href={`/categories/${product.catName || ''}`} className='text-blue-500'>
                {decodeURIComponent(product.catName || '')}
              </Link>
            )}
          </div>
          <div>
            <span className='font-bold'>Marka: </span>
            <Link href={`/brands/${product.brandName || ''}`} className='text-blue-500'>
              {decodeURIComponent(product.brandName || '')}
            </Link>
          </div>
          <div>
            <span className='font-bold'>Fiyat Listesi: </span>
            <Link href={`/pricelists/${product.priceName || ''}`} target='_blank' className='text-blue-500'>
              {decodeURIComponent(product.priceName || '')}
            </Link>
          </div>
        </div>
      </div>
      <div className='text-wrap pl-4'>
        <span className='font-bold text-lg'>Malzeme Açıklaması: </span>
        <pre className='whitespace-pre-wrap break-words max-w-xl font-sans'>{product.description || ''}</pre>
      </div>
    </div>
  );
};

export default ProductDetail;