"use client"
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PriceListPage: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const priceName = pathname.split('/').pop(); 
      const pdfUrl = `https://drive.google.com/file/d/1xR6PRqO3-WEYyazTStGb_FEDD3Yh2flv/view?usp=drive_link`; // PDF dosyasının URL'si
      window.open(pdfUrl,);
    }
  }, [pathname]);

    return null;
};

export default PriceListPage;