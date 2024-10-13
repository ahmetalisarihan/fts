import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
} from '@/components/ui/navigation-menu';

const NavbarSkeleton = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {Array.from({ length: 6 }).map((_, index) => (
                    <NavigationMenuItem key={index}>
                        <Skeleton className="h-6 w-24" />
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <Skeleton className="h-4 w-full" />
                                </li>
                                <li className="row-span-3">
                                    <Skeleton className="h-4 w-full" />
                                </li>
                                <li className="row-span-3">
                                    <Skeleton className="h-4 w-full" />
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavbarSkeleton;