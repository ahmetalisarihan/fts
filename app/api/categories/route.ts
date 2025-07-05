import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { 
  handleApiError, 
  createSuccessResponse, 
  validateRequest, 
  withErrorHandling,
  schemas,
  checkRateLimit 
} from '@/utils/api-helpers';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip, 10, 60000)) { // 10 requests per minute
      return NextResponse.json(
        { success: false, error: { message: 'Çok fazla istek. Lütfen bir dakika bekleyin.' } },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedData = validateRequest(schemas.createCategory, body);

    // Check if category already exists
    const existingCategory = await withErrorHandling(async () => {
      return await prisma.category.findUnique({
        where: { catName: validatedData.catName }
      });
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DUPLICATE_ENTRY',
            message: 'Bu kategori adı zaten kullanımda',
            details: { field: 'catName', value: validatedData.catName }
          }
        },
        { status: 409 }
      );
    }

    // Create category
    const newCategory = await withErrorHandling(async () => {
      return await prisma.category.create({
        data: {
          catName: validatedData.catName,
          description: validatedData.description || null,
        },
      });
    });

    return createSuccessResponse(newCategory, 'Kategori başarıyla oluşturuldu', 201);
    
  } catch (error) {
    return handleApiError(error);
  }
}


export async function GET(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip, 50, 60000)) { // 50 requests per minute for GET
      return NextResponse.json(
        { success: false, error: { message: 'Çok fazla istek. Lütfen bir dakika bekleyin.' } },
        { status: 429 }
      );
    }

    const categories = await withErrorHandling(async () => {
      return await prisma.category.findMany({
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
          },
        },
        orderBy: {
          catName: 'asc'
        }
      });
    });
    
    return createSuccessResponse(categories, 'Kategoriler başarıyla getirildi');
    
  } catch (error) {
    return handleApiError(error);
  }
}

// Cache'i devre dışı bırak
export const dynamic = 'force-dynamic'
export const revalidate = 0
