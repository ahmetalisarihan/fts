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

    const { subcategoryIds } = await req.json();

    if (!Array.isArray(subcategoryIds)) {
      return NextResponse.json(
        { success: false, error: { message: 'Geçersiz alt kategori ID listesi' } },
        { status: 400 }
      );
    }

    // Bulk update alt kategorilerinin sırasını güncelle
    const updatePromises = subcategoryIds.map((id: string, index: number) => {
      return prisma.subcategory.update({
        where: { id },
        data: { order: index + 1 }
      });
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
      { 
        success: true, 
        data: { updatedCount: subcategoryIds.length }, 
        message: 'Alt kategori sıralaması başarıyla güncellendi' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Subcategory reorder error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Alt kategori sıralaması güncellenemedi' } },
      { status: 500 }
    );
  }
}
