import { TPriceList } from '@/app/types'
import Link from 'next/link'
import React from 'react'


const getPriceList = async ():Promise<TPriceList[] | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/pricelists`)
        if(res.ok) {
            const priceLists = await res.json()
            return priceLists
        }
    }
    catch (error) {
        console.log(error)
    }
    return null
}


const PriceList = async () => {
    const priceLists = await getPriceList()
  return (
    <div>
        {priceLists?.map((priceList) => (
            <Link 
            key={priceList.id} 
            href={`/pricelists/${priceList.priceName}`}
            className='flex text-base cursor-pointer border-b py-2 hover:text-blue-500 hover:bg-blue-50'>
                {priceList.priceName}
            </Link>
        ))}
    </div>
  )
}

export default PriceList