import { NextResponse } from 'next/server';
import prisma from "@/libs/prismadb";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isRecommended: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Cache headers ekle
    const response = NextResponse.json(products);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Bir hata oluştu. Lütfen tekrar deneyin.' }, { status: 500 });
  }
}

// Cache'i devre dışı bırak
export const dynamic = 'force-dynamic'
export const revalidate = 0
