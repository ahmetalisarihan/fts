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
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length >= 3) {
        try {
          const response = await fetch(`/api/search?query=${query}`);
          const products = await response.json();
          setResults(products);
        } catch (error) {
          console.error('Ürünler alınırken bir hata oluştu:', error);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  const handleSearch = () => {
    onSearch(results);
    router.push(`/search?query=${query}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className='flex space-x-1 '>
      <Input
        type="text"
        className="px-3 py-2 w-80"
        placeholder="Ürün Ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSearch}>Ara</Button>
      </div>
      
      <SearchResults results={results} />
    </div>
  );
};

export default SearchBar;