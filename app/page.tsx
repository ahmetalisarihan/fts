
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
import { Button, Flex } from 'antd';
import BestSellProducts from '@/components/BestSellProducts';



export default function Home() {
  return (
    <div className=''>
      <div className='grid md:grid-cols-1 lg:grid-cols-2'>
        <div className='max-w-xl'><Swipper /></div>
        <div className=''>
          <div>
            <div className='absolute m-2  p-3 bg-slate-700 rounded-lg leading-loose opacity-70 text-white font-bold'>
            <h5 className=' text-xl  hover:text-sky-300'>BAHÇE SULAMA</h5>
            <h6 className=''>Bahçe sulama ürünleri</h6>
            <Flex gap="small" wrap="wrap">
              <Button type='primary' style={{ backgroundColor: 'blue-10' }}>Ürünleri İncele</Button>
            </Flex>
          </div>

          </div>
          <div>

          </div>
          <Link href='/'>
            <Image src={sulamaurunleri} alt='' width={360} height={360}></Image>
            <div className='absolute m-2  p-3 bg-slate-700 rounded-lg leading-loose opacity-70 text-white font-bold'>
              <h5 className=' text-xl  hover:text-sky-300'>KORUGE BORULAR</h5>
              <h6 className=''>Koruge borular ve parçaları</h6>
              <Flex gap="small" wrap="wrap">
                <Button type='primary' style={{ backgroundColor: 'blue-10' }}>Ürünleri İncele</Button>
              </Flex>
            </div>
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
      <div>
        <BestSellProducts />
      </div>



    </div>
  );
}
