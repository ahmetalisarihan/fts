import React from 'react'
import DropdownMenu from '@/components/DropdownMenu'
import Link from 'next/link'
import Nav from '@/components/Nav';
import { Button } from '@/components/ui/button';


const Navbar = () => {

    return (
        <div className='m-2 font-bold'>
            <div className='max-w-7xl m-auto flex justify-between'>
                <div className='flex items-center justify-start'>

                    <div><DropdownMenu /></div>
                    <div className='hidden md:flex'>
                        <Nav />
                    </div>
                    <div className='flex justify-end items-center text-sm'>
                        {/* <div>
                            <Link href='/Markalar' >
                                Markalar
                            </Link>
                        </div> */}
                        <div >
                            <Button className='' variant="secondary">
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