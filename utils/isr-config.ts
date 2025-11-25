// ISR (Incremental Static Regeneration) configuration for Vercel Free Plan
export const ISR_CONFIG = {
  // Revalidation intervals (seconds)
  PAGES: {
    HOME: 3600, // 1 hour - ana sayfa
    PRODUCTS: 1800, // 30 minutes - ürün listesi
    PRODUCT_DETAIL: 3600, // 1 hour - ürün detayı
    CATEGORIES: 7200, // 2 hours - kategoriler
    BRANDS: 7200, // 2 hours - markalar
    PRICELISTS: 1800, // 30 minutes - fiyat listeleri
  },
  
  // API routes cache headers
  API: {
    PRODUCTS: 'public, s-maxage=1800, stale-while-revalidate=3600', // 30 min cache, 1 hour stale
    CATEGORIES: 'public, s-maxage=3600, stale-while-revalidate=7200', // 1 hour cache, 2 hour stale
    BRANDS: 'public, s-maxage=3600, stale-while-revalidate=7200', // 1 hour cache, 2 hour stale
    PRICELISTS: 'public, s-maxage=1800, stale-while-revalidate=3600', // 30 min cache, 1 hour stale
  }
}

// Helper function to get cache headers
export function getCacheHeaders(type: keyof typeof ISR_CONFIG.API): Record<string, string> {
  return {
    'Cache-Control': ISR_CONFIG.API[type],
    'CDN-Cache-Control': ISR_CONFIG.API[type],
    'Vercel-CDN-Cache-Control': ISR_CONFIG.API[type]
  }
}