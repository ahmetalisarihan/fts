import React, { useState, useEffect } from 'react';
import { TProduct } from '@/app/types';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface SearchResultsProps {
  results: TProduct[];
  show: boolean;
  selectedIndex: number;
  onProductSelect: (product: TProduct) => void;
  onClose: () => void;
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  show, 
  selectedIndex, 
  onProductSelect, 
  onClose,
  query 
}) => {
  if (!show || results.length === 0) {
    return null;
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 font-semibold">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            {results.length} sonuç bulundu
          </span>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            ✕
          </button>
        </div>
        
        {results.map((result, index) => (
          <div
            key={result.slug}
            className={`p-3 rounded-md cursor-pointer transition-colors ${
              index === selectedIndex 
                ? 'bg-blue-100 border-blue-300' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onProductSelect(result)}
          >
            <div className="flex items-center space-x-3">
              {result.imageUrl && (
                <div className="flex-shrink-0">
                  <Image
                    src={result.imageUrl}
                    alt={result.name}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {highlightText(result.name, query)}
                </div>
                {result.description && (
                  <div className="text-xs text-gray-500 truncate mt-1">
                    {highlightText(result.description, query)}
                  </div>
                )}
                <div className="flex items-center mt-1 space-x-2">
                  {result.catName && (
                    <Badge variant="secondary" className="text-xs">
                      {result.catName}
                    </Badge>
                  )}
                  {result.brandName && (
                    <Badge variant="outline" className="text-xs">
                      {result.brandName}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 mt-2 border-t border-gray-100">
          <Link 
            href={`/search?query=${encodeURIComponent(query)}`}
            className="block text-center text-sm text-blue-600 hover:text-blue-800 py-2"
            onClick={onClose}
          >
            Tüm sonuçları görüntüle →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;