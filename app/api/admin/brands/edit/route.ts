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
    const { id, brandName, description } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: { message: 'Marka ID gerekli' } },
        { status: 400 }
      );
    }

    if (!brandName) {
      return NextResponse.json(
        { success: false, error: { message: 'Marka adı gerekli' } },
        { status: 400 }
      );
    }

    // Aynı isimde başka marka var mı kontrol et
    const existingBrand = await prisma.brand.findFirst({
      where: { 
        brandName: brandName,
        NOT: { id: id }
      }
    });

    if (existingBrand) {
      return NextResponse.json(
        { success: false, error: { message: 'Bu marka adı zaten kullanımda' } },
        { status: 409 }
      );
    }

    const updatedBrand = await prisma.brand.update({
      where: { id },
      data: {
        brandName,
        description
      },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
          }
        }
      }
    });

    return NextResponse.json(
      { 
        success: true, 
        data: updatedBrand, 
        message: 'Marka başarıyla güncellendi' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Brand update error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Marka güncellenemedi' } },
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
        { success: false, error: { message: 'Marka ID gerekli' } },
        { status: 400 }
      );
    }

    // Ürünler var mı kontrol et
    const products = await prisma.product.findMany({
      where: { 
        brand: { id: id }
      }
    });

    if (products.length > 0) {
      return NextResponse.json(
        { success: false, error: { message: 'Bu markada ürünler var, önce onları başka markaya taşıyın' } },
        { status: 400 }
      );
    }

    await prisma.brand.delete({
      where: { id }
    });

    return NextResponse.json(
      { 
        success: true, 
        data: { deletedId: id }, 
        message: 'Marka başarıyla silindi' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Brand delete error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Marka silinemedi' } },
      { status: 500 }
    );
  }
}
