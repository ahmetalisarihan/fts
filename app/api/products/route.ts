import { NextRequest, NextResponse } from 'next/server'
import { CacheManager } from '@/utils/cache'
import prisma from "@/libs/prismadb";
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

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip, 10, 60000)) { // 10 requests per minute
      return NextResponse.json(
        { success: false, error: { message: 'Çok fazla istek. Lütfen bir dakita bekleyin.' } },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    
    // Map form fields to expected schema fields
    const mappedData = {
      name: body.name,
      slug: body.name?.toLowerCase().replace(/ /g, '-') || '',
      description: body.description,
      imageUrl: body.imageUrl,
      publicId: body.publicId || `default_${Date.now()}`,
      brandName: body.selectedBrand,
      catName: body.selectedCategory,
      subcatName: body.selectedSubcategory,
      priceName: body.selectedPriceList,
      isRecommended: body.isRecommended || false,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      metaKeywords: body.metaKeywords,
    };

    const validatedData = validateRequest(schemas.createProduct, mappedData);

    // Check if slug already exists
    const existingProduct = await withErrorHandling(async () => {
      return await prisma.product.findUnique({
        where: { slug: validatedData.slug }
      });
    });

    if (existingProduct) {
      throw new AppError(
        ErrorCode.DUPLICATE_ENTRY,
        'Bu ürün adı zaten kullanımda',
        409,
        { field: 'name', value: validatedData.name }
      );
    }

    // Verify that category, subcategory, and brand exist
    const [category, subcategory, brand] = await Promise.all([
      validatedData.catName ? withErrorHandling(() => 
        prisma.category.findUnique({ where: { catName: validatedData.catName } })
      ) : null,
      validatedData.subcatName ? withErrorHandling(() => 
        prisma.subcategory.findFirst({ 
          where: { 
            subcatName: validatedData.subcatName,
            catName: validatedData.catName 
          } 
        })
      ) : null,
      validatedData.brandName ? withErrorHandling(() => 
        prisma.brand.findUnique({ where: { brandName: validatedData.brandName } })
      ) : null
    ]);

    if (validatedData.catName && !category) {
      throw new AppError(
        ErrorCode.NOT_FOUND,
        'Seçilen kategori bulunamadı',
        400,
        { field: 'selectedCategory', value: validatedData.catName }
      );
    }

    if (validatedData.subcatName && !subcategory) {
      throw new AppError(
        ErrorCode.NOT_FOUND,
        'Seçilen alt kategori bulunamadı',
        400,
        { field: 'selectedSubcategory', value: validatedData.subcatName }
      );
    }

    if (validatedData.brandName && !brand) {
      throw new AppError(
        ErrorCode.NOT_FOUND,
        'Seçilen marka bulunamadı',
        400,
        { field: 'selectedBrand', value: validatedData.brandName }
      );
    }

    // Create product
    const newProduct = await withErrorHandling(async () => {
      return await prisma.product.create({
        data: validatedData,
      });
    });
    
    // Cache'leri temizle
    await CacheManager.invalidateProductCaches();
    
    return createSuccessResponse(newProduct, 'Ürün başarıyla oluşturuldu', 201);
    
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

    const products = await withErrorHandling(async () => {
      return await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          imageUrl: true,
          brandName: true,
          catName: true,
          subcatName: true,
          priceName: true,
          isRecommended: true,
          metaTitle: true,
          metaDescription: true,
          metaKeywords: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    });
    
    return createSuccessResponse(products, 'Ürünler başarıyla getirildi');
    
  } catch (error) {
    return handleApiError(error);
  }
}

// Cache'i devre dışı bırak
export const dynamic = 'force-dynamic'
export const revalidate = 0

