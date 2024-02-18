import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.png'
import DropdownMenu from '@/components/DropdownMenu'


const Navbar = () => {
  return (
    <div className='bg-base-100'>
        <div className='max-w-7xl m-auto flex-col sm:flex-row gap-2'>
            <div>
                <Link href='/' className='flex flex-row items-center justify-content-between align-items-center'>
                    <Image src={logo} className='flex' alt='fts' width={100} height={100} />
                    <div className='flex flex-col'>                    
                        <h1 className="text-xl font-bold">Endüstriyel</h1>
                        <h2 className="text-lg font-bold">Yapı Malzemeleri</h2>
                    </div>
                </Link>
                
            </div>
            <div>
            <DropdownMenu />
            </div>
        </div>
    </div>
  )
}

export default Navbar