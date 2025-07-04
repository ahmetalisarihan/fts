// API Constants
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  CATEGORIES: '/api/categories',
  SUBCATEGORIES: '/api/subcategories',
  SEARCH: '/api/search',
  USERS: '/api/users',
  AUTH: '/api/auth',
} as const

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const

// UI Constants
export const BREAKPOINTS = {
  XS: 475,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1400,
} as const

export const Z_INDEX = {
  DROPDOWN: 10,
  MODAL: 50,
  TOAST: 100,
  TOOLTIP: 200,
} as const

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
  ITEMS_PER_PAGE_OPTIONS: [6, 12, 24, 48],
} as const

// Product Constants
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const

export const PRODUCT_AVAILABILITY = {
  IN_STOCK: 'in_stock',
  OUT_OF_STOCK: 'out_of_stock',
  DISCONTINUED: 'discontinued',
} as const

export const PRODUCT_CONDITION = {
  NEW: 'new',
  USED: 'used',
  REFURBISHED: 'refurbished',
} as const

// Image Constants
export const IMAGE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_FORMATS: ['jpeg', 'jpg', 'png', 'webp'],
  THUMBNAIL_SIZE: 300,
  MEDIUM_SIZE: 600,
  LARGE_SIZE: 1200,
} as const

// Search Constants
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  MAX_QUERY_LENGTH: 100,
  DEBOUNCE_DELAY: 300,
  MAX_SUGGESTIONS: 5,
} as const

export const SORT_OPTIONS = {
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  DATE_ASC: 'date_asc',
  DATE_DESC: 'date_desc',
  POPULARITY: 'popularity',
} as const

// Form Validation Constants
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(\+90|0)?[0-9]{10}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 1000,
} as const

// Cache Constants
export const CACHE_KEYS = {
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  USER_PREFERENCES: 'user_preferences',
  SEARCH_HISTORY: 'search_history',
} as const

export const CACHE_TTL = {
  SHORT: 5 * 60, // 5 minutes
  MEDIUM: 30 * 60, // 30 minutes
  LONG: 60 * 60, // 1 hour
  VERY_LONG: 24 * 60 * 60, // 24 hours
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'fts_theme',
  LANGUAGE: 'fts_language',
  CART: 'fts_cart',
  WISHLIST: 'fts_wishlist',
  RECENT_SEARCHES: 'fts_recent_searches',
  USER_PREFERENCES: 'fts_user_preferences',
} as const

// Route Constants
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  ABOUT: '/hakkimizda',
  CONTACT: '/iletisim',
  PRICE_LISTS: '/fiyat-listeleri',
  SEARCH: '/search',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ADMIN: '/admin',
} as const

// SEO Constants
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'FTS - Fetes Endüstriyel Yapı Malzemeleri',
  TITLE_SEPARATOR: ' | ',
  DEFAULT_DESCRIPTION: 'Kaliteli yangın güvenlik sistemleri, su pompaları ve endüstriyel çözümler',
  SITE_NAME: 'FTS',
  TWITTER_HANDLE: '@fts_endustriyel',
  OG_IMAGE_WIDTH: 1200,
  OG_IMAGE_HEIGHT: 630,
} as const

// Contact Information
export const CONTACT_INFO = {
  PHONE: '+90-539-516-0183',
  PHONE_DISPLAY: '0539 516 01 83',
  EMAIL: 'info@fetesendustriyelyapi.com.tr',
  WEBSITE: 'https://www.fetesendustriyelyapi.com.tr',
  WHATSAPP_NUMBER: '905395160183',
  WHATSAPP_MESSAGE: 'Merhaba, bilgi almak istiyorum?',
} as const

// Feature Flags
export const FEATURES = {
  ENABLE_SEARCH: true,
  ENABLE_WISHLIST: true,
  ENABLE_COMPARISON: true,
  ENABLE_REVIEWS: false,
  ENABLE_CHAT: true,
  ENABLE_DARK_MODE: true,
} as const

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Bir hata oluştu. Lütfen tekrar deneyin.',
  NETWORK: 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.',
  VALIDATION: 'Lütfen tüm alanları doğru şekilde doldurun.',
  UNAUTHORIZED: 'Bu işlem için yetkiniz bulunmuyor.',
  NOT_FOUND: 'Aradığınız sayfa bulunamadı.',
  SERVER_ERROR: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Başarıyla kaydedildi.',
  UPDATED: 'Başarıyla güncellendi.',
  DELETED: 'Başarıyla silindi.',
  SENT: 'Başarıyla gönderildi.',
  COPIED: 'Panoya kopyalandı.',
} as const

// Theme Colors (CSS Custom Properties)
export const THEME_COLORS = {
  PRIMARY: 'hsl(var(--primary))',
  PRIMARY_FOREGROUND: 'hsl(var(--primary-foreground))',
  SECONDARY: 'hsl(var(--secondary))',
  SECONDARY_FOREGROUND: 'hsl(var(--secondary-foreground))',
  ACCENT: 'hsl(var(--accent))',
  ACCENT_FOREGROUND: 'hsl(var(--accent-foreground))',
  DESTRUCTIVE: 'hsl(var(--destructive))',
  DESTRUCTIVE_FOREGROUND: 'hsl(var(--destructive-foreground))',
  MUTED: 'hsl(var(--muted))',
  MUTED_FOREGROUND: 'hsl(var(--muted-foreground))',
  BORDER: 'hsl(var(--border))',
  INPUT: 'hsl(var(--input))',
  RING: 'hsl(var(--ring))',
  BACKGROUND: 'hsl(var(--background))',
  FOREGROUND: 'hsl(var(--foreground))',
  CARD: 'hsl(var(--card))',
  CARD_FOREGROUND: 'hsl(var(--card-foreground))',
  POPOVER: 'hsl(var(--popover))',
  POPOVER_FOREGROUND: 'hsl(var(--popover-foreground))',
} as const

// Environment Variables (with defaults)
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
} as const

// Component Sizes
export const COMPONENT_SIZES = {
  BUTTON: {
    SM: 'h-8 px-3 text-xs',
    MD: 'h-10 px-4 py-2',
    LG: 'h-11 px-8',
    XL: 'h-12 px-12',
  },
  INPUT: {
    SM: 'h-8 px-3 text-xs',
    MD: 'h-10 px-3',
    LG: 'h-11 px-4',
  },
  AVATAR: {
    SM: 'h-8 w-8',
    MD: 'h-10 w-10',
    LG: 'h-16 w-16',
    XL: 'h-20 w-20',
  },
} as const
