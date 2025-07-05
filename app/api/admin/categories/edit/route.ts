import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/libs/prismadb";

export async function PATCH(req: NextRequest) {
  try {
    const { sessionClaims } = auth();
    
    if (sessionClaims?.metadata.role !== "admin") {
      return NextResponse.json(
        { success: false, error: { message: 'Yetkisiz erişim' } },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { id, catName, description } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: { message: 'Kategori ID gerekli' } },
        { status: 400 }
      );
    }

    // Aynı isimde başka kategori var mı kontrol et
    const existingCategory = await prisma.category.findFirst({
      where: { 
        catName: catName,
        NOT: { id: id }
      }
    });

    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: { message: 'Bu kategori adı zaten kullanımda' } },
        { status: 409 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        catName,
        description
      }
    });

    return NextResponse.json(
      { 
        success: true, 
        data: updatedCategory, 
        message: 'Kategori başarıyla güncellendi' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Category update error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Kategori güncellenemedi' } },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { sessionClaims } = auth();
    
    if (sessionClaims?.metadata.role !== "admin") {
      return NextResponse.json(
        { success: false, error: { message: 'Yetkisiz erişim' } },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: { message: 'Kategori ID gerekli' } },
        { status: 400 }
      );
    }

    // Önce alt kategoriler var mı kontrol et
    const subcategories = await prisma.subcategory.findMany({
      where: { 
        category: { id: id }
      }
    });

    if (subcategories.length > 0) {
      return NextResponse.json(
        { success: false, error: { message: 'Bu kategorinin alt kategorileri var, önce onları silin' } },
        { status: 400 }
      );
    }

    // Ürünler var mı kontrol et
    const products = await prisma.product.findMany({
      where: { 
        category: { id: id }
      }
    });

    if (products.length > 0) {
      return NextResponse.json(
        { success: false, error: { message: 'Bu kategoride ürünler var, önce onları başka kategoriye taşıyın' } },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id }
    });

    return NextResponse.json(
      { 
        success: true, 
        data: { deletedId: id }, 
        message: 'Kategori başarıyla silindi' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Category delete error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Kategori silinemedi' } },
      { status: 500 }
    );
  }
}
