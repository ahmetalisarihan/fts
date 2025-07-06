import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import { 
  handleApiError, 
  createSuccessResponse, 
  validateRequest, 
  withErrorHandling,
  schemas,
  checkRateLimit 
} from '@/utils/api-helpers';

// Kampanyaları listele
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

    const campaigns = await withErrorHandling(async () => {
      return await prisma.campaigns.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
          link: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    });
    
    return createSuccessResponse(campaigns, 'Kampanyalar başarıyla getirildi');
    
  } catch (error) {
    return handleApiError(error);
  }
}

// Yeni kampanya oluştur
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
    const validatedData = validateRequest(schemas.createCampaign, body);

    // Create campaign
    const newCampaign = await withErrorHandling(async () => {
      return await prisma.campaigns.create({
        data: {
          title: validatedData.title || null,
          imageUrl: validatedData.imageUrl,
          link: validatedData.link,
        },
      });
    });

    return createSuccessResponse(newCampaign, 'Kampanya başarıyla oluşturuldu', 201);
    
  } catch (error) {
    return handleApiError(error);
  }
}

// Kampanya sil
export async function DELETE(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip, 20, 60000)) { // 20 requests per minute
      return NextResponse.json(
        { success: false, error: { message: 'Çok fazla istek. Lütfen bir dakika bekleyin.' } },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: { message: 'ID gerekli.' } },
        { status: 400 }
      );
    }

    // Delete campaign from database
    await withErrorHandling(async () => {
      return await prisma.campaigns.delete({
        where: { id },
      });
    });

    return createSuccessResponse(null, 'Kampanya başarıyla silindi');
    
  } catch (error) {
    return handleApiError(error);
  }
}

// Cache'i devre dışı bırak
export const dynamic = 'force-dynamic'
export const revalidate = 0
