import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { catName, description } = body;

    if (!catName) {
      return NextResponse.json(
        { success: false, error: { message: 'Kategori adı gereklidir' } },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingCategory = await prisma.category.findUnique({
      where: { catName }
    });

    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: { message: 'Bu kategori adı zaten kullanımda' } },
        { status: 409 }
      );
    }

    // Create category
    const newCategory = await prisma.category.create({
      data: {
        catName,
        description: description || null,
      },
    });

    return NextResponse.json(
      { success: true, data: newCategory, message: 'Kategori başarıyla oluşturuldu' },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Category creation error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Kategori oluşturulamadı' } },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
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
    
    return NextResponse.json(
      { success: true, data: categories, message: 'Kategoriler başarıyla getirildi' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Categories fetch error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Kategoriler getirilemedi' } },
      { status: 500 }
    );
  }
}

// Cache'i devre dışı bırak
export const dynamic = 'force-dynamic'
export const revalidate = 0
