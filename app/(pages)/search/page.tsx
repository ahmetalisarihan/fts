'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { TProduct } from '@/app/types';

interface SearchPageProps {
  searchParams: { query: string };
}

const SearchPage: React.FC<SearchPageProps> = ({ searchParams }) => {
  const { query } = searchParams;
  const encodedQuery = encodeURIComponent(query);
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/search?query=${encodedQuery}`);
        const fetchedProducts: TProduct[] = await response.json();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Ürünler alınırken bir hata oluştu:', error);
      }
    };

    fetchResults();
  }, [encodedQuery]);

  return (
    <div>
      <h1 className='font-bold text-xl'>Arama Sonuçları: {query}</h1>
      <h2 className='font-bold pl-4 py-1 text-blue-500'>Bulunan Ürün Sayısı: {products?.length}</h2> 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
