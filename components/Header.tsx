'use client'
import Navbar from '@/app/(root)/Navbar/page'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.png'
import React from 'react'
import SearchBar from './SearchBar'
import ContactPhone from './ContactPhone'
import { TProduct } from '@/app/types'

const Header = () => {
  const handleSearchResults = (products: TProduct[]) => {
    console.log(products)
  }
  return (
    <div className='border-b border-peach pt-5'>
      <div className='flex items-center justify-between border-b'>
        <Link href='/' className='flex flex-row items-center justify-content-between align-items-center'>
        <Image src={logo} className='flex' alt='fts' width={100} height={100} />
        <div className='flex flex-col ml-2'>
          <h1 className="text-2xl font-bold ml-2">Endüstriyel</h1>
          <h2 className="text-lg font-bold">Yapı Malzemeleri</h2>
        </div>
        </Link>
        <SearchBar onSearch={handleSearchResults} />
        <ContactPhone />
      </div>
      <Navbar/>


    </div>
  )
}

export default Header