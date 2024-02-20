import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';
import tesisatmalzemeleri from '@/public/tesisatmalzemeleri.png';
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
      <h4 className='absolute p-7 text-slate-200 text-3xl font-bold hover:text-sky-400'>Tesisat Malzemeleri</h4>
      <h5 className='absolute pl-7  text-slate-200'>Her cesit tesisat malzemeleri</h5>
        <Image src={tesisatmalzemeleri} alt='tesisatmalzemeleri'></Image>
        
        </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <Image src={celikborular} alt='celikborular'></Image>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <Image src={pvcborular} alt='pvcborular'></Image>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}><Image src={susayac} alt='susayac'></Image></h3>
    </div>
  </Carousel>
);

export default Swipper;