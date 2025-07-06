import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { brandName, description } = body;

    if (!brandName) {
      return NextResponse.json(
        { success: false, error: { message: 'Marka adı gereklidir' } },
        { status: 400 }
      );
    }

    // Check if brand already exists
    const existingBrand = await prisma.brand.findUnique({
      where: { brandName }
    });

    if (existingBrand) {
      return NextResponse.json(
        { success: false, error: { message: 'Bu marka adı zaten kullanımda' } },
        { status: 409 }
      );
    }

    // Create brand
    const newBrand = await prisma.brand.create({
      data: {
        brandName,
        description: description || null,
      },
    });

    return NextResponse.json(
      { success: true, data: newBrand, message: 'Marka başarıyla oluşturuldu' },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Brand creation error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Marka oluşturulamadı' } },
      { status: 500 }
    );
  }
}

export async function GET(_req: NextRequest) {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
          }
        }
      },
      orderBy: {
        brandName: 'asc'
      }
    });
    
    return NextResponse.json(
      { success: true, data: brands, message: 'Markalar başarıyla getirildi' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Brands fetch error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Markalar getirilemedi' } },
      { status: 500 }
    );
  }
}

// Cache'i devre dışı bırak
export const dynamic = 'force-dynamic'
export const revalidate = 0
