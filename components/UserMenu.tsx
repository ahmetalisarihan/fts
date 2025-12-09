'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User, LogOut, Settings, ShoppingBag, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

export default function UserMenu() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Yükleniyor durumu
  if (!isLoaded) {
    return (
      <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  // Kullanıcı giriş yapmamış
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/sign-in">
          <Button variant="ghost" size="sm">
            Giriş Yap
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button size="sm">
            Kayıt Ol
          </Button>
        </Link>
      </div>
    );
  }

  // Admin kontrolü
  const isAdmin = user.publicMetadata?.role === 'admin';
  
  // Kullanıcı adının baş harfleri
  const initials = user.firstName && user.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user.firstName
    ? user.firstName[0]
    : user.emailAddresses[0]?.emailAddress[0] || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
            <AvatarFallback className="bg-blue-500 text-white">
              {initials.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isAdmin && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
            >
              <Shield className="h-3 w-3" />
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.fullName || user.firstName || 'Kullanıcı'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.emailAddresses[0]?.emailAddress}
            </p>
            {isAdmin && (
              <Badge variant="secondary" className="w-fit mt-1">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href="/sepet" className="cursor-pointer">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Sepetim</span>
          </Link>
        </DropdownMenuItem>
        
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin" className="cursor-pointer text-blue-600">
                <Settings className="mr-2 h-4 w-4" />
                <span>Admin Panel</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          className="cursor-pointer text-red-600"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Çıkış Yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}