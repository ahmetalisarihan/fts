import { getProducts } from '@/libs/getProducts';
import { generateProductMetadata } from '@/libs/metadata';
import { ResolvingMetadata } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  params: { slug: string };
};

// Metadata oluşturma fonksiyonu
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata) {
  return generateProductMetadata(params.slug, parent); // 'parent' argümanını ekledik
}

const ProductDetail = async ({ params }: Props) => {
  const products = await getProducts();

  // products null olabilir, kontrol ediyoruz
  if (!products) {
    return <div>Ürünler yüklenemedi!</div>;
  }

  const product = products.find((product) => product.slug === params.slug);

  if (!product) {
    return <div>Ürün Bulunamadı!</div>;
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