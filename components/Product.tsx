// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// interface IProduct {
//     id: string;
//     name: string;
//     description?: string;
//     category?: string;
//     brand?: string;
//     image?: string;

// }

// export default async function Product(
//     { id, name, description, category, brand, image }: IProduct
// ) {
//     return (
//         <div>
//             <div className='space-x-2 space-y-4'>
//                 <Link href="/" className='aspect-square p-2 border border-indigo-300 rounded-xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col relative'>
//                     {image && <Image
//                         src={image}
//                         className='shadow bg-cover rounded-lg overflow-hidden border'
//                         alt=""
//                         fill
//                     />
//                     }

//                 </Link>
//                 <div className=' '>
//                     <h4 className="font-bold text-l">{name}</h4>
//                 </div>



//             </div>

//         </div>

//     )
// }
