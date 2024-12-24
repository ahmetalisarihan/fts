import Image from 'next/image';
import Link from 'next/link';
import whatsapp from '@/public/whatsappicon.png';
import { CarouselPlugin } from '@/components/Carousel';
import RecomendedProducts from '@/components/RecomendedProducts';
import CampaignsList from '@/components/CampaignsList';

export default function Home() {
  return (
    <>
      <div className="">
        <div className="flex items-center justify-center">
          <CarouselPlugin />
        </div>
        <CampaignsList />
      </div>
      <div>
        <RecomendedProducts />
      </div>
      <div className="fixed bottom-6 right-10 z-50 max-w-6xl">
        <Link
          href="https://api.whatsapp.com/send?phone=905395160183&text=Merhaba,%20bilgi%20almak%20istiyorum?"
          title="WhatsApp İletişim"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={whatsapp} alt="WhatsApp" width={55} height={55} />
        </Link>
      </div>
    </>
  );
}