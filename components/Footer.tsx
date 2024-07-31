import Link from 'next/link'
import React from 'react'
import { FacebookFilled, InstagramFilled, XOutlined } from '@ant-design/icons';
import GoogleMap from './GoogleMap';

const Footer = () => {
  return (
    <footer className='max-w-7xl m-auto'>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10 pt-20 pb-5'>
        <div className='flex flex-col '>
          <h2 className='text-2xl text-blue-500 mb-4 font-semibold'>FETES<span className='text-xl flex flex-col'> ENDÜSTRİYEL YAPI MALZEMELERİ</span> </h2>
          <p>Endüstriyel yapı malzemeleri tedarikinde deneyimimizle, projelerinizi zamanında ve bütçenize uygun şekilde tamamlamanıza yardımcı oluyoruz.</p>
        </div>
        <div className='flex flex-col mt-6'>
            <ul className='flex flex-col'>
              <li className='text-[22px] list-none font-semibold text-blue-500 py-2'>Bilgiler</li>
              <Link href={'/'} className='my-2 hover:text-sky-400 '>Anasayfa</Link>
              <Link href={'/hakkimizda'} className='my-2 hover:text-sky-400 '>Hakkımızda</Link>
              <Link href={'/gizlilik-politikasi'} className='my-2 hover:text-sky-400 '>Gizlilik Politikası ve KVKK</Link>
              {/* <Link href={'/teslimat'} className='my-2 hover:text-sky-400 '>Gün İçinde Teslimat</Link> */}
              <Link href={'/garanti-sartlari'} className='my-2 hover:text-sky-400 '>Garanti Şartları</Link>
            </ul>
        </div>
        <div className='flex flex-col mt-6'>
            <ul className='flex flex-col'>
              
              <li className='text-[22px] list-none font-semibold text-blue-500 py-2'>İletişim</li>
              <Link href='mailto:info@fetesendustriyelyapi.com.tr' className='my-2 hover:text-sky-400'>Email: info@fetesendustriyelyapi.com.tr</Link>
              <a href="tel:+90 539 516 01 83<" className='my-2 hover:text-sky-400'>Telefon: +90 539 516 01 83</a>
              <Link href='https://www.google.com/maps/place/Fetes+End%C3%BCstriyel+Yap%C4%B1+Malzemeleri/@36.6462017,29.1782603,17z/data=!3m1!4b1!4m6!3m5!1s0x14c045b36ce002f5:0x62510c5f96e3b3ca!8m2!3d36.6462017!4d29.1808406!16s%2Fg%2F11ldhj5tjj?entry=ttu' className='my-2 hover:text-sky-400' target='_blank'>Adres: Karaçulha Mahallesi 338. Sokak No: 2/1 Fethiye/MUĞLA</Link>
              <div className='flex space-x-4'>
                <Link href={'/'} className='hover:text-sky-400 transform  hover:scale-150 transition-all duration-150 ease-in-out'><FacebookFilled style={{ fontSize: '25px' }}/> </Link>
                <Link href={'/'} className='hover:text-sky-400 transform  hover:scale-150 transition-all duration-150 ease-in-out'><InstagramFilled style={{ fontSize: '25px' }}/> </Link>
                <Link href={'/'} className='hover:text-sky-400 transform  hover:scale-150 transition-all duration-150 ease-in-out'><XOutlined style={{ fontSize: '25px' }}/> </Link>
              </div>
              
            </ul>
        </div>
        <GoogleMap />
      </div>
      {/* Copyright text */}
      <p className="mb-5 text-center text-grey-600 text-sm">
            Copyright © {new Date().getFullYear()} <Link href={'https://ahmetalisarihan.com'} className='hover:text-sky-700' target='_blank'>AAS</Link>. Tüm Hakları Saklıdır..</p>
    </footer>
  )
}

export default Footer