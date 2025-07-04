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
import { OptimizedAPI } from '@/utils/api-optimization';
import { TCategory } from '@/app/types';

const Navbar = () => {
    const [categories, setCategories] = useState<TCategory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await OptimizedAPI.getCategories();
                setCategories(Array.isArray(response) ? response : []);
            } catch (error) {
                console.error('Fetch error:', error);
                setCategories([]);
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
                {categories.slice(0, 6).map((category: TCategory) => (
                    <NavigationMenuItem key={category.id}>
                        <NavigationMenuTrigger>
                            <NavigationMenuLink href={`/categories/${category.catName}`}>
                                {category.catName}
                            </NavigationMenuLink>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                {category.subcategories?.map((subcategory) => (
                                    <li key={subcategory.id} className="row-span-3">
                                        <NavigationMenuLink href={`/categories/${category.catName}/subcategories/${subcategory.subcatName}`}>
                                            {subcategory.subcatName}
                                        </NavigationMenuLink>
                                    </li>
                                )) || []}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navbar;