
import { TProduct } from '@/app/types';
import { Metadata, ResolvingMetadata } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getProducts = async (): Promise<TProduct[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/`);
    console.log('Fetch URL:', `${process.env.NEXTAUTH_URL}/api/products/`);
    if (res.ok) {
      const products: TProduct[] = await res.json();
      console.log('Fetched products:', products);
      return products;
    } else {
      console.error('Failed to fetch products:', res.statusText);
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const products = await getProducts();
    const product = products?.find((p) => p.slug === params.slug);

    const previousImages = (await parent).openGraph?.images || [];
    const metadataBase = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    return {
      title: `${product?.name || ''} - ${product?.metaTitle || 'FTS'}`,
      description: product?.metaDescription || '',
      keywords: product?.metaKeywords || '',
      openGraph: {
        title: `${product?.name || ''} - ${product?.metaTitle || 'FTS'}`,
        description: product?.metaDescription || '',
        images: [
          `${metadataBase}${product?.imageUrl || '/public/logo.png'}`,
          ...previousImages.map((img) => `${metadataBase}${img}`),
        ],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    throw new Error('Error generating metadata');
  }
}

export async function generateStaticParams(): Promise<{ params: { slug: string } }[]> {
  try {
    const products = await getProducts();
    console.log('Generated static params:', products?.map((product) => ({
      slug: product.slug,
    })) || []);
    return products?.map((product) => ({
      params: {
        slug: product.slug,
      },
    })) || [];
  } catch (error) {
    console.error('Error generating static params:', error);
    throw new Error('Error generating static params');
  }
}

const ProductDetail = async ({ params }: { params: { slug: string } }) => {
  try {
    const products = await getProducts();
    console.log('Fetched products in ProductDetail:', products);
    const product = products?.find((product) => product.slug === params.slug);

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
          <div>
            <img src={product.imageUrl || ''} alt={product.name || ''} width={400} height={400} />
          </div>
          <div className='p-4'>
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
        <span className='font-bold'>Malzeme Açıklaması: </span>
        <pre className='whitespace-pre-wrap break-words max-w-xl font-sans'>{product.description || ''}</pre>
      </div>
    </div>
    );
  } catch (error) {
    console.error('Error rendering ProductDetail:', error);
    throw new Error('Error rendering ProductDetail');
  }
};



export default ProductDetail;
