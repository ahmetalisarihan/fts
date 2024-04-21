'use client'
import { TPriceList } from '@/app/types';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const getPriceLists = async (priceName: string): Promise<TPriceList | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/pricelists/${priceName}`);
    if (res.ok) {
      const priceList = await res.json();
      return priceList;
    }
  } catch (error) {
    console.error('Fiyat listesi yüklenirken bir hata oluştu:', error);
  }
  return null;
};

const PriceListPage = async ({ params }: { params: { priceName: string } }) => {
const priceName = params.priceName;
const prices = await getPriceLists(priceName);

return (
  <div>
    <h1 className='font-bold text-xl py-2'>
      <span>Fiyat Listesi: </span>{" "}
      {decodeURIComponent(priceName)}
    </h1>
    {prices?.pdfUrl && (
      <Link href={prices.pdfUrl} >
<p>{prices.priceName}</p>
      </Link>
    )}
  </div>
);

}

export default PriceListPage;
