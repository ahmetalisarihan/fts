import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function GET(req: NextRequest) {
  try {
    console.log('Testing database connection...');
    
    // Test database connection
    const productCount = await prisma.product.count();
    const brandCount = await prisma.brand.count();
    const categoryCount = await prisma.category.count();
    
    // Get a few sample records
    const sampleProducts = await prisma.product.findMany({
      take: 3,
      select: {
        id: true,
        name: true,
        slug: true,
        brandName: true,
        catName: true,
      }
    });
    
    const sampleBrands = await prisma.brand.findMany({
      take: 3,
      select: {
        id: true,
        brandName: true,
        description: true,
      }
    });
    
    console.log('Database test results:', {
      productCount,
      brandCount,
      categoryCount,
      sampleProducts,
      sampleBrands
    });
    
    return NextResponse.json({
      success: true,
      data: {
        counts: {
          products: productCount,
          brands: brandCount,
          categories: categoryCount,
        },
        samples: {
          products: sampleProducts,
          brands: sampleBrands,
        }
      }
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: {
        message: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
