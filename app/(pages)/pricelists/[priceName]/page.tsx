import { TPriceList } from '@/app/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import prisma from '@/libs/prismadb';

const getPriceLists = async (priceName: string): Promise<TPriceList | undefined> => {
  try {
    // Server-side component'te doğrudan Prisma kullan
    const priceList = await prisma.priceList.findUnique({
      where: { priceName },
      include: {
        products: { 
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            imageUrl: true
          }
        }
      }
    });

    if (!priceList) {
      return undefined;
    }

    // Prisma'dan gelen veriyi TPriceList formatına dönüştür
    const formattedPriceList: TPriceList & { products?: any[] } = {
      id: priceList.id,
      priceName: priceList.priceName,
      price: priceList.price || undefined,
      pdfUrl: priceList.pdfUrl || '',
      createdAt: priceList.createdAt,
      updatedAt: priceList.updatedAt,
      products: priceList.products
    };

    return formattedPriceList;
  } catch (error) {
    console.error('Fiyat listesi yüklenirken bir hata oluştu:', error);
    return undefined;
  }
};

const PriceListPage = async ({ params }: { params: { priceName: string } }) => {
  const priceName = decodeURIComponent(params.priceName);
  const prices = await getPriceLists(priceName);

  if (!prices) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Fiyat Listesi Bulunamadı</h1>
          <p className="text-gray-600 mb-6">Aradığınız fiyat listesi mevcut değil.</p>
          <Link href="/fiyat-listeleri">
            <Button variant="outline">Fiyat Listelerine Dön</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {prices.priceName}
        </h1>
        <p className="text-gray-600 mb-6">Fiyat Listesi Detayları</p>
        
        {prices.pdfUrl && (
          <div className="bg-white border rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">PDF Dosyası</h2>
                <Link href={prices.pdfUrl} target='_blank'>
                  <Button className="w-full sm:w-auto">
                    Fiyat Listesini Görüntüle
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                {prices.createdAt && (
                  <div className="text-center sm:text-left">
                    <p className="font-medium">Oluşturulma Tarihi</p>
                    <p>{new Date(prices.createdAt).toLocaleDateString('tr-TR')}</p>
                  </div>
                )}
                {prices.updatedAt && (
                  <div className="text-center sm:text-left">
                    <p className="font-medium">Güncelleme Tarihi</p>
                    <p>{new Date(prices.updatedAt).toLocaleDateString('tr-TR')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {(prices as any).products && (prices as any).products.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Bu Fiyat Listesindeki Ürünler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(prices as any).products.map((product: any) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.slug}`}
                  className="block p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
                >
                  {product.imageUrl && (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  {product.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default PriceListPage;