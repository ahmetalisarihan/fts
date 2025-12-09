'use client'
import Navbar from '@/app/(root)/Navbar/page'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.png'
import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'

import MobileMenu from './MobileMenu'
import { SafeThemeToggle } from './SafeThemeToggle'
import { TProduct } from '@/app/types'
import CartButton from './cart/CartButton'
import UserMenu from './UserMenu'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchResults = (products: TProduct[]) => {
    console.log(products)
  }

  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-peach transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between lg:flex-row flex-col gap-6'>
          {/* Logo Section */}
          <Link href='/' className='flex flex-row items-center justify-center lg:justify-start group'>
            <Image 
              src={logo} 
              className='transition-transform duration-300 group-hover:scale-105' 
              alt='fts' 
              width={80} 
              height={80} 
            />
            <div className='flex flex-col ml-3'>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
                Endüstriyel
              </h1>
              <h2 className="text-base lg:text-lg font-semibold text-gray-600 dark:text-gray-300">
                Yapı Malzemeleri
              </h2>
            </div>
          </Link>

          {/* Search and Actions Section */}
          <div className='flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto lg:flex-1 lg:justify-end lg:max-w-2xl'>
            <div className='w-full lg:w-auto lg:flex-1 lg:max-w-md'>
              <SearchBar onSearch={handleSearchResults} />
            </div>
            
            {/* Desktop Actions */}
            <div className='hidden lg:flex items-center gap-3'>
              <CartButton />
              <div className='w-px h-6 bg-gray-300 dark:bg-gray-600' />
              <UserMenu />
              <div className='w-px h-6 bg-gray-300 dark:bg-gray-600' />
              <SafeThemeToggle />
            </div>
            
            {/* Mobile Actions */}
            <div className='lg:hidden flex items-center gap-3'>
              <CartButton />
              <UserMenu />
              <SafeThemeToggle />
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className='border-t border-gray-200 dark:border-gray-700'>
        <Navbar/>
      </div>
    </header>
  )
}

export default Header