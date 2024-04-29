import { TProduct } from '@/app/types';
import type { Metadata, ResolvingMetadata } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import React from 'react'


type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  // Ürün verilerini getiren fonksiyon
  const getProducts = async (): Promise<TProduct[] | null> => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/`);
      if (res.ok) {
        const products = await res.json();
        return products;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };
  
  // Dinamik meta verileri oluşturan fonksiyon
  export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const products = await getProducts();
    const product = products?.find((p) => p.slug === params.slug);
  
    // Ebeveyn meta verilerine erişip genişletin
    const previousImages = (await parent).openGraph?.images || [];
  
    // Ürün bilgilerine göre meta verileri döndürün
    return {
      title: `${product?.name || ''} - ${product?.metaTitle || 'FTS'}`,
      description: product?.metaDescription || '',
      keywords: product?.metaKeywords || '',
      openGraph: {
        images: [product?.imageUrl || '@/public/logo.png', ...previousImages],
      },
    };
  }

const ProductDetail = async ({ params }: { params: { slug: string } }) => {
    const products = await getProducts();
    const product = products?.find(product => product.slug === params.slug);


    return (
        <div>
            <Head>
                <title>{`${product?.name ? product.name + " - " : ""}${product?.metaTitle ? product.metaTitle + " | " : ""}FTS`}</title>
                <meta name="description" content={product?.metaDescription || ""} />
                <meta name="keywords" content={product?.metaKeywords || ""} />
            </Head>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
                <div>

                    <img src={product?.imageUrl || ""} alt={product?.name || ""} width={400} height={400} />
                </div>
                <div className='p-4'>
                    <h1 className='font-bold text-xl py-2'>
                        <span className="">Malzeme Adı: </span>{" "}
                        <span className="text-blue-500">{decodeURIComponent(product?.name || "")}</span>
                    </h1>


                    <div>
                        <span className="font-bold">Kategori: </span>{" "}
                        {product?.catName && product?.subcatName ? (
                            // Kategori ve alt kategori varsa
                            <span>
                                <Link href={`/categories/${product.catName}`} className="text-blue-500">
                                    {decodeURIComponent(product.catName)}
                                </Link>{" "}
                                /{" "}
                                <Link
                                    href={`/categories/${product.catName}/subcategories/${product.subcatName}`}
                                    className="text-blue-500"
                                >
                                    {decodeURIComponent(product.subcatName)}
                                </Link>
                            </span>
                        ) : (
                            // Sadece kategori varsa
                            <Link href={`/categories/${product?.catName || ""}`} className="text-blue-500">
                                {decodeURIComponent(product?.catName || "")}
                            </Link>
                        )}
                    </div>
                    <div>
                        <span className="font-bold">Marka: </span>{" "}
                        <Link href={`/brands/${product?.brandName || ""}`}
                            className='text-blue-500'>

                            {decodeURIComponent(product?.brandName || "")}
                        </Link>
                    </div>
                    <div>
                        <span className="font-bold">Fiyat Listesi: </span>{" "}
                        <Link
                            href={`/pricelists/${product?.priceName || ""}`}
                            target='_blank'
                            className='text-blue-500'>
                            {decodeURIComponent(product?.priceName || "")}

                        </Link>


                    </div>
                </div>
            </div>
            <div>
            <div className='text-wrap pl-4'>
                        <span className="font-bold">Malzeme Açıklaması: </span>{" "}
                        <pre>{product?.description || ""}</pre>
                    </div>
            </div>

        </div>
    );
}

export default ProductDetail