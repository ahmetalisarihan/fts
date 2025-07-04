// Base Types
export type ID = string | number

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Product Types
export interface Product {
  readonly id: ID
  name: string
  description: string
  price?: number
  currency: string
  brand?: string
  category: Category
  subcategory?: Subcategory
  images: ProductImage[]
  specifications?: ProductSpecification[]
  sku?: string
  availability: ProductAvailability
  condition: ProductCondition
  slug: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface ProductImage {
  readonly id: ID
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export interface ProductSpecification {
  readonly id: ID
  name: string
  value: string
  unit?: string
  order: number
}

export type ProductAvailability = 'in_stock' | 'out_of_stock' | 'discontinued'
export type ProductCondition = 'new' | 'used' | 'refurbished'

// Category Types
export interface Category {
  readonly id: ID
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: ID
  subcategories?: Subcategory[]
  productCount?: number
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Subcategory {
  readonly id: ID
  name: string
  slug: string
  description?: string
  image?: string
  categoryId: ID
  productCount?: number
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

// User Types
export interface User {
  readonly id: ID
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatar?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'admin' | 'customer' | 'guest'

// Search Types
export interface SearchFilters {
  category?: string
  subcategory?: string
  brand?: string
  priceMin?: number
  priceMax?: number
  availability?: ProductAvailability
  tags?: string[]
}

export interface SearchParams extends SearchFilters {
  query?: string
  page?: number
  limit?: number
  sortBy?: SearchSortBy
  sortOrder?: SortOrder
}

export type SearchSortBy = 'name' | 'price' | 'createdAt' | 'popularity'
export type SortOrder = 'asc' | 'desc'

export interface SearchResults {
  products: Product[]
  filters: SearchFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  suggestions?: string[]
}

// UI Component Types
export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: ModalSize
  className?: string
}

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

// Form Types
export interface FormFieldProps<T = unknown> {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  value?: T
  onChange?: (value: T) => void
  className?: string
}

// Navigation Types
export interface NavigationItem {
  readonly id: ID
  name: string
  url: string
  icon?: React.ComponentType
  children?: NavigationItem[]
  isActive?: boolean
  order: number
}

export interface BreadcrumbItem {
  name: string
  url: string
}

// SEO Types
export interface SEOData {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  category?: string
  tags?: string[]
}

// Error Types
export interface AppError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: Date
}

export type ErrorCode = 
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INTERNAL_ERROR'
  | 'NETWORK_ERROR'

// Configuration Types
export interface AppConfig {
  app: {
    name: string
    version: string
    environment: 'development' | 'staging' | 'production'
    url: string
  }
  api: {
    baseUrl: string
    timeout: number
    retryAttempts: number
  }
  features: {
    enableSearch: boolean
    enableWishlist: boolean
    enableComparison: boolean
    enableReviews: boolean
  }
  ui: {
    itemsPerPage: number
    maxFileUploadSize: number
    supportedImageFormats: string[]
  }
}

// Legacy type compatibility (will be removed)
export type TProduct = Product
export type TCategory = Category
export type TSubcategory = Subcategory
