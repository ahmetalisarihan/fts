import React from 'react'

import DropdownMenu from '@/components/DropdownMenu'
import Link from 'next/link'
import TeklifOlustur from '../teklif-olustur/page' 


const Navbar = () => {
    return (
        <div className='m-2 font-bold'>
            <div className='max-w-7xl m-auto flex justify-between'>
                <div className='flex items-center justify-start gap-4'>
                    <div className='bg-blue-400 p-1'><DropdownMenu /></div>

                    <Link href='/markalar' className='border-x-2 px-3'>
                        Markalar
                    </Link>
                    <Link href='/fiyatlisteleri'>
                        Fiyat Listeleri
                    </Link>
                </div>
                <div className=''>
                </div>

            </div>
        </div>
    )
}

export default Navbar