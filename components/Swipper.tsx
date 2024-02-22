import React from 'react';
import { Carousel, Button, Flex } from 'antd';
import Image from 'next/image';
import stockphoto1 from '@/public/stockphoto1.jpeg';
import celikborular from '@/public/celikborular.jpg';
import pvcborular from '@/public/pvcborular.webp';
import susayac from '@/public/susayac.jpg';

const contentStyle: React.CSSProperties = {
  height: '630px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'left',
  background: '#cdd5dd',
};

const Swipper: React.FC = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>
        <div className='absolute m-5 p-4 bg-slate-700 rounded-lg leading-loose opacity-70 text-white font-bold'>
          <h4 className=' text-3xl  hover:text-sky-300'>TESİSAT MALZEMELERİ</h4>
          <h5 className='my-2'>Her çesit tesisat malzemeleri</h5>
          <Flex gap="small" wrap="wrap">
            <Button type='primary' href='/TesisatMalzemeleri' style={{ backgroundColor: '' }}>Ürünleri İncele</Button>
          </Flex>
        </div>

        <Image src={stockphoto1} alt='tesisatmalzemeleri'></Image>

      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <div className='absolute m-5 p-4 bg-slate-700 rounded-lg leading-loose opacity-70 text-white font-bold'>
          <h4 className=' text-3xl  hover:text-sky-300'>BORU ÇEŞİTLERİ</h4>
          <h5 className='my-2'>Her çesit tesisat malzemeleri</h5>
          <Flex gap="small" wrap="wrap">
            <Button type='primary' href='/BoruCesitleri' style={{ backgroundColor: 'blue-10' }}>Ürünleri İncele</Button>
          </Flex>
        </div>
        <Image src={stockphoto1} alt='tesisatmalzemeleri'></Image>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <div className='absolute m-5 p-4 bg-slate-700 rounded-lg leading-loose opacity-70 text-white font-bold'>
          <h4 className=' text-3xl  hover:text-sky-300'>HİDROFORLAR</h4>
          <h5 className='my-2'>Her çesit tesisat malzemeleri</h5>
          <Flex gap="small" wrap="wrap">
            <Button type='primary' style={{ backgroundColor: 'blue-10' }}>Ürünleri İncele</Button>
          </Flex>
        </div>
        <Image src={stockphoto1} alt='tesisatmalzemeleri'></Image>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <div className='absolute m-5 p-4 bg-slate-700 rounded-lg leading-loose opacity-70 text-white font-bold'>
          <h4 className=' text-3xl  hover:text-sky-300'>POMPALAR</h4>
          <h5 className='my-2'>Her çesit tesisat malzemeleri</h5>
          <Flex gap="small" wrap="wrap">
            <Button type='primary' style={{ backgroundColor: 'blue-10' }}>Ürünleri İncele</Button>
          </Flex>
        </div>
        <Image src={stockphoto1} alt='tesisatmalzemeleri'></Image>
      </h3>
    </div>
  </Carousel>
);

export default Swipper;