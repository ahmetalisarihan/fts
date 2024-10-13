'use client';
import React, { useState, useEffect, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';
import CarouselSkeleton from './Skeleton/CarouselSkeleton';


interface CarouselItemProps {
  imageUrl: string;
  link: string;
}

export function CarouselPlugin() {
  const [carousels, setCarousels] = useState<CarouselItemProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await fetch('/api/carousels');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: CarouselItemProps[] = await response.json();
        setCarousels(data);
      } catch (error) {
        console.error('Failed to fetch carousels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarousels();
  }, []);

  if (isLoading) {
    return <CarouselSkeleton />;
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.reset()}
    >
      <CarouselContent>
        {carousels.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <Link href={item.link} rel="noopener noreferrer">
                    <Image
                      src={item.imageUrl}
                      alt={`Carousel Item ${index + 1}`}
                      width={560}
                      height={560}
                      className="w-full h-96 object-cover"
                    />
                  </Link>
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