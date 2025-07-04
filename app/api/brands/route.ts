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
    const validatedData = validateRequest(schemas.createBrand, body);

    // Check if brand already exists
    const existingBrand = await withErrorHandling(async () => {
      return await prisma.brand.findUnique({
        where: { brandName: validatedData.brandName }
      });
    });

    if (existingBrand) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DUPLICATE_ENTRY',
            message: 'Bu marka adı zaten kullanımda',
            details: { field: 'brandName', value: validatedData.brandName }
          }
        },
        { status: 409 }
      );
    }

    // Create brand
    const newBrand = await withErrorHandling(async () => {
      return await prisma.brand.create({
        data: validatedData,
      });
    });

    return createSuccessResponse(newBrand, 'Marka başarıyla oluşturuldu', 201);
    
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

    const brands = await withErrorHandling(async () => {
      return await prisma.brand.findMany({
        orderBy: {
          brandName: 'asc'
        }
      });
    });
    
    return createSuccessResponse(brands, 'Markalar başarıyla getirildi');
    
  } catch (error) {
    return handleApiError(error);
  }
}

// Cache'i devre dışı bırak
export const dynamic = 'force-dynamic'
export const revalidate = 0
