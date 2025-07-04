// API Optimization Utilities
import { TProduct, TCategory, TCarousel, TCampaigns } from '@/app/types';

// Global cache for API responses
const apiCache = new Map<string, { data: any; timestamp: number; ttl: number }>();

// Cache TTL (Time To Live) in milliseconds
const CACHE_TTL = {
  categories: 5 * 60 * 1000, // 5 minutes
  carousels: 10 * 60 * 1000, // 10 minutes
  campaigns: 10 * 60 * 1000, // 10 minutes
  recommendedProducts: 2 * 60 * 1000, // 2 minutes
  products: 1 * 60 * 1000, // 1 minute
};

// Global loading states to prevent duplicate requests
const loadingStates = new Map<string, boolean>();

// Request queue to batch similar requests
const requestQueue = new Map<string, Promise<any>>();

interface CacheOptions {
  ttl?: number;
  forceRefresh?: boolean;
  useMemoryCache?: boolean;
}

/**
 * Optimized fetch wrapper with caching and deduplication
 */
// API Response wrapper type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export async function optimizedFetch<T>(
  url: string, 
  options: RequestInit = {},
  cacheOptions: CacheOptions = {}
): Promise<T> {
  const { 
    ttl = CACHE_TTL.categories, 
    forceRefresh = false, 
    useMemoryCache = true 
  } = cacheOptions;

  const cacheKey = `${url}-${JSON.stringify(options)}`;
  const now = Date.now();

  // Check if request is already in progress
  if (loadingStates.get(cacheKey)) {
    // Wait for existing request
    if (requestQueue.has(cacheKey)) {
      return await requestQueue.get(cacheKey);
    }
  }

  // Check cache first (unless force refresh)
  if (!forceRefresh && useMemoryCache) {
    const cached = apiCache.get(cacheKey);
    if (cached && (now - cached.timestamp) < cached.ttl) {
      console.log(`🚀 Cache hit for: ${url}`);
      return cached.data;
    }
  }

  // Mark as loading
  loadingStates.set(cacheKey, true);

  // Create request promise
  let fullUrl = url;
  
  // If URL is relative, make it absolute
  if (url.startsWith('/')) {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    fullUrl = `${baseUrl}${url}`;
  }
  
  const requestPromise = fetch(fullUrl, {
    ...options,
    // Only disable cache in development for debugging
    ...(process.env.NODE_ENV === 'development' ? {} : {
      next: { revalidate: ttl / 1000 }
    })
  })
  .then(async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json() as ApiResponse<T>;
    
    // Extract data from API response wrapper
    const data = responseData.success ? responseData.data : responseData as T;
    
    // Cache the result
    if (useMemoryCache) {
      apiCache.set(cacheKey, {
        data,
        timestamp: now,
        ttl
      });
    }
    
    console.log(`✅ API call completed: ${url}`);
    return data;
  })
  .catch((error) => {
    console.error(`❌ API call failed: ${url}`, error);
    throw error;
  })
  .finally(() => {
    // Clean up loading state and request queue
    loadingStates.delete(cacheKey);
    requestQueue.delete(cacheKey);
  });

  // Add to request queue
  requestQueue.set(cacheKey, requestPromise);

  return await requestPromise;
}

/**
 * Specialized API functions with optimized caching
 */
export class OptimizedAPI {
  
  static async getCategories(forceRefresh = false) {
    return optimizedFetch<TCategory[]>('/api/categories', {}, {
      ttl: CACHE_TTL.categories,
      forceRefresh
    });
  }

  static async getCarousels(forceRefresh = false) {
    return optimizedFetch<TCarousel[]>('/api/carousels', {}, {
      ttl: CACHE_TTL.carousels,
      forceRefresh
    });
  }

  static async getCampaigns(forceRefresh = false) {
    return optimizedFetch<TCampaigns[]>('/api/campaigns', {}, {
      ttl: CACHE_TTL.campaigns,
      forceRefresh
    });
  }

  static async getRecommendedProducts(forceRefresh = false) {
    return optimizedFetch<TProduct[]>('/api/recommended-products', {}, {
      ttl: CACHE_TTL.recommendedProducts,
      forceRefresh
    });
  }

  static async getCategoryProducts(catName: string, forceRefresh = false) {
    return optimizedFetch<{products: TProduct[]}>(`/api/categories/${encodeURIComponent(catName)}`, {}, {
      ttl: CACHE_TTL.products,
      forceRefresh
    });
  }

  /**
   * Batch API calls for initial page load
   */
  static async getHomePageData() {
    console.log('🔄 Loading home page data...');
    
    try {
      const [categories, carousels, campaigns, recommendedProducts] = await Promise.all([
        this.getCategories(),
        this.getCarousels(),
        this.getCampaigns(),
        this.getRecommendedProducts()
      ]);

      console.log('✅ All home page data loaded successfully');
      return {
        categories,
        carousels,
        campaigns,
        recommendedProducts
      };
    } catch (error) {
      console.error('❌ Error loading home page data:', error);
      throw error;
    }
  }

  /**
   * Clear specific cache entries
   */
  static clearCache(pattern?: string) {
    if (pattern) {
      const keysToDelete = Array.from(apiCache.keys()).filter(key => key.includes(pattern));
      keysToDelete.forEach(key => apiCache.delete(key));
      console.log(`🗑️ Cleared cache entries matching: ${pattern}`);
    } else {
      apiCache.clear();
      console.log('🗑️ Cleared all cache');
    }
  }

  /**
   * Preload critical data
   */
  static async preloadCriticalData() {
    console.log('⚡ Preloading critical data...');
    
    // Preload categories first as they're used in multiple components
    await this.getCategories();
    
    // Then preload other data in background
    Promise.all([
      this.getCarousels(),
      this.getCampaigns(),
      this.getRecommendedProducts()
    ]).catch(error => {
      console.warn('⚠️ Some preload operations failed:', error);
    });
  }
}

/**
 * React Hook for optimized API calls
 */
export function useOptimizedAPI() {
  return {
    getCategories: OptimizedAPI.getCategories,
    getCarousels: OptimizedAPI.getCarousels,
    getCampaigns: OptimizedAPI.getCampaigns,
    getRecommendedProducts: OptimizedAPI.getRecommendedProducts,
    getCategoryProducts: OptimizedAPI.getCategoryProducts,
    getHomePageData: OptimizedAPI.getHomePageData,
    clearCache: OptimizedAPI.clearCache,
    preloadCriticalData: OptimizedAPI.preloadCriticalData,
  };
}

/**
 * Cleanup function for cache maintenance
 */
export function cleanupExpiredCache() {
  const now = Date.now();
  let deletedCount = 0;
  
  // Convert entries to array to avoid iteration issues
  const entries = Array.from(apiCache.entries());
  
  for (const [key, value] of entries) {
    if (now - value.timestamp > value.ttl) {
      apiCache.delete(key);
      deletedCount++;
    }
  }
  
  if (deletedCount > 0) {
    console.log(`🧹 Cleaned up ${deletedCount} expired cache entries`);
  }
}

// Auto cleanup every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(cleanupExpiredCache, 5 * 60 * 1000);
}
