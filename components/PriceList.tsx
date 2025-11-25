import { TPriceList } from '@/app/types'
import Link from 'next/link'
import React from 'react'
import prisma from '@/libs/prismadb'

const getPriceList = async ():Promise<TPriceList[] | null> => {
    try {
        // Server-side component'te doğrudan Prisma kullan
        const priceLists = await prisma.priceList.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        
        // Prisma'dan gelen veriyi TPriceList formatına dönüştür
        const formattedPriceLists: TPriceList[] = priceLists.map(priceList => ({
            id: priceList.id,
            priceName: priceList.priceName,
            price: priceList.price || undefined,
            pdfUrl: priceList.pdfUrl || '',
            createdAt: priceList.createdAt,
            updatedAt: priceList.updatedAt
        }))
        
        return formattedPriceLists
    }
    catch (error) {
        console.error('Error fetching pricelists from database:', error)
        return null
    }
}


const PriceList = async () => {
    const priceLists = await getPriceList()
    
    if (!priceLists || priceLists.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>Henüz fiyat listesi bulunmamaktadır.</p>
            </div>
        )
    }
    
    return (
        <div className="space-y-2">
            {priceLists.map((priceList) => (
                <Link 
                    key={priceList.id} 
                    href={`/pricelists/${encodeURIComponent(priceList.priceName)}`}
                    className='flex text-base cursor-pointer border-b py-3 px-2 hover:text-blue-500 hover:bg-blue-50 transition-colors rounded-md'>
                    <div className="flex-1">
                        <h3 className="font-medium">{priceList.priceName}</h3>
                        {priceList.createdAt && (
                            <p className="text-sm text-gray-500 mt-1">
                                Oluşturulma: {new Date(priceList.createdAt).toLocaleDateString('tr-TR')}
                            </p>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default PriceList