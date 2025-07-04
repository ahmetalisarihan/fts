"use client"

import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { OptimizedAPI } from '@/utils/api-optimization';
import { TCategory } from '@/app/types';

const MenuDropdown = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await OptimizedAPI.getCategories();
        setCategories(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error(error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          onMouseEnter={() => setIsOpen(true)} 
          onMouseLeave={() => setIsOpen(false)}
          className="text-xs sm:text-sm px-2 sm:px-4"
        >
          <Menu className="w-4 h-4 mr-1" />Tüm Kategoriler
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-48 sm:w-56 max-h-96 overflow-y-auto" 
        onMouseEnter={() => setIsOpen(true)} 
        onMouseLeave={() => setIsOpen(false)}
      >
        <DropdownMenuSeparator />
        {categories.map((category) => (
          <DropdownMenuGroup key={category.id}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Link href={`/categories/${category.catName}`}>{category.catName}</Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {category.subcategories?.map((subcategory) => (
                  <DropdownMenuItem key={subcategory.id}>
                    <Link href={`/categories/${category.catName}/subcategories/${subcategory.subcatName}`}>
                      {subcategory.subcatName}
                    </Link>
                  </DropdownMenuItem>
                )) || []}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuDropdown;
