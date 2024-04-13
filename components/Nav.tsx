'use client'
import React from 'react';
import { useQuery } from 'react-query';
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
}

interface Subcategory {
    id: string;
    subcatName: string;
    catName: string;
}

const Navbar = () => {
    const { data: categories } = useQuery('categories', async () => {
        const response = await fetch('/api/categories');
        if (!response.ok) {
            throw new Error('Kategoriler getirilemedi.');
        }
        return response.json();
    });

    const { data: allSubcategories } = useQuery('subcategories', async () => {
        const response = await fetch('/api/subcategories');
        if (!response.ok) {
            throw new Error('Alt kategoriler getirilemedi.');
        }
        return response.json();
    });

    const getSubcategoriesForCategory = (catName: string): Subcategory[] => {
        return allSubcategories.filter((subcategory: Subcategory) => subcategory.catName === catName);
    };


    return (
            <div>
                <NavigationMenu>
                    <NavigationMenuList>
                        {categories?.map((category: Category) => (

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>{category.catName}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul>
                                        {getSubcategoriesForCategory(category.catName).map((subcategory) => (
                                            <NavigationMenuLink key={subcategory.id} href={`/products/${subcategory.subcatName}`}>
                                                {subcategory.subcatName}
                                            </NavigationMenuLink>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                        ))

                        }

                    </NavigationMenuList>
                </NavigationMenu>


            </div>

        );

    };


    export default Navbar;