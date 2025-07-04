import React from 'react'
import DropdownMenu from '@/components/DropdownMenu'
import Link from 'next/link'
import Nav from '@/components/Nav';
import { Button } from '@/components/ui/button';


const Navbar = () => {

    return (
        <div className='m-2 font-bold'>
            <div className='max-w-7xl m-auto flex flex-col sm:flex-row justify-between items-center gap-2'>
                <div className='flex items-center justify-between w-full sm:w-auto'>
                    <div><DropdownMenu /></div>
                    <div className='hidden md:flex ml-4'>
                        <Nav />
                    </div>
                    <div className='flex justify-end items-center text-sm'>
                        <div>
                            <Button className='text-xs sm:text-sm px-2 sm:px-4' variant="secondary">
                                <Link href='/fiyat-listeleri'>
                                    Fiyat Listeleri
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar