import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Her istek için yeni veri al
export const revalidate = 0; // Önbelleğe almayı devre dışı bırak

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params;

    const product = await prisma.product.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!product) {
      return NextResponse.json({ message: "Ürün bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Ürün getirilirken hata oluştu:", error);
    return NextResponse.json(
      { message: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}

// PUT ve DELETE işlemleri /api/products/[id] route'una taşındı
// Bu route sadece frontend için slug ile ürün getirme işlemi yapar
