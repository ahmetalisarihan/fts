'use client'
import React, { useEffect, useState } from 'react';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from '@/components/ui/navigation-menu';

interface Category {
    id: string;
    catName: string;
    subcategories: Subcategory[];
}

interface Subcategory {
    id: string;
    subcatName: string;
    catName: string;
}

const Navbar = () => {
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
            <NavigationMenu>
                <NavigationMenuList>
                    {categories.map((category: Category) => (
                        <NavigationMenuItem key={category.id}>
                            <NavigationMenuTrigger>{category.catName}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                
                                    {category.subcategories.map((subcategory) => (
                                        <li key={subcategory.id} className="row-span-3">
                                            <NavigationMenuLink href={`/categories/${subcategory.subcatName}`}>
                                                {subcategory.subcatName}
                                            </NavigationMenuLink>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
    );
};

export default Navbar;