import { API_ENDPOINTS, HTTP_STATUS, HTTP_METHODS } from '@/constants'
import type { 
  ApiResponse, 
  PaginatedResponse, 
  Product, 
  Category, 
  SearchParams, 
  SearchResults 
} from '@/types'

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

/**
 * API Error class
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message || statusText)
    this.name = 'ApiError'
  }
}

/**
 * Base fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, defaultOptions)

    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        `API Error: ${response.status} ${response.statusText}`
      )
    }

    // Handle empty responses
    if (response.status === HTTP_STATUS.NO_CONTENT) {
      return null as T
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    // Network or other errors
    throw new ApiError(
      0,
      'Network Error',
      error instanceof Error ? error.message : 'Unknown error occurred'
    )
  }
}

/**
 * GET request
 */
async function get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint
  return apiFetch<T>(url, { method: HTTP_METHODS.GET })
}

/**
 * POST request
 */
async function post<T>(endpoint: string, data?: unknown): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: HTTP_METHODS.POST,
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * PUT request
 */
async function put<T>(endpoint: string, data?: unknown): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: HTTP_METHODS.PUT,
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * PATCH request
 */
async function patch<T>(endpoint: string, data?: unknown): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: HTTP_METHODS.PATCH,
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * DELETE request
 */
async function del<T>(endpoint: string): Promise<T> {
  return apiFetch<T>(endpoint, { method: HTTP_METHODS.DELETE })
}

// Product API
export const productApi = {
  /**
   * Get all products with pagination
   */
  getAll: (params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
  }): Promise<PaginatedResponse<Product>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.category) searchParams.set('category', params.category)
    if (params?.search) searchParams.set('search', params.search)
    
    const query = searchParams.toString()
    return get<PaginatedResponse<Product>>(`${API_ENDPOINTS.PRODUCTS}${query ? `?${query}` : ''}`)
  },

  /**
   * Get product by ID
   */
  getById: (id: string): Promise<ApiResponse<Product>> => {
    return get<ApiResponse<Product>>(`${API_ENDPOINTS.PRODUCTS}/${id}`)
  },

  /**
   * Get product by slug
   */
  getBySlug: (slug: string): Promise<ApiResponse<Product>> => {
    return get<ApiResponse<Product>>(`${API_ENDPOINTS.PRODUCTS}/slug/${slug}`)
  },

  /**
   * Create new product
   */
  create: (product: Partial<Product>): Promise<ApiResponse<Product>> => {
    return post<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS, product)
  },

  /**
   * Update product
   */
  update: (id: string, product: Partial<Product>): Promise<ApiResponse<Product>> => {
    return put<ApiResponse<Product>>(`${API_ENDPOINTS.PRODUCTS}/${id}`, product)
  },

  /**
   * Delete product
   */
  delete: (id: string): Promise<ApiResponse<null>> => {
    return del<ApiResponse<null>>(`${API_ENDPOINTS.PRODUCTS}/${id}`)
  },

  /**
   * Get featured products
   */
  getFeatured: (): Promise<ApiResponse<Product[]>> => {
    return get<ApiResponse<Product[]>>(`${API_ENDPOINTS.PRODUCTS}/featured`)
  },

  /**
   * Get related products
   */
  getRelated: (id: string): Promise<ApiResponse<Product[]>> => {
    return get<ApiResponse<Product[]>>(`${API_ENDPOINTS.PRODUCTS}/${id}/related`)
  }
}

// Category API
export const categoryApi = {
  /**
   * Get all categories
   */
  getAll: (): Promise<ApiResponse<Category[]>> => {
    return get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES)
  },

  /**
   * Get category by ID
   */
  getById: (id: string): Promise<ApiResponse<Category>> => {
    return get<ApiResponse<Category>>(`${API_ENDPOINTS.CATEGORIES}/${id}`)
  },

  /**
   * Get category by slug
   */
  getBySlug: (slug: string): Promise<ApiResponse<Category>> => {
    return get<ApiResponse<Category>>(`${API_ENDPOINTS.CATEGORIES}/slug/${slug}`)
  },

  /**
   * Create new category
   */
  create: (category: Partial<Category>): Promise<ApiResponse<Category>> => {
    return post<ApiResponse<Category>>(API_ENDPOINTS.CATEGORIES, category)
  },

  /**
   * Update category
   */
  update: (id: string, category: Partial<Category>): Promise<ApiResponse<Category>> => {
    return put<ApiResponse<Category>>(`${API_ENDPOINTS.CATEGORIES}/${id}`, category)
  },

  /**
   * Delete category
   */
  delete: (id: string): Promise<ApiResponse<null>> => {
    return del<ApiResponse<null>>(`${API_ENDPOINTS.CATEGORIES}/${id}`)
  },

  /**
   * Get category products
   */
  getProducts: (
    id: string, 
    params?: { page?: number; limit?: number }
  ): Promise<PaginatedResponse<Product>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    
    const query = searchParams.toString()
    return get<PaginatedResponse<Product>>(
      `${API_ENDPOINTS.CATEGORIES}/${id}/products${query ? `?${query}` : ''}`
    )
  }
}

// Search API
export const searchApi = {
  /**
   * Search products
   */
  searchProducts: (params: SearchParams): Promise<SearchResults> => {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, item.toString()))
        } else {
          searchParams.set(key, value.toString())
        }
      }
    })

    return get<SearchResults>(`${API_ENDPOINTS.SEARCH}?${searchParams.toString()}`)
  },

  /**
   * Get search suggestions
   */
  getSuggestions: (query: string): Promise<ApiResponse<string[]>> => {
    return get<ApiResponse<string[]>>(`${API_ENDPOINTS.SEARCH}/suggestions`, { q: query })
  },

  /**
   * Get popular searches
   */
  getPopular: (): Promise<ApiResponse<string[]>> => {
    return get<ApiResponse<string[]>>(`${API_ENDPOINTS.SEARCH}/popular`)
  }
}

// File upload API
export const uploadApi = {
  /**
   * Upload single file
   */
  uploadFile: async (file: File, folder?: string): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData()
    formData.append('file', file)
    if (folder) formData.append('folder', folder)

    return apiFetch<ApiResponse<{ url: string }>>('/api/upload', {
      method: HTTP_METHODS.POST,
      body: formData,
      headers: {} // Let browser set Content-Type for FormData
    })
  },

  /**
   * Upload multiple files
   */
  uploadFiles: async (files: File[], folder?: string): Promise<ApiResponse<{ urls: string[] }>> => {
    const formData = new FormData()
    files.forEach(file => formData.append('files', file))
    if (folder) formData.append('folder', folder)

    return apiFetch<ApiResponse<{ urls: string[] }>>('/api/upload/multiple', {
      method: HTTP_METHODS.POST,
      body: formData,
      headers: {} // Let browser set Content-Type for FormData
    })
  }
}

// Health check API
export const healthApi = {
  /**
   * Check API health
   */
  check: (): Promise<ApiResponse<{ status: string; timestamp: string }>> => {
    return get<ApiResponse<{ status: string; timestamp: string }>>('/api/health')
  }
}

// Export combined API object
export const api = {
  products: productApi,
  categories: categoryApi,
  search: searchApi,
  upload: uploadApi,
  health: healthApi,
}

export default api
