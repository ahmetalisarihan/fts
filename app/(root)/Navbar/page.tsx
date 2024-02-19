import React from 'react'

import DropdownMenu from '@/components/DropdownMenu'
import Link from 'next/link'


const Navbar = () => {
  return (
    <div className='m-2 font-bold'>
        <div className='max-w-7xl m-auto flex-col sm:flex-row'>
            <div className='flex items-center justify-start gap-4'>
                <div className='bg-blue-400 p-1'><DropdownMenu /></div>
                
                <Link href='/' className='border-x-2 px-3'>
                    Markalar
                </Link>
                <Link href='/'>
                    Fiyat Listeleri
                </Link>
            </div>

        </div>
    </div>
  )
}

export default Navbar