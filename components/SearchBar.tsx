'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { TProduct } from "@/app/types";
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onSearch: (products: TProduct[]) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  // const router = useRouter();

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?query=${query}`);
      const products = await response.json();
      onSearch(products);
      // router.push(`/search?query=${query}`);
    } catch (error) {
      console.error("Ürünler alınırken bir hata oluştu:", error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        className="px-3 py-2 w-80"
        placeholder="Ürün Ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button className="px-3 py-2" onClick={handleSearch}>
        Ara
      </Button>
    </div>
  );
}