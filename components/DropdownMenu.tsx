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

interface Category {
  id: string;
  catName: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  subcatName: string;
}

const MenuDropdown = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
        // Hata mesajı gösterin
      }
    };

    fetchCategories();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><Menu />Tüm Kategoriler</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        {categories.map((category) => (
          <DropdownMenuGroup key={category.id}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger><Link href={`/categories/${category.catName}`}>{category.catName}</Link></DropdownMenuSubTrigger>
              
              <DropdownMenuSubContent>
              {category.subcategories.length > 0 && (
                category.subcategories.map((subcategory) => (
                  <DropdownMenuItem key={subcategory.id}>
                    <Link href={`/categories/${category.catName}/subcategories/${subcategory.subcatName}`}>
                    {subcategory.subcatName}
                    </Link>
                  </DropdownMenuItem>
                )))}
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
