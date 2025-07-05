import { NextResponse } from 'next/server';
import { z } from 'zod';

// Error Types
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
}

export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: any;
  statusCode: number;
}

// Custom Error Class
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(code: ErrorCode, message: string, statusCode: number = 500, details?: any) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    
    // Maintain proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global Error Handler
export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error);

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: ErrorCode.VALIDATION_ERROR,
          message: 'Validation failed',
          details: error.errors,
        },
      },
      { status: 400 }
    );
  }

  // Database specific errors
  if (error && typeof error === 'object' && 'code' in error) {
    const dbError = error as any;
    
    // Prisma errors
    if (dbError.code === 'P2002') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: ErrorCode.DUPLICATE_ENTRY,
            message: 'Bu kayıt zaten mevcut',
            details: dbError.meta,
          },
        },
        { status: 409 }
      );
    }

    if (dbError.code === 'P2025') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: ErrorCode.NOT_FOUND,
            message: 'Kayıt bulunamadı',
          },
        },
        { status: 404 }
      );
    }
  }

  // Default internal server error
  return NextResponse.json(
    {
      success: false,
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Sunucu hatası oluştu',
      },
    },
    { status: 500 }
  );
}

// Success Response Helper
export function createSuccessResponse(data: any, message?: string, statusCode: number = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: statusCode }
  );
}

// Validation Schemas
export const schemas = {
  // Product schemas
  createProduct: z.object({
    name: z.string().min(1, 'Ürün adı gerekli').max(255, 'Ürün adı çok uzun'),
    slug: z.string().min(1, 'Slug gerekli').max(255, 'Slug çok uzun'),
    description: z.string().optional(),
    imageUrl: z.string().url('Geçerli bir resim URL\'si gerekli').optional(),
    publicId: z.string().optional(),
    brandName: z.string().min(1, 'Marka adı gerekli').max(100, 'Marka adı çok uzun'),
    catName: z.string().min(1, 'Kategori adı gerekli').max(100, 'Kategori adı çok uzun'),
    subcatName: z.string().min(1, 'Alt kategori adı gerekli').max(100, 'Alt kategori adı çok uzun'),
    priceName: z.string().optional(),
    isRecommended: z.boolean().optional(),
    metaTitle: z.string().max(60, 'Meta title çok uzun').optional(),
    metaDescription: z.string().max(160, 'Meta description çok uzun').optional(),
    metaKeywords: z.string().max(255, 'Meta keywords çok uzun').optional(),
  }),

  updateProduct: z.object({
    name: z.string().min(1, 'Ürün adı gerekli').max(255, 'Ürün adı çok uzun').optional(),
    slug: z.string().min(1, 'Slug gerekli').max(255, 'Slug çok uzun').optional(),
    description: z.string().optional(),
    imageUrl: z.string().url('Geçerli bir resim URL\'si gerekli').optional(),
    publicId: z.string().optional(),
    brandName: z.string().min(1, 'Marka adı gerekli').max(100, 'Marka adı çok uzun').optional(),
    catName: z.string().min(1, 'Kategori adı gerekli').max(100, 'Kategori adı çok uzun').optional(),
    subcatName: z.string().min(1, 'Alt kategori adı gerekli').max(100, 'Alt kategori adı çok uzun').optional(),
    priceName: z.string().optional(),
    isRecommended: z.boolean().optional(),
    metaTitle: z.string().max(60, 'Meta title çok uzun').optional(),
    metaDescription: z.string().max(160, 'Meta description çok uzun').optional(),
    metaKeywords: z.string().max(255, 'Meta keywords çok uzun').optional(),
  }),

  // Category schemas
  createCategory: z.object({
    catName: z.string().min(1, 'Kategori adı gerekli').max(100, 'Kategori adı çok uzun'),
    description: z.string().max(500, 'Açıklama çok uzun').optional().or(z.literal('')),
  }),

  updateCategory: z.object({
    catName: z.string().min(1, 'Kategori adı gerekli').max(100, 'Kategori adı çok uzun').optional(),
    description: z.string().max(500, 'Açıklama çok uzun').optional().or(z.literal('')),
  }),

  // Subcategory schemas
  createSubcategory: z.object({
    subcatName: z.string().min(1, 'Alt kategori adı gerekli').max(100, 'Alt kategori adı çok uzun'),
    description: z.string().max(500, 'Açıklama çok uzun').optional().or(z.literal('')),
    catName: z.string().min(1, 'Kategori adı gerekli').max(100, 'Kategori adı çok uzun'),
  }),

  updateSubcategory: z.object({
    subcatName: z.string().min(1, 'Alt kategori adı gerekli').max(100, 'Alt kategori adı çok uzun').optional(),
    description: z.string().max(500, 'Açıklama çok uzun').optional().or(z.literal('')),
    catName: z.string().min(1, 'Kategori adı gerekli').max(100, 'Kategori adı çok uzun').optional(),
  }),

  // Brand schemas
  createBrand: z.object({
    brandName: z.string().min(1, 'Marka adı gerekli').max(100, 'Marka adı çok uzun'),
    description: z.string().max(500, 'Açıklama çok uzun').optional().or(z.literal('')),
  }),

  updateBrand: z.object({
    brandName: z.string().min(1, 'Marka adı gerekli').max(100, 'Marka adı çok uzun').optional(),
    description: z.string().max(500, 'Açıklama çok uzun').optional().or(z.literal('')),
  }),

  // Campaign schemas
  createCampaign: z.object({
    title: z.string().max(255, 'Başlık çok uzun').optional(),
    imageUrl: z.string().url('Geçerli bir resim URL\'si gerekli'),
    link: z.string().url('Geçerli bir link gerekli'),
  }),

  updateCampaign: z.object({
    title: z.string().max(255, 'Başlık çok uzun').optional(),
    imageUrl: z.string().url('Geçerli bir resim URL\'si gerekli').optional(),
    link: z.string().url('Geçerli bir link gerekli').optional(),
  }),

  // Carousel schemas
  createCarousel: z.object({
    imageUrl: z.string().url('Geçerli bir resim URL\'si gerekli'),
    carouselLink: z.string().url('Geçerli bir link gerekli'),
  }),

  updateCarousel: z.object({
    imageUrl: z.string().url('Geçerli bir resim URL\'si gerekli').optional(),
    carouselLink: z.string().url('Geçerli bir link gerekli').optional(),
  }),

  // Price list schemas
  createPriceList: z.object({
    priceName: z.string().min(1, 'Fiyat listesi adı gerekli').max(255, 'Fiyat listesi adı çok uzun'),
    price: z.string().optional(),
    pdfUrl: z.string().url('Geçerli bir PDF URL\'si gerekli'),
  }),

  updatePriceList: z.object({
    priceName: z.string().min(1, 'Fiyat listesi adı gerekli').max(255, 'Fiyat listesi adı çok uzun').optional(),
    price: z.string().optional(),
    pdfUrl: z.string().url('Geçerli bir PDF URL\'si gerekli').optional(),
  }),

  // Search schema
  search: z.object({
    query: z.string().min(1, 'Arama terimi gerekli').max(255, 'Arama terimi çok uzun'),
  }),
};

