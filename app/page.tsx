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

// ISR - Free Plan dostu ayarlar
export const revalidate = 21600 // 6 saat

export default function Home() {
  return (
    <>
      <StructuredData schema={generateLocalBusinessSchema()} />
      <main className="min-h-screen">
        {/* Hero Section with Carousel */}
        <section className="w-full">
          <div className="flex items-center justify-center">
            <CarouselPlugin />
          </div>
        </section>
        
        {/* Campaigns Section */}
        <section className="py-8 md:py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <CampaignsList />
          </div>
        </section>
        
        {/* Recommended Products Section */}
        <section className="py-8 md:py-12 px-4 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            {/* <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Önerilen Ürünler
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Sizin için özenle seçilmiş ürünler
              </p>
            </div> */}
            <RecomendedProducts />
          </div>
        </section>
      </main>
      
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Link
          href={createWhatsAppUrl()}
          title="WhatsApp İletişim"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:scale-110 transition-all duration-300 hover:drop-shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 rounded-full"
          aria-label="WhatsApp ile iletişime geç"
        >
          <Image 
            src={whatsapp} 
            alt="WhatsApp" 
            width={50} 
            height={50} 
            className="sm:w-[55px] sm:h-[55px] drop-shadow-lg rounded-full"
          />
        </Link>
      </div>
    </>
  );
}
