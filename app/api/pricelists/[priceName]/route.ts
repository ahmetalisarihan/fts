import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(_req: Request, { params }: { params: { priceName: string } }) {
  try {
    const priceName = decodeURIComponent(params.priceName); // URL'den fiyat adı parametresini al ve decode et
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

export async function DELETE(_req: Request, { params }: { params: { priceName: string } }) {
  const priceName = decodeURIComponent(params.priceName);  // URL'den priceName parametresini al ve decode et

  if (!priceName) {  // priceName yoksa hata döndür
    return NextResponse.json({ error: 'priceName alanı gereklidir.' }, { status: 400 });
  }

  try {
    // priceName'e göre fiyat listesini sil
    await prisma.priceList.delete({
      where: { priceName },
    });

    // Cache'leri temizle
    const { CacheManager } = await import('@/utils/cache');
    await CacheManager.invalidatePriceListCaches();

    return NextResponse.json({ message: 'Fiyat listesi başarıyla silindi.' });
  } catch (error) {  // Silme işlemi sırasında hata oluşursa
    console.error(error);  // Hatayı konsola yaz
    return NextResponse.json(
      { error: 'Fiyat listesi silinirken bir hata oluştu.', details: error },
      { status: 500 }
    );
  }
}