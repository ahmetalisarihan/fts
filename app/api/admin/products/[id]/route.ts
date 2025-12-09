import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import { handleApiError, createSuccessResponse } from '@/utils/api-helpers';

// Ürün güncelleme (Admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Türkçe karakterleri URL-safe hale getiren fonksiyon
    const createSlug = (text: string): string => {
      return text
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    };

    const updateData: any = {
      name: body.name,
      slug: body.name ? createSlug(body.name) : undefined,
      description: body.description || null,
      technicalSpecs: body.technicalSpecs || null,
      isRecommended: body.isRecommended || false,
      imageUrl: body.imageUrl || null,
      brandName: body.selectedBrand || null,
      catName: body.selectedCategory || null,
      subcatName: body.selectedSubcategory || null,
      priceName: body.selectedPriceList || null,
      metaTitle: body.metaTitle || null,
      metaDescription: body.metaDescription || null,
      metaKeywords: body.metaKeywords || null,
      price: body.price || null,
      currency: body.currency || 'TRY',
      sku: body.sku || null,
      stock: body.stock || null,
    };

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    // Cache'leri temizle
    const { shouldInvalidateCache } = await import('@/utils/cache-strategy');
    if (shouldInvalidateCache('product_update')) {
      const { CacheManager } = await import('@/utils/cache');
      await CacheManager.invalidateProductCaches();
    }

    return createSuccessResponse(updatedProduct, 'Ürün başarıyla güncellendi');
  } catch (error) {
    console.error('Product update error:', error);
    return handleApiError(error);
  }
}

// Ürün silme (Admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.product.delete({
      where: { id },
    });

    // Cache'leri temizle
    const { shouldInvalidateCache } = await import('@/utils/cache-strategy');
    if (shouldInvalidateCache('product_delete')) {
      const { CacheManager } = await import('@/utils/cache');
      await CacheManager.invalidateProductCaches();
    }

    return createSuccessResponse(null, 'Ürün başarıyla silindi');
  } catch (error) {
    console.error('Product delete error:', error);
    return handleApiError(error);
  }
}