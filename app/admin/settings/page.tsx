'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface RevalidationResult {
    success: boolean;
    message: string;
    timestamp: string;
    revalidated?: {
        paths: string[];
        tags: string[];
    };
}

const AdminSettings = () => {
    const [loading, setLoading] = useState<string | null>(null);
    const [results, setResults] = useState<Record<string, RevalidationResult>>({});

    const revalidateCache = async (type: string, paths: string[], tags: string[] = []) => {
        setLoading(type);

        try {
            const response = await fetch('/api/revalidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: 'fts-cache-revalidate-2024',
                    paths,
                    tags
                }),
            });

            const result = await response.json();
            setResults(prev => ({
                ...prev,
                [type]: result
            }));
        } catch (error) {
            setResults(prev => ({
                ...prev,
                [type]: {
                    success: false,
                    message: 'Güncelleme başarısız',
                    timestamp: new Date().toISOString()
                }
            }));
        } finally {
            setLoading(null);
        }
    };

    const cacheActions = [
        {
            id: 'homepage',
            title: 'Ana Sayfa',
            description: 'Ana sayfa cache\'ini temizle',
            paths: ['/'],
            badge: '6 saat ISR'
        },
        {
            id: 'products',
            title: 'Ürünler',
            description: 'Tüm ürün sayfalarını güncelle',
            paths: ['/yapi-malzemeleri'],
            badge: '4 saat ISR'
        },
        {
            id: 'pricelists',
            title: 'Fiyat Listeleri',
            description: 'Fiyat listesi sayfalarını güncelle',
            paths: ['/fiyat-listeleri'],
            badge: '8 saat ISR'
        },
        {
            id: 'all',
            title: 'Tüm Site',
            description: 'Tüm sayfaları güncelle (dikkatli kullan)',
            paths: ['/', '/yapi-malzemeleri', '/fiyat-listeleri'],
            badge: 'Tümü'
        }
    ];

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Admin Ayarları</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Site cache yönetimi ve ISR kontrolü
                </p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <RefreshCw className="h-5 w-5" />
                            Cache Yönetimi
                        </CardTitle>
                        <CardDescription>
                            ISR (Incremental Static Regeneration) ile cache kontrolü.
                            Free Plan dostu ayarlarla optimize edilmiştir.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            {cacheActions.map((action) => (
                                <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold">{action.title}</h3>
                                            <Badge variant="secondary">{action.badge}</Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {action.description}
                                        </p>
                                        {results[action.id] && (
                                            <div className="mt-2 flex items-center gap-2 text-sm">
                                                {results[action.id].success ? (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                                )}
                                                <span className={results[action.id].success ? 'text-green-600' : 'text-red-600'}>
                                                    {results[action.id].message}
                                                </span>
                                                <span className="text-gray-500">
                                                    {new Date(results[action.id].timestamp).toLocaleTimeString('tr-TR')}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        onClick={() => revalidateCache(action.id, action.paths)}
                                        disabled={loading === action.id}
                                        variant={action.id === 'all' ? 'destructive' : 'default'}
                                    >
                                        {loading === action.id ? (
                                            <RefreshCw className="h-4 w-4 animate-spin" />
                                        ) : (
                                            'Güncelle'
                                        )}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>ISR Ayarları</CardTitle>
                        <CardDescription>
                            Mevcut Incremental Static Regeneration ayarları
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 text-sm">
                            <div className="flex justify-between">
                                <span>Ana Sayfa:</span>
                                <Badge>6 saat (21600s)</Badge>
                            </div>
                            <div className="flex justify-between">
                                <span>Ürün Sayfaları:</span>
                                <Badge>4 saat (14400s)</Badge>
                            </div>
                            <div className="flex justify-between">
                                <span>Fiyat Listeleri:</span>
                                <Badge>8 saat (28800s)</Badge>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                            Bu ayarlar Vercel Free Plan limitlerini aşmayacak şekilde optimize edilmiştir.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminSettings;