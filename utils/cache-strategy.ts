// Cache invalidation strategy for Vercel Free Plan
export const CACHE_STRATEGY = {
  // Sadece kritik durumlarda cache temizle
  CRITICAL_OPERATIONS: [
    'product_create',
    'product_delete',
    'category_create',
    'category_delete'
  ],
  
  // Bu işlemlerde cache temizleme
  SKIP_CACHE_INVALIDATION: [
    'product_update', // Sadece güncelleme, yeni sayfa oluşturmuyor
    'brand_update',
    'pricelist_update'
  ],
  
  // Batch invalidation - birden fazla işlem varsa toplu temizle
  BATCH_DELAY: 5000, // 5 saniye bekle, sonra toplu temizle
}

let pendingInvalidations = new Set<string>()
let invalidationTimer: NodeJS.Timeout | null = null

export function shouldInvalidateCache(operation: string): boolean {
  // Free plan için sadece kritik işlemlerde cache temizle
  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PLAN === 'hobby') {
    return CACHE_STRATEGY.CRITICAL_OPERATIONS.includes(operation)
  }
  
  // Development veya paid plan'de her zaman temizle
  return true
}

export function batchCacheInvalidation(type: string, callback: () => Promise<void>) {
  pendingInvalidations.add(type)
  
  // Mevcut timer'ı iptal et
  if (invalidationTimer) {
    clearTimeout(invalidationTimer)
  }
  
  // Yeni timer başlat
  invalidationTimer = setTimeout(async () => {
    try {
      // Toplu cache temizleme
      await callback()
      console.log(`Batch cache invalidation completed for: ${Array.from(pendingInvalidations).join(', ')}`)
    } catch (error) {
      console.error('Batch cache invalidation failed:', error)
    } finally {
      pendingInvalidations.clear()
      invalidationTimer = null
    }
  }, CACHE_STRATEGY.BATCH_DELAY)
}