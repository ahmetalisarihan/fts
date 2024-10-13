// components/RecommendedProductsSkeleton.tsx
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface RecommendedProductsSkeletonProps {
  count: number; // Kaç tane skeleton gösterileceğini parametre olarak alıyoruz
}

const RecommendedProductsSkeleton: React.FC<RecommendedProductsSkeletonProps> = ({ count }) => {
  return (
    <div>
      <h2 className="p-2 font-bold text-2xl text-center">Önerilen Ürünler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <Skeleton className="w-full h-48 mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProductsSkeleton;