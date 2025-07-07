import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { handleApiError, createSuccessResponse, addCorsHeaders } from '@/utils/api-helpers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { catName, description } = body;

    if (!catName) {
      const response = NextResponse.json(
        { success: false, error: { message: 'Kategori adı gereklidir' } },
        { status: 400 }
      );
      return addCorsHeaders(response);
    }

    // Check if category already exists
    const existingCategory = await prisma.category.findUnique({
      where: { catName }
    });

    if (existingCategory) {
      const response = NextResponse.json(
        { success: false, error: { message: 'Bu kategori adı zaten kullanımda' } },
        { status: 409 }
      );
      return addCorsHeaders(response);
    }

    // Create category
    const newCategory = await prisma.category.create({
      data: {
        catName,
        description: description || null,
      },
    });

    return createSuccessResponse(newCategory, 'Kategori başarıyla oluşturuldu', 201);
    
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(_req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: {
          include: {
            products: {
              select: {
                id: true,
                name: true,
                slug: true,
                imageUrl: true,
                isRecommended: true,
              }
            },
          },
          orderBy: [
            { order: 'asc' },
            { subcatName: 'asc' }
          ]
        },
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
            imageUrl: true,
            isRecommended: true,
          }
        },
      },
      orderBy: [
        { order: 'asc' },
        { catName: 'asc' }
      ]
    });
    
    return createSuccessResponse(categories, 'Kategoriler başarıyla getirildi');
    
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
