import { TProduct } from '@/app/types';
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

    return (
        <div>
            <div className='flex'>
                <div>

                    <img src={product?.imageUrl || ""} alt={product?.name || ""} width={400} height={400} />
                </div>
                <div className='p-4'>
                    <h1>
                        <span className="font-bold">Malzeme Adı: </span>{" "}
                        {decodeURIComponent(product?.name || "")}
                    </h1>

                    <div>
                        <span className="font-bold">Malzeme Açıklaması: </span>{" "}
                        <p>{product?.description || ""}</p>
                    </div>


                    <div>
                        <span className="font-bold">Kategori: </span>{" "}
                        <Link 
                        href={`/categories/${product?.catName || ""}`}
                        className='text-blue-500'>
                            {decodeURIComponent(product?.catName || "")}
                        </Link>
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
                        href={`/fiyat-listesi/${product?.priceName || ""}`}
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