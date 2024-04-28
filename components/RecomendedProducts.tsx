"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TProduct } from '@/app/types';
import ProductCard from './ProductCard';


const RecomendedProducts: React.FC = () => {
  const [recomendedProducts, setRecomendedProducts] = useState<TProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/recommended-products');
        const data = await response.json();
        setRecomendedProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          console.error('Beklenmedik hata:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error.message}</div>;

  return (
    <div>
      <h2 className='p-2 font-bold text-2xl text-center'>Önerilen Ürünler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recomendedProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.slug} product={product} /> 
        ))}
      </div>
    </div>
  );
};

export default RecomendedProducts;