import { NextResponse } from 'next/server';
import prisma from "@/libs/prismadb";
import { handleApiError, createSuccessResponse, addCorsHeaders } from '@/utils/api-helpers';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isRecommended: true,
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
        technicalSpecs: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return createSuccessResponse(products, 'Önerilen ürünler başarıyla getirildi');
  } catch (error) {
    return handleApiError(error);
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  return addCorsHeaders(response);
}

// Cache'i devre dışı bırak
export const dynamic = 'force-dynamic'
export const revalidate = 0
