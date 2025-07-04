'use client'
import Navbar from '@/app/(root)/Navbar/page'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.png'
import React from 'react'
import SearchBar from './SearchBar'
import ContactPhone from './ContactPhone'
import MobileMenu from './MobileMenu'
import { SafeThemeToggle } from './SafeThemeToggle'
import { Product } from '@/types'
import { cn } from '@/utils/common'
import { BREAKPOINTS } from '@/constants'

const Header: React.FC = () => {
  const handleSearchResults = (products: Product[]) => {
    console.log(products)
  }
  return (
    <div className='border-b border-peach pt-5'>
      <div className='flex items-center justify-between border-b lg:flex-row flex-col gap-4 pb-4'>
        <Link href='/' className='flex flex-row items-center justify-center lg:justify-start'>
          <Image src={logo} className='flex' alt='fts' width={80} height={80} />
          <div className='flex flex-col ml-2'>
            <h1 className="text-xl lg:text-2xl font-bold ml-2">Endüstriyel</h1>
            <h2 className="text-base lg:text-lg font-bold">Yapı Malzemeleri</h2>
          </div>
        </Link>
        <div className='flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto'>
          <div className='w-full lg:w-auto'>
            <SearchBar onSearch={handleSearchResults} />
          </div>
          <div className='hidden lg:flex items-center gap-2'>
            <ContactPhone />
            <SafeThemeToggle />
          </div>
          <div className='lg:hidden flex items-center gap-2'>
            <SafeThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
      <div>
        <Navbar/>
      </div>
    </div>
  )
}

export default Header