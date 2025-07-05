import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { sessionClaims } = auth();
    
    if (sessionClaims?.metadata.role !== "admin") {
      return NextResponse.json(
        { success: false, error: { message: 'Yetkisiz erişim' } },
        { status: 403 }
      );
    }

    const { categoryIds } = await req.json();

    if (!Array.isArray(categoryIds)) {
      return NextResponse.json(
        { success: false, error: { message: 'Geçersiz kategori ID listesi' } },
        { status: 400 }
      );
    }

    // Bulk update kategorilerinin sırasını güncelle
    const updatePromises = categoryIds.map((id: string, index: number) => {
      return prisma.category.update({
        where: { id },
        data: { order: index + 1 }
      });
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
      { 
        success: true, 
        data: { updatedCount: categoryIds.length }, 
        message: 'Kategori sıralaması başarıyla güncellendi' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Category reorder error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Sıralama güncellenemedi' } },
      { status: 500 }
    );
  }
}
