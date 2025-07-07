'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';
import CarouselSkeleton from './Skeleton/CarouselSkeleton';
import { OptimizedAPI } from '@/utils/api-optimization';
import { TCarousel } from '@/app/types';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function CarouselPlugin() {
  const [carousels, setCarousels] = useState<TCarousel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await OptimizedAPI.getCarousels();
        const carouselData = Array.isArray(response) ? response : [];
        setCarousels(carouselData);
      } catch (error) {
        console.error('Failed to fetch carousels:', error);
        setCarousels([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarousels();
  }, []);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (isLoading) {
    return <CarouselSkeleton />;
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.reset()}
      setApi={setApi}
    >
      <CarouselContent>
        {carousels.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  {item.imageUrl ? (
                    // Check if carouselLink exists and is not null/empty
                    item.carouselLink && typeof item.carouselLink === 'string' && item.carouselLink.trim() !== '' ? (
                      // External link (starts with http)
                      item.carouselLink.startsWith('http') ? (
                        <a 
                          href={item.carouselLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block w-full group"
                        >
                          <Image
                            src={item.imageUrl}
                            alt={`Carousel Item ${index + 1}`}
                            width={560}
                            height={560}
                            className="w-full h-96 object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
                          />
                        </a>
                      ) : (
                        // Internal link
                        <Link 
                          href={item.carouselLink.startsWith('/') ? item.carouselLink : `/${item.carouselLink}`}
                          className="block w-full group"
                        >
                          <Image
                            src={item.imageUrl}
                            alt={`Carousel Item ${index + 1}`}
                            width={560}
                            height={560}
                            className="w-full h-96 object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
                          />
                        </Link>
                      )
                    ) : (
                      // No link - just display image
                      <div className="w-full group">
                        <Image
                          src={item.imageUrl}
                          alt={`Carousel Item ${index + 1}`}
                          width={560}
                          height={560}
                          className="w-full h-96 object-cover"
                        />
                      </div>
                    )
                  ) : (
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Resim bulunamadı</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}