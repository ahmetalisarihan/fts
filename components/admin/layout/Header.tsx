'use client';

import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserButton } from '@clerk/nextjs';
import NotificationDropdown from './NotificationDropdown';

interface HeaderProps {
  onMenuClickAction: () => void;
  isMobile: boolean;
}

export default function Header({ onMenuClickAction, isMobile }: HeaderProps) {
  return (
    <header className="bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClickAction}
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ara..."
              className="pl-10 w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Dinamik Bildirimler */}
          <NotificationDropdown />

          {/* Kullanıcı Menüsü */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8"
              }
            }}
          />
        </div>
      </div>
    </header>
  );
}
