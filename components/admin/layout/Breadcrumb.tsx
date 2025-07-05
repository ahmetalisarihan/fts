'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sayfa isimlerini Türkçe'ye çevirmek için mapping
const pathNameMap: Record<string, string> = {
  admin: 'Yönetim Paneli',
  products: 'Ürün Yönetimi',
  categories: 'Kategori Yönetimi',
  brands: 'Marka Yönetimi',
  carousel: 'Carousel Yönetimi',
  campaigns: 'Kampanya Yönetimi',
  prices: 'Fiyat Yönetimi',
  settings: 'Ayarlar',
  create: 'Oluştur',
  edit: 'Düzenle',
  list: 'Liste',
};

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Pathname'i breadcrumb item'larına çevir
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    // Ana sayfa için
    breadcrumbs.push({
      label: 'Ana Sayfa',
      href: '/',
    });
    
    // Her segment için breadcrumb oluştur
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Eğer segment sayısal ise (ID), gösterme
      if (!isNaN(Number(segment))) {
        return;
      }
      
      const label = pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      breadcrumbs.push({
        label,
        href: currentPath,
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground px-6 py-3 border-b border-border bg-muted/20">
      <Home className="h-4 w-4" />
      
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          
          {index === breadcrumbs.length - 1 ? (
            // Son element - aktif sayfa
            <span className="font-medium text-foreground">
              {breadcrumb.label}
            </span>
          ) : (
            // Tıklanabilir link
            <Link
              href={breadcrumb.href}
              className={cn(
                "hover:text-foreground transition-colors",
                index === 0 && "flex items-center"
              )}
            >
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
