'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

interface Campaign {
    id: string;
    title: string;
    imageUrl: string;
}

const DeleteCampaign: React.FC = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Kampanyaları getir
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch('/api/campaigns', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Kampanyalar getirilemedi.');
                }
                const data = await response.json();
                setCampaigns(data.data);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchCampaigns();
    }, []);

    // Kampanya öğesini sil
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/campaigns?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Kampanya silinemedi.');
            }

            // Silinen kampanyayı listeden kaldır
            setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Kampanyaları Yönet</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {campaigns.length === 0 ? (
                <p>Henüz kampanya öğesi bulunmuyor.</p>
            ) : (
                <ul className="space-y-4">
                    {campaigns.map((campaign) => (
                        <li
                            key={campaign.id}
                            className="flex justify-between items-center border-b pb-2"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={campaign.imageUrl}
                                    alt={campaign.title}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <p className="text-blue-500">{campaign.title}</p>
                            </div>
                            <Button
                                variant="destructive"
                                onClick={() => handleDelete(campaign.id)}
                            >
                                Sil
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DeleteCampaign;