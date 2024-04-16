import React, { useState, useEffect } from 'react';
import { TProduct } from '@/app/types';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from 'next/link';

interface SearchResultsProps {
  results: TProduct[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(results.length > 0);
  }, [results]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger></PopoverTrigger>
      {isOpen && (
        <PopoverContent className="w-80">
          {results.map((result) => (
            <Link key={result.id} href={`/products/${result.id}`}>
            <div className="mb-2 hover:bg-gray-200 cursor-pointer">
              {result.name}
            </div>
          </Link>
          ))}
        </PopoverContent>
      )}
    </Popover>
  );
};

export default SearchResults;