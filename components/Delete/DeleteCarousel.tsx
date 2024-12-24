'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

interface Carousel {
    id: string;
    imageUrl: string;
    link: string;
}

const DeleteCarousel: React.FC = () => {
    const [carousels, setCarousels] = useState<Carousel[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Carousel verilerini getir
    useEffect(() => {
        const fetchCarousels = async () => {
            try {
                const response = await fetch('/api/carousels', { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Carouseller getirilemedi.');
                }
                const data: Carousel[] = await response.json();
                setCarousels(data);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchCarousels();
    }, []);

    // Carousel öğesini sil
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/carousels?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Carousel silinemedi.');
            }

            // Silinen carousel'i listeden kaldır
            setCarousels((prev) => prev.filter((carousel) => carousel.id !== id));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Carousel Öğelerini Yönet</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {carousels.length === 0 ? (
                <p>Henüz carousel öğesi bulunmuyor.</p>
            ) : (
                <ul className="space-y-4">
                    {carousels.map((carousel) => (
                        <li
                            key={carousel.id}
                            className="flex justify-between items-center border-b pb-2"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={carousel.imageUrl}
                                    alt="carousel"
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <a
                                    href={carousel.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    {carousel.link}
                                </a>
                            </div>
                            <Button
                                variant="destructive"
                                onClick={() => handleDelete(carousel.id)}
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

export default DeleteCarousel;