// Validation Helper
export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        'Validation failed',
        400,
        error.errors
      );
    }
    throw error;
  }
}

// Database Connection Helper
export async function withErrorHandling<T>(
  operation: () => Promise<T>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error('Database operation failed:', error);
    
    if (error instanceof AppError) {
      throw error;
    }
    
    // Handle Prisma specific errors
    if (error && typeof error === 'object' && 'code' in error) {
      const dbError = error as any;
      
      if (dbError.code === 'P2002') {
        throw new AppError(
          ErrorCode.DUPLICATE_ENTRY,
          'Bu kayıt zaten mevcut',
          409,
          dbError.meta
        );
      }
      
      if (dbError.code === 'P2025') {
        throw new AppError(
          ErrorCode.NOT_FOUND,
          'Kayıt bulunamadı',
          404
        );
      }
      
      if (dbError.code === 'P1008') {
        throw new AppError(
          ErrorCode.DATABASE_ERROR,
          'Veritabanı bağlantı hatası',
          500
        );
      }
    }
    
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      'Veritabanı işlemi başarısız',
      500
    );
  }
}

// Rate Limiting Helper (basic implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, maxRequests: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now();
  const clientData = requestCounts.get(ip);
  
  if (!clientData || now > clientData.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (clientData.count >= maxRequests) {
    return false;
  }
  
  clientData.count++;
  return true;
}
