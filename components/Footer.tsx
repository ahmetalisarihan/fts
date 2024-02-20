import Link from 'next/link'
import React from 'react'
import { FacebookFilled, InstagramFilled, XOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className='max-w-7xl m-auto'>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-20 pt-20 pb-5'>
        <div className='flex flex-col '>
          <h2 className='text-2xl text-blue-500 mb-4 font-semibold'>FETES ENDUSTRIYEL YAPI MALZEMELERI</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quas officiis dolores animi in, cum maiores iusto!
            Quam dolorum nemo, enim reprehenderit rerum dignissimos ab
            dolores nobis ea. Quas, quae earum?</p>
        </div>
        <div className='flex flex-col mt-6'>
            <ul>
              <li className='text-[22px] list-none font-semibold text-blue-500 py-2'>Bilgiler</li>
              <li className='my-4 list-none '>Hakkımızda</li>
              <li className='my-4 list-none '>Gizlilik Politikası ve KVKK</li>
              <li className='my-4 list-none '>Gün İçinde Teslimat</li>
              <li className='my-4 list-none '>Garanti Şartları</li>
            </ul>
        </div>
        <div className='flex flex-col mt-6'>
            <ul>
              <li className='text-[22px] list-none font-semibold text-blue-500 py-2'>Iletisim</li>
              <li className='my-4 list-none '>Email: info@fetesendustriyel.com.tr</li>
              <li className='my-4 list-none '>Telefon: +90 534 618 18 74</li>
              <li className='my-4 list-none '>Adres: Karaculha Mahallesi 338. Sokak No: 2/1 Fethiye/MUGLA</li>
              <div className='flex space-x-4'>
                <Link href={'/'} className='hover:text-sky-400 transform  hover:scale-150 transition-all duration-150 ease-in-out'><FacebookFilled style={{ fontSize: '25px' }}/> </Link>
                <Link href={'/'} className='hover:text-sky-400 transform  hover:scale-150 transition-all duration-150 ease-in-out'><InstagramFilled style={{ fontSize: '25px' }}/> </Link>
                <Link href={'/'} className='hover:text-sky-400 transform  hover:scale-150 transition-all duration-150 ease-in-out'><XOutlined style={{ fontSize: '25px' }}/> </Link>
              </div>
              
            </ul>
        </div>
      </div>
      {/* Copyright text */}
      <p className="mb-5 text-center text-grey-600 text-sm">
            Copyright © {new Date().getFullYear()} AAS. Tüm Hakları Saklıdır..</p>
    </footer>
  )
}

export default Footer