import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(req: Request, { params }: { params: { priceName: string } }) {
  try {
    const priceName = params.priceName; // URL'den fiyat adı parametresini al
    const priceList = await prisma.priceList.findUnique({ // Veritabanında eşleşen fiyat listesini bul
      where: { priceName },
      include: {
        products: { orderBy: { createdAt: 'desc' } }, // İlişkili ürünleri al ve oluşturulma tarihine göre sırala
      },
    });

    if (!priceList) { // Fiyat listesi bulunamadıysa 404 hatası döndür
      return NextResponse.json({ message: 'Fiyat listesi bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(priceList); // Fiyat listesini JSON formatında döndür
  } catch (error) { // Hata oluşursa 500 hatası döndür
    console.error(error); // Hatayı konsola yaz
    return NextResponse.json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." }, { status: 500 });
  }
}