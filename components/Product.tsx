import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IProduct {
    id: string;
    name: string;
    description?: string;
    category?: string;
    brand?: string;
    image?: string;
}

export default async function Product(
    { id, name, description, category, brand, image }: IProduct
) {
    return (
        <div>
            {/* <div className='size-32 flex '>
            {image && 
            <Image 
            src={image} 
            alt={name} 
            fill 
            className='object-cover rounded-md object-center'/>}
        </div> */}
            {/* <h3 className='font-bold'>{name}</h3> */}
            {/* {category && 
        <Link 
            className='text-blue-500'
            href={`/categories/${category}`}>
            {category}
        </Link>}
        {brand && <Link 
            className='text-blue-500'
            href={`/brands/${brand}`}>
            {brand}
        </Link>}
        <p>{description}</p> */}
            <div className='space-x-2 space-y-4'>
            <h4 className="font-bold text-l">{name}</h4>
                <Link href="/" className='aspect-square p-2 border border-indigo-300 rounded-xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col relative'>
                    <Image src={image} className='shadow bg-cover rounded-lg overflow-hidden border' alt="" fill />
                    <div className=' '>
                        <h4 className="font-bold text-l">{name}</h4>
                        {/* <p className="mt-1 text-sm text-gray-600">{description}
                        </p> */}
                        {/* <div className="">
                            <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900">İncele</button>
                        </div> */}
                    </div>
                </Link>



            </div>

        </div>

    )
}
