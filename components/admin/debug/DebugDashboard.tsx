'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Database, AlertCircle, CheckCircle } from 'lucide-react';
import LoadingSpinner from '../shared/LoadingSpinner';

interface DebugData {
  counts: {
    products: number;
    brands: number;
    categories: number;
  };
  samples: {
    products: any[];
    brands: any[];
  };
}

export default function DebugDashboard() {
  const [debugData, setDebugData] = useState<DebugData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDebugData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/test-db', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Debug data:', data);
        setDebugData(data.data);
      } else {
        const errorData = await response.json();
        setError(errorData.error?.message || 'Veri alınamadı');
      }
    } catch (err) {
      console.error('Debug fetch error:', err);
      setError('Network hatası');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebugData();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" text="Veritabanı durumu kontrol ediliyor..." className="py-12" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Debug Dashboard</h2>
          <p className="text-muted-foreground">Veritabanı durumu ve veri kontrolü</p>
        </div>
        <Button onClick={fetchDebugData} disabled={loading}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Yenile
        </Button>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertCircle className="h-5 w-5 mr-2" />
              Hata
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {debugData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Veri Sayıları */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Veri Sayıları
              </CardTitle>
              <CardDescription>Veritabanındaki toplam kayıt sayıları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Ürünler:</span>
                <Badge variant={debugData.counts.products > 0 ? 'default' : 'secondary'}>
                  {debugData.counts.products}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Markalar:</span>
                <Badge variant={debugData.counts.brands > 0 ? 'default' : 'secondary'}>
                  {debugData.counts.brands}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Kategoriler:</span>
                <Badge variant={debugData.counts.categories > 0 ? 'default' : 'secondary'}>
                  {debugData.counts.categories}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Örnek Ürünler */}
          <Card>
            <CardHeader>
              <CardTitle>Örnek Ürünler</CardTitle>
              <CardDescription>İlk 3 ürün kaydı</CardDescription>
            </CardHeader>
            <CardContent>
              {debugData.samples.products.length > 0 ? (
                <div className="space-y-2">
                  {debugData.samples.products.map((product, index) => (
                    <div key={product.id} className="p-2 bg-muted rounded text-sm">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-muted-foreground">
                        {product.brandName} • {product.catName}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Ürün bulunamadı</p>
              )}
            </CardContent>
          </Card>

          {/* Örnek Markalar */}
          <Card>
            <CardHeader>
              <CardTitle>Örnek Markalar</CardTitle>
              <CardDescription>İlk 3 marka kaydı</CardDescription>
            </CardHeader>
            <CardContent>
              {debugData.samples.brands.length > 0 ? (
                <div className="space-y-2">
                  {debugData.samples.brands.map((brand, index) => (
                    <div key={brand.id} className="p-2 bg-muted rounded text-sm">
                      <div className="font-medium">{brand.brandName}</div>
                      <div className="text-muted-foreground">
                        {brand.description || 'Açıklama yok'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Marka bulunamadı</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {debugData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Durum Özeti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">DB Bağlantısı:</span>
                <Badge className="ml-2" variant="default">Aktif</Badge>
              </div>
              <div>
                <span className="font-medium">Toplam Veri:</span>
                <Badge className="ml-2" variant="secondary">
                  {debugData.counts.products + debugData.counts.brands + debugData.counts.categories}
                </Badge>
              </div>
              <div>
                <span className="font-medium">API Status:</span>
                <Badge className="ml-2" variant="default">Çalışıyor</Badge>
              </div>
              <div>
                <span className="font-medium">Cache Status:</span>
                <Badge className="ml-2" variant="outline">Devre Dışı</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
