'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SearchResults from '@/components/SearchResults';
import { TProduct } from '@/app/types';

interface SearchBarProps {
  onSearch: (products: TProduct[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TProduct[]>([]);
  const [showResults, setShowResults] = useState(false); // Sonuçları göstermek için state
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length >= 3) {
        try {
          const response = await fetch(`/api/search?query=${query}`);
          const products = await response.json();
          console.log(products)
          setResults(products);
          setShowResults(true); // Sonuçlar geldiğinde sonuçları göster
        } catch (error) {
          console.error('Ürünler alınırken bir hata oluştu:', error);
          setShowResults(false); // Hata durumunda sonuçları gizle
        }
      } else {
        setResults([]);
        setShowResults(false); // Sonuç yoksa sonuçları gizle
      }
    };

    fetchResults();
  }, [query]);

  const handleSearch = async () => {
    onSearch(results);
    setShowResults(false); // Arama yapıldığında sonuçları gizle
    router.push(`/search?query=${query}`);
  };

  return (
    <div className="flex flex-col items-center space-x-2 relative"> {/* Popover için relative pozisyon */}
    <div className='flex'>
      <Input
        type="text"
        className="px-3 py-2 w-80"
        placeholder="Ürün Ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Ara</Button></div>
      
      {/* SearchResults bileşenini burada çağır ve showResults prop'unu geçir */}
      <SearchResults results={results} />
    </div>
  );
};

export default SearchBar;
