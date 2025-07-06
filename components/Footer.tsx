import Link from 'next/link';
import React from 'react';
import { FacebookFilled, InstagramFilled, XOutlined } from '@ant-design/icons';
import SimpleMap from './SimpleMap';

const Footer = () => {
  return (
    <footer className='bg-background border-t border-border theme-transition'>
      <div className='max-w-7xl mx-auto py-16 px-6'>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10'>
        <div className='flex flex-col'>
          <h2 className='text-2xl text-primary mb-4 font-semibold'>FETES
            <span className='text-xl block'>ENDÜSTRİYEL YAPI MALZEMELERİ</span>
          </h2>
          <p className='text-muted-foreground'>Endüstriyel yapı malzemeleri tedarikinde deneyimimizle, projelerinizi zamanında ve bütçenize uygun şekilde tamamlamanıza yardımcı oluyoruz.</p>
        </div>
        <div className='flex flex-col mt-6'>
          <ul className='flex flex-col'>
            <li className='text-lg list-none font-semibold text-primary py-2'>Bilgiler</li>
            <Link href='/' className='my-2 hover:text-secondary'>Anasayfa</Link>
            <Link href='/hakkimizda' className='my-2 hover:text-secondary'>Hakkımızda</Link>
            <Link href='/gizlilik-politikasi' className='my-2 hover:text-secondary'>Gizlilik Politikası ve KVKK</Link>
            <Link href='/garanti-sartlari' className='my-2 hover:text-secondary'>Garanti Şartları</Link>
          </ul>
        </div>
        <div className='flex flex-col mt-6'>
          <ul className='flex flex-col'>
            <li className='text-lg list-none font-semibold text-primary py-2'>İletişim</li>
            <Link href='mailto:info@fetesendustriyelyapi.com.tr' className='my-2 hover:text-secondary'>Email: info@fetesendustriyelyapi.com.tr</Link>
            <a href='tel:+905395160183' className='my-2 hover:text-secondary'>Telefon: +90 539 516 01 83</a>
            <Link href='https://www.google.com/maps/place/Fetes+End%C3%BCstriyel+Yap%C4%B1+Malzemeleri/@36.6461896,29.1806881,21z/data=!4m6!3m5!1s0x14c045b36ce002f5:0x62510c5f96e3b3ca!8m2!3d36.6462017!4d29.1808406!16s%2Fg%2F11ldhj5tjj?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D' className='my-2 hover:text-secondary' target='_blank'>
              Adres: Karaçulha Mahallesi Dr. Devlet Bahçeli Bulvarı No:36/A Fethiye/MUĞLA
            </Link>
            <div className='flex space-x-4 mt-4'>
              <Link href='#' className='hover:text-primary transition-transform transform hover:scale-125 duration-200'>
                <FacebookFilled style={{ fontSize: '25px' }} />
              </Link>
              <Link href='#' className='hover:text-primary transition-transform transform hover:scale-125 duration-200'>
                <InstagramFilled style={{ fontSize: '25px' }} />
              </Link>
              <Link href='#' className='hover:text-primary transition-transform transform hover:scale-125 duration-200'>
                <XOutlined style={{ fontSize: '25px' }} />
              </Link>
            </div>
          </ul>
        </div>
        <div className='rounded overflow-hidden shadow-lg theme-transition'>
          <SimpleMap height="h-48 min-h-[200px]" />
        </div>
        </div>
        <hr className='my-8 border-border' />
        <p className='text-center text-muted-foreground text-sm'>
          Copyright © {new Date().getFullYear()} 
          <Link href='https://ahmetalisarihan.com' className='hover:text-primary' target='_blank'>AAS</Link>. Tüm Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
