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
import NavbarSkeleton from './Skeleton/NavbarSkeleton';


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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (isLoading) {
        return <NavbarSkeleton />;
    }

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {categories.slice(0, 6).map((category: Category) => (
                    <NavigationMenuItem key={category.id}>
                        <NavigationMenuTrigger>
                            <NavigationMenuLink href={`/categories/${category.catName}`}>
                                {category.catName}
                            </NavigationMenuLink>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                {category.subcategories.map((subcategory) => (
                                    <li key={subcategory.id} className="row-span-3">
                                        <NavigationMenuLink href={`/categories/${category.catName}/subcategories/${subcategory.subcatName}`}>
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