'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tags,
  Images,
  Megaphone,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Ürün Yönetimi',
    href: '/admin/products',
    icon: Package,
  },
  {
    name: 'Kategori Yönetimi',
    href: '/admin/categories',
    icon: FolderTree,
  },
  {
    name: 'Marka Yönetimi',
    href: '/admin/brands',
    icon: Tags,
  },
  {
    name: 'Carousel Yönetimi',
    href: '/admin/carousel',
    icon: Images,
  },
  {
    name: 'Kampanya Yönetimi',
    href: '/admin/campaigns',
    icon: Megaphone,
  },
  {
    name: 'Fiyat Yönetimi',
    href: '/admin/prices',
    icon: DollarSign,
  },
  {
    name: 'Ayarlar',
    href: '/admin/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onCollapseAction: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed, onCollapseAction }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'relative flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-foreground">
            FTS Admin
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapseAction(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground',
                  isCollapsed ? 'justify-center' : 'justify-start'
                )}
              >
                <Icon className={cn('h-5 w-5', !isCollapsed && 'mr-3')} />
                {!isCollapsed && (
                  <>
                    <span className="truncate">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="border-t border-border p-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">
                A
              </span>
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-foreground">Admin</p>
              <p className="text-xs text-muted-foreground">admin@fetesendustriyelyapi.com.tr.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
