'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SearchResults from '@/components/SearchResults';
import { TProduct } from '@/app/types';
import { Search, X } from 'lucide-react';
import { OptimizedAPI } from '@/utils/api-optimization';

interface SearchBarProps {
  onSearch: (products: TProduct[]) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState<TProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // URL'den query parametresini al ve input'u güncelle
  useEffect(() => {
    const urlQuery = searchParams.get('query');
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

  // Debounced search function
  const debouncedSearch = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length >= 2) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
          const json = await response.json();
          setResults(json.data || []);
          setShowResults(true);
        } catch (error) {
          console.error('Ürünler alınırken bir hata oluştu:', error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    },
    []
  );

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Set new timeout for debounced search
    if (query.trim()) {
      searchTimeout.current = setTimeout(() => {
        debouncedSearch(query.trim());
      }, 300); // 300ms delay
    } else {
      setResults([]);
      setShowResults(false);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query, debouncedSearch]);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      onSearch(results);
      setShowResults(false);
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults) {
      if (event.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          router.push(`/products/${results[selectedIndex].slug}`);
        } else {
          handleSearch();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Keep input focused when showing results
  useEffect(() => {
    if (showResults && inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  }, [showResults]);

  // Auto focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleProductSelect = (product: TProduct) => {
    setShowResults(false);
    router.push(`/products/${product.slug}`);
  };

  // Click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center relative" ref={wrapperRef}>
      <div className='flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 '>
        <div className="relative w-full lg:w-80">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              ref={inputRef}
              type="text"
              className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ürün ara... (en az 2 karakter)"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => handleSearch()}
          disabled={!query.trim()}
          className="min-w-[60px]"
        >
          Ara
        </Button>
      </div>
      
      <SearchResults 
        results={results} 
        show={showResults}
        selectedIndex={selectedIndex}
        onProductSelect={handleProductSelect}
        onClose={() => setShowResults(false)}
        query={query}
      />
    </div>
  );
};

export default SearchBar;