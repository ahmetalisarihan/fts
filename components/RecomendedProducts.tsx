"use client"
import { useEffect, useState } from 'react';
import { TProduct } from '@/app/types';
import ProductCard from './ProductCard';
import RecommendedProductsSkeleton from './Skeleton/RecommendedProductsSkeleton';
import { OptimizedAPI } from '@/utils/api-optimization';

const RecomendedProducts: React.FC = () => {
  const [recomendedProducts, setRecomendedProducts] = useState<TProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await OptimizedAPI.getRecommendedProducts();
        setRecomendedProducts(data);
        // Trigger animation after data is loaded
        setTimeout(() => setIsVisible(true), 100);
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

  if (isLoading) return <RecommendedProductsSkeleton count={recomendedProducts.length || 4} />;
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="text-red-600 dark:text-red-400 mb-2">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-1">Ürünler Yüklenemedi</h3>
          <p className="text-red-600 dark:text-red-400 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (recomendedProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-gray-400 dark:text-gray-500 mb-2">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Henüz Önerilen Ürün Yok</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Yakında size özel ürün önerilerimiz burada olacak.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
      {/* Header */}
      <div className={`text-center mb-12 transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <div className="inline-flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Önerilen Ürünler
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Size özel seçtiğimiz kaliteli ürünleri keşfedin
        </p>
        <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {recomendedProducts.slice(0, 8).map((product, index) => (
          <div
            key={product.slug}
            className={`transform transition-all duration-700 ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* View More Button */}
      {recomendedProducts.length > 8 && (
        <div className={`text-center mt-12 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <button className="group inline-flex items-center space-x-2 px-8 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl">
            <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Daha Fazla Göster
            </span>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default RecomendedProducts;