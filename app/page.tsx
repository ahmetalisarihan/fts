import Image from 'next/image';
import Link from 'next/link';
import whatsapp from '@/public/whatsappicon.png';
import { CarouselPlugin } from '@/components/Carousel';
import RecomendedProducts from '@/components/RecomendedProducts';
import CampaignsList from '@/components/CampaignsList';
import StructuredData from '@/components/StructuredData';
import { generateLocalBusinessSchema } from '@/utils/structured-data';
import { createWhatsAppUrl } from '@/utils/common';
import { CONTACT_INFO } from '@/constants';

export default function Home() {
  return (
    <>
      <StructuredData schema={generateLocalBusinessSchema()} />
      <main>
        <section className="">
          <div className="flex items-center justify-center">
            <CarouselPlugin />
          </div>
          <CampaignsList />
        </section>
        <section>
          <RecomendedProducts />
        </section>
      </main>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Link
          href={createWhatsAppUrl()}
          title="WhatsApp İletişim"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:scale-110 transition-transform duration-200"
        >
          <Image 
            src={whatsapp} 
            alt="WhatsApp" 
            width={50} 
            height={50} 
            className="sm:w-[55px] sm:h-[55px] drop-shadow-lg"
          />
        </Link>
      </div>
    </>
  );
}