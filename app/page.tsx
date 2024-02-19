
import Swipper from '@/components/Swipper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import sulamaurunleri from '@/public/sulamaurunleri.jpeg';
import korugeborular from '@/public/korugeborular.png';
import yanginmalzemeleri from '@/public/yanginmalzemeleri.jpeg';
import hidroforlar from '@/public/hidroforlar.jpeg';
import dalgicpompalar from '@/public/dalgicpompalar.png';
import havalandirmaurunleri from '@/public/havalandirmaurunleri.jpeg';


export default function Home() {
  return (
    <div className='max-w-7xl m-auto'>
      <div className='flex'>
      <div className='max-w-4xl'><Swipper /></div>
      <div>
        <Link href='/'>
          <Image src={sulamaurunleri} alt='' width={360} height={360}></Image>
        </Link>
        <Link href='/'>
          <Image src={korugeborular} alt='' width={360} height={360}></Image>
        </Link>
      </div>
      </div>
      <div className='flex'>
        <Link href='/yangin-malzemeleri'>
          <Image src={yanginmalzemeleri} alt='' height={135}></Image>
        </Link>
        <Link href='/hidroforlar'>
          <Image src={hidroforlar} alt='' height={135}></Image>
        </Link>
        <Link href='/dalgic-pompalar'>
          <Image src={dalgicpompalar} alt='' height={135}></Image>
        </Link>
        <Link href='/havalandirma-urunleri'>
          <Image src={havalandirmaurunleri} alt='' height={135}></Image>
        </Link>
      </div>



    </div>
  );
}
