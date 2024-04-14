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

interface CarouselItemProps {
  imageUrl: string;
  link: string;
}

export function CarouselPlugin() {
  const [carousels, setCarousels] = useState<CarouselItemProps[]>([]);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        console.log('Fetching data from /api/carousels');
        const response = await fetch('/api/carousels');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: CarouselItemProps[] = await response.json();
        console.log('Data received:', data);
        setCarousels(data);
      } catch (error) {
        console.error('Failed to fetch carousels:', error);
      }
    };

    fetchCarousels();
  }, []);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xl"
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.reset()}
    >
      <CarouselContent>
        {carousels.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <img src={item.imageUrl} alt={`Carousel Item ${index + 1}`} className="w-full h-full object-cover" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}