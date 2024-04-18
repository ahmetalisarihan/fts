
import Image from 'next/image';
import Link from 'next/link';
import yanginmalzemeleri from '@/public/yanginmalzemeleri.jpeg';
import hidroforlar from '@/public/hidroforlar.jpeg';
import dalgicpompalar from '@/public/dalgicpompalar.png';
import havalandirmaurunleri from '@/public/havalandirmaurunleri.jpeg';
import whatsapp from '@/public/whatsappicon.png';
import RecomendedProducts from '@/components/RecomendedProducts';
import { CarouselPlugin } from '@/components/Carousel';




export default function Home() {
  return (
    <>
      <div className=''>
        <div className='flex items-center justify-center'>
          <CarouselPlugin />
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 sm:justify-center md:justify-center items-center justify-between my-3 gap-3 '>
          <div className='relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105'>
            <div className='flex items-center justify-center border rounded-md'>
              <Link href='/yangin-malzemeleri'>
                <Image className='object-contain h-40 w-96' src={yanginmalzemeleri} alt=''></Image>
              </Link>
            </div>
          </div>
          <div className='relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105'>
            <div className='flex items-center justify-center border rounded-md'>
              <Link href='/hidroforlar'>
                <Image className='object-contain h-40 w-96' src={hidroforlar} alt='' height={135}></Image>
              </Link>
            </div>
          </div>
        

        <div className='relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105'>
          <div className='flex items-center justify-center border rounded-md'>
            <Link href='/dalgic-pompalar'>
              <Image className='object-contain h-40 w-96' src={dalgicpompalar} alt=''></Image>
            </Link>
          </div>
        </div>
        </div>

      </div>
      <div>
        <RecomendedProducts />
      </div>
      <div className='fixed bottom-6 right-10 z-50 max-w-6xl'>
        <Link href="https://api.whatsapp.com/send?phone=905346181874&text=Merhaba,%20bilgi%20almak%20istiyorum?" title='WhatsApp İletişim' target="_blank" rel="noopener noreferrer">
          <Image src={whatsapp} alt="WhatsApp" width={55} height={55} />
        </Link>
      </div>
    </>
  );
}
