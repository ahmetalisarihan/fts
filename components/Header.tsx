import Navbar from '@/app/(root)/Navbar/page'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo1.png'
import React from 'react'
import SearchBar from './SearchBar'
import ContactPhone from './ContactPhone'

const Header = () => {
  return (
    <div className='max-w-7xl border-b border-peach m-auto pt-5'>
      <div className='flex items-center justify-between border-b'>
        <Link href='/' className='flex flex-row items-center justify-content-between align-items-center'>
        <Image src={logo} className='flex' alt='fts' width={100} height={100} />
        <div className='flex flex-col ml-2'>
          <h1 className="text-2xl font-bold ml-2">Endüstriyel</h1>
          <h2 className="text-lg font-bold">Yapı Malzemeleri</h2>
        </div>
        </Link>
        <SearchBar />
        <ContactPhone />
      </div>
      <Navbar />


    </div>
  )
}

export default Header