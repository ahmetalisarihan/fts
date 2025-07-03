'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { OptimizedAPI } from '@/utils/api-optimization';

export type TCampaigns = {
  id: string;
  title?: string;
  imageUrl: string;
    link: string;
};

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState<TCampaigns[]>([]);
  const [error, setError] = useState('');

  const fetchCampaigns = async () => {
    try {
      const data = await OptimizedAPI.getCampaigns();
      setCampaigns(data);
    } catch {
      setError('Kampanyalar yüklenemedi.');
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:justify-center md:justify-center items-center justify-between my-3 gap-3">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105"
          >
            <div className="flex items-center justify-center border rounded-md">
                <Link href={campaign.link}>
              <Image
                className="object-contain h-40 w-96"
                src={campaign.imageUrl}
                alt={campaign.title || 'Kampanya'}
                width={384}
                height={160}
              />
              </Link>
            </div>
            <h3 className="text-center mt-2 font-semibold">{campaign.title}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default CampaignsList;