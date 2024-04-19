import React from 'react'
import DropdownMenu from '@/components/DropdownMenu'
import Link from 'next/link'
import Nav from '@/components/Nav';


const Navbar = () => {
    
    return (
        <div className='m-2 font-bold'>
            <div className='max-w-7xl m-auto flex justify-between'>
                <div className='flex items-center justify-start gap-4'>
                    <div><DropdownMenu /></div>

                    <Link href='/markalar' className='border-x-2 px-3'>
                        Markalar
                    </Link>
                    <Link href='/fiyatlisteleri'>
                        Fiyat Listeleri
                    </Link>
                </div>
                <div className=''>
                <Nav />
                </div>

            </div>
        </div>
    )
}

export default Navbar