import { TProduct } from '@/app/types';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react'


const getProducts = async (): Promise<TProduct[] | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/`)
        if (res.ok) {
            const products = await res.json()
            return products
        }
    } catch (error) {
        console.log(error)
    }
    return null
};

const ProductDetail = async ({ params }: { params: { id: string } }) => {
    const products = await getProducts();
    const product = products?.find(product => product.id === params.id);

    const categoryHierarchy = product?.catName && product?.subcatName
        ? `${decodeURIComponent(product.catName)} > ${decodeURIComponent(product.subcatName)}`
        : decodeURIComponent(product?.catName || ""); // Sadece kategori varsa onu göster

    return (
        <div>
            <Head>
                <title>{`${product?.name || ""} - ${product?.metaTitle || ""} | FTS`}</title>
                <meta name="description" content={product?.metaDescription || ""} />
                <meta name="keywords" content={product?.metaKeywords || ""} />
            </Head>
            <div className='flex'>
                <div>

                    <img src={product?.imageUrl || ""} alt={product?.name || ""} width={400} height={400} />
                    <div className='text-wrap'>
                        <span className="font-bold">Malzeme Açıklaması: </span>{" "}
                        <pre>{product?.description || ""}</pre>
                    </div>
                </div>
                <div className='p-4'>
                    <h1 className='font-bold text-xl'>
                        <span className="">Malzeme Adı: </span>{" "}
                        <span className=''>{decodeURIComponent(product?.name || "")}</span>
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

        </div>
    );
}

export default ProductDetail