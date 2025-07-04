'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { OptimizedAPI } from '@/utils/api-optimization';
import { TCampaigns } from '@/app/types';

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState<TCampaigns[]>([]);
  const [error, setError] = useState('');

  const fetchCampaigns = async () => {
    try {
      const response = await OptimizedAPI.getCampaigns();
      setCampaigns(Array.isArray(response) ? response : []);
    } catch {
      setError('Kampanyalar yüklenemedi.');
      setCampaigns([]);
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
              {campaign.link ? (
                <Link href={campaign.link}>
                  <Image
                    className="object-contain h-40 w-96"
                    src={campaign.imageUrl}
                    alt={campaign.title || 'Kampanya'}
                    width={384}
                    height={160}
                  />
                </Link>
              ) : (
                <Image
                  className="object-contain h-40 w-96"
                  src={campaign.imageUrl}
                  alt={campaign.title || 'Kampanya'}
                  width={384}
                  height={160}
                />
              )}
            </div>
            <h3 className="text-center mt-2 font-semibold">{campaign.title}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default CampaignsList;