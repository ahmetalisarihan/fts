import { VALIDATION, CONTACT_INFO } from '@/constants'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS sınıflarını birleştirmek için utility
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Değerin boş olup olmadığını kontrol eder
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Metni capitalize eder (ilk harf büyük)
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Metni title case'e çevirir
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

/**
 * Slug oluşturur
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Özel karakterleri temizle
    .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
    .replace(/-+/g, '-') // Birden fazla tireyi tek tire yap
    .trim()
    .replace(/^-+|-+$/g, '') // Başındaki ve sonundaki tireleri temizle
}

/**
 * Fiyatı formatlar
 */
export function formatPrice(
  price: number,
  currency: string = 'TRY',
  locale: string = 'tr-TR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

/**
 * Sayıyı formatlar (binlik ayraçlı)
 */
export function formatNumber(
  number: number,
  locale: string = 'tr-TR'
): string {
  return new Intl.NumberFormat(locale).format(number)
}

/**
 * Tarihi formatlar
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  locale: string = 'tr-TR'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(dateObj)
}

/**
 * Relatif zaman formatlar (örn: "2 saat önce")
 */
export function formatRelativeTime(
  date: Date | string,
  locale: string = 'tr-TR'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'second')
  if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), 'minute')
  if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour')
  if (diffInSeconds < 2592000) return rtf.format(-Math.floor(diffInSeconds / 86400), 'day')
  if (diffInSeconds < 31536000) return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month')
  
  return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year')
}

/**
 * Email adresini doğrular
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION.EMAIL_REGEX.test(email)
}

/**
 * Telefon numarasını doğrular (Türkiye formatı)
 */
export function isValidPhone(phone: string): boolean {
  return VALIDATION.PHONE_REGEX.test(phone)
}

/**
 * URL'in geçerli olup olmadığını kontrol eder
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Dosya boyutunu okunabilir formata çevirir
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Array'i chunk'lara böler
 */
export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, (index + 1) * size)
  )
}

/**
 * Array'den dublicate değerleri temizler
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

/**
 * Deep clone yapar
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * WhatsApp URL'i oluşturur
 */
export function createWhatsAppUrl(message?: string): string {
  const encodedMessage = encodeURIComponent(message || CONTACT_INFO.WHATSAPP_MESSAGE)
  return `https://api.whatsapp.com/send?phone=${CONTACT_INFO.WHATSAPP_NUMBER}&text=${encodedMessage}`
}

/**
 * Rastgele ID oluşturur
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * RGB to Hex converter
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

/**
 * Hex to RGB converter
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

/**
 * Local storage wrapper (safely handles SSR)
 */
export const storage = {
  get<T>(key: string, defaultValue?: T): T | null {
    if (typeof window === 'undefined') return defaultValue || null
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch {
      return defaultValue || null
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
    }
  },

  clear(): void {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.clear()
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  }
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false
  
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
      return true
    } catch {
      return false
    }
  }
}
