import React from 'react'
import DropdownMenu from '@/components/DropdownMenu'
import Link from 'next/link'
import Nav from '@/components/Nav';


const Navbar = () => {
    
    return (
        <div className='m-2 font-bold'>
            <div className='max-w-7xl m-auto flex justify-between'>
                <div className='flex items-center justify-start'>
                    <div><DropdownMenu /></div>

                    <Link href='/Markalar' >
                        Markalar
                    </Link>
                    <Link href='/fiyat-listeleri'>
                        Fiyat Listeleri
                    </Link>
                </div>
                <div className='hidden md:flex'>
                <Nav />
                </div>

            </div>
        </div>
    )
}

export default Navbar