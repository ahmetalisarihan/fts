import { revalidatePath, revalidateTag } from 'next/cache';

export class CacheManager {
  // Tüm ürün cache'lerini temizle
  static async invalidateProductCaches() {
    try {
      // Ana sayfa
      revalidatePath('/');
      
      // Ürün sayfaları
      revalidatePath('/products');
      revalidatePath('/products/[slug]', 'page');
      
      // Kategori sayfaları
      revalidatePath('/categories');
      revalidatePath('/categories/[catName]', 'page');
      revalidatePath('/categories/[catName]/subcategories/[subcatName]', 'page');
      
      // Marka sayfaları
      revalidatePath('/brands');
      revalidatePath('/brands/[brandName]', 'page');
      
      // API route'ları için tag-based revalidation
      revalidateTag('products');
      revalidateTag('recommended-products');
      revalidateTag('categories');
      revalidateTag('brands');
      revalidateTag('campaigns');
      revalidateTag('carousels');
      
      console.log('Cache invalidation completed successfully');
    } catch (error) {
      console.error('Cache invalidation failed:', error);
    }
  }

  // Kategori cache'lerini temizle
  static async invalidateCategoryCaches() {
    try {
      revalidatePath('/categories');
      revalidatePath('/categories/[catName]', 'page');
      revalidatePath('/categories/[catName]/subcategories/[subcatName]', 'page');
      revalidateTag('categories');
      revalidateTag('subcategories');
      
      console.log('Category cache invalidation completed');
    } catch (error) {
      console.error('Category cache invalidation failed:', error);
    }
  }

  // Marka cache'lerini temizle
  static async invalidateBrandCaches() {
    try {
      revalidatePath('/brands');
      revalidatePath('/brands/[brandName]', 'page');
      revalidateTag('brands');
      
      console.log('Brand cache invalidation completed');
    } catch (error) {
      console.error('Brand cache invalidation failed:', error);
    }
  }

  // Kampanya cache'lerini temizle
  static async invalidateCampaignCaches() {
    try {
      revalidatePath('/');
      revalidateTag('campaigns');
      
      console.log('Campaign cache invalidation completed');
    } catch (error) {
      console.error('Campaign cache invalidation failed:', error);
    }
  }

  // Fiyat listesi cache'lerini temizle
  static async invalidatePriceListCaches() {
    try {
      revalidatePath('/fiyat-listeleri');
      revalidatePath('/pricelists');
      revalidatePath('/pricelists/[priceName]', 'page');
      revalidateTag('pricelists');
      
      console.log('Price list cache invalidation completed');
    } catch (error) {
      console.error('Price list cache invalidation failed:', error);
    }
  }

  // Client-side cache temizleme
  static clearClientCache() {
    if (typeof window !== 'undefined') {
      // Service worker cache temizle
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }
      
      // Browser cache'i temizle (sadece bu domain için)
      if ('localStorage' in window) {
        localStorage.clear();
      }
      
      if ('sessionStorage' in window) {
        sessionStorage.clear();
      }
    }
  }
}

// Fetch wrapper with cache busting
export const fetchWithCacheBusting = async (url: string, options: RequestInit = {}) => {
  const timestamp = new Date().getTime();
  const separator = url.includes('?') ? '&' : '?';
  const cacheBustedUrl = `${url}${separator}t=${timestamp}`;
  
  return fetch(cacheBustedUrl, {
    ...options,
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      ...options.headers,
    },
  });
};
