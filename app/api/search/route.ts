import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import { 
  handleApiError, 
  createSuccessResponse, 
  validateRequest, 
  withErrorHandling,
  schemas,
  checkRateLimit,
  AppError,
  ErrorCode
} from '@/utils/api-helpers';

export async function GET(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip, 20, 60000)) { // 20 requests per minute for search
      return NextResponse.json(
        { success: false, error: { message: 'Çok fazla arama isteği. Lütfen bir dakika bekleyin.' } },
        { status: 429 }
      );
    }

    const url = new URL(req.url);
    const query = url.searchParams.get('query');

    // Validate search query
    if (!query || query.trim().length === 0) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        'Arama terimi boş olamaz',
        400
      );
    }

    const validatedQuery = validateRequest(schemas.search, { query: query.trim() });

    // Prevent very short queries to avoid too many results
    if (validatedQuery.query.length < 2) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        'Arama terimi en az 2 karakter olmalıdır',
        400
      );
    }

    const products = await withErrorHandling(async () => {
      return await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: validatedQuery.query, mode: 'insensitive' } },
            { description: { contains: validatedQuery.query, mode: 'insensitive' } },
            { brandName: { contains: validatedQuery.query, mode: 'insensitive' } },
            { catName: { contains: validatedQuery.query, mode: 'insensitive' } },
            { subcatName: { contains: validatedQuery.query, mode: 'insensitive' } },
            { metaKeywords: { contains: validatedQuery.query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          imageUrl: true,
          brandName: true,
          catName: true,
          subcatName: true,
          isRecommended: true,
          metaTitle: true,
          metaDescription: true,
        },
        take: 50, // Limit results to prevent performance issues
        orderBy: [
          { isRecommended: 'desc' }, // Recommended products first
          { name: 'asc' }
        ]
      });
    });

    // Add search analytics/logging here if needed
    console.log(`Search performed: "${validatedQuery.query}" - ${products.length} results`);

    return createSuccessResponse(
      products, 
      `${products.length} sonuç bulundu`
    );
    
  } catch (error) {
    return handleApiError(error);
  }
}

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;
