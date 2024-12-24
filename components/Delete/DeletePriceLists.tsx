'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

interface PriceList {
    priceName: string;
    pdfUrl: string;
}

const DeletePriceLists: React.FC = () => {
    const [priceLists, setPriceLists] = useState<PriceList[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch existing price lists
    useEffect(() => {
        const fetchPriceLists = async () => {
            try {
                const response = await fetch('/api/pricelists', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Fiyat listeleri alınamadı.');
                }
                const data: PriceList[] = await response.json();
                setPriceLists(data);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchPriceLists();
    }, []);

    // Delete a specific price list
    const handleDelete = async (priceName: string | undefined) => {
        if (!priceName) {
            console.error("Price list priceName is undefined.");
            return;
        }

        try {
            const response = await fetch(`/api/pricelists/${priceName}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Fiyat listesi silinemedi.');
            }
            setPriceLists(priceLists.filter((list) => list.priceName !== priceName));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Fiyat Listelerini Yönet</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {priceLists.length === 0 ? (
                <p>Henüz fiyat listesi bulunmuyor.</p>
            ) : (
                <ul className="space-y-4">
                    {priceLists.map((list) => (
                        <li
                            key={list.priceName}
                            className="flex justify-between items-center border-b pb-2"
                        >
                            <span>{list.priceName}</span>
                            <Button
                                variant="destructive"
                                onClick={() => handleDelete(list.priceName)}
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

export default DeletePriceLists;