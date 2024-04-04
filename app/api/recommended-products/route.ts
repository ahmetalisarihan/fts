import { NextResponse } from 'next/server';
import prisma from "@/libs/prismadb"; // Prisma istemcinizin içe aktarıldığını varsayarak

// **GET istekleri için adlandırılmış dışa aktarma (isteğe bağlı)**
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isRecommended: true, // Önerilen ürünlere göre filtreleme
      },
      orderBy: {
        createdAt: 'desc', // Oluşturma tarihine göre azalan şekilde sıralama
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Bir hata oluştu. Lütfen tekrar deneyin.' }, { status: 500 });
  }
}