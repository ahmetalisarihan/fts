import { TPriceList } from '@/app/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const getPriceLists = async (priceName: string): Promise<TPriceList | undefined> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/pricelists/${priceName}`);
    if (res.ok) {
      const priceList = await res.json();
      return priceList;
    }
  } catch (error) {
    console.error('Fiyat listesi yüklenirken bir hata oluştu:', error);
  }
  return undefined;
};

const PriceListPage = async ({ params }: { params: { priceName: string } }) => {
  const priceName = params.priceName;
  const prices = await getPriceLists(priceName);

  if (!prices) {
    return <div>Fiyat listesi bulunamadı.</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-xl py-2">
        <span>Fiyat Listesi: </span> {decodeURIComponent(priceName)}
      </h1>
      <h2 className='mt-2'>Marka: <span className='text-blue-500'>{decodeURIComponent(priceName)}</span></h2>
      {prices.pdfUrl && (
        <div className='sm:flex flex-row items-center justify-center sm:justify-between mt-4 border rounded-md px-2 py-5'>
          <Link href={prices.pdfUrl} target='_blank'><Button>Fiyat Listesini Görüntüle</Button></Link>
          <p className='flex flex-col'>Oluşturulma Tarihi <span>{prices.createdAt ? new Date(prices.createdAt).toLocaleDateString() : ''}</span></p>
          <p className='flex flex-col'>Güncelleme Tarihi <span>{prices.updatedAt ? new Date(prices.updatedAt).toLocaleDateString() : ''}</span></p>
        </div>
      )}
    </div>
  );
}


export default PriceListPage;