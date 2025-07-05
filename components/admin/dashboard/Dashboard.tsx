'use client';

import { useEffect, useState } from 'react';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';
import DebugDashboard from '../debug/DebugDashboard';
import { Package, FolderTree, Tags, Megaphone, TrendingUp, Users, ShoppingCart, DollarSign, Database, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;
  activeCampaigns: number;
  totalSales: number;
  totalUsers: number;
  totalOrders: number;
  revenue: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalBrands: 0,
    activeCampaigns: 0,
    totalSales: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Gerçek API'lerden veri çek
        const [productsRes, categoriesRes, brandsRes, campaignsRes] = await Promise.all([
          fetch('/api/products', { cache: 'no-store' }).catch(() => ({ ok: false })),
          fetch('/api/categories', { cache: 'no-store' }).catch(() => ({ ok: false })),
          fetch('/api/brands', { cache: 'no-store' }).catch(() => ({ ok: false })),
          fetch('/api/campaigns', { cache: 'no-store' }).catch(() => ({ ok: false })),
        ]);

        let productCount = 0;
        let categoryCount = 0;
        let brandCount = 0;
        let campaignCount = 0;

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          productCount = productsData.data?.length || 0;
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          categoryCount = categoriesData.data?.length || 0;
        }

        if (brandsRes.ok) {
          const brandsData = await brandsRes.json();
          brandCount = brandsData.data?.length || 0;
        }

        if (campaignsRes.ok) {
          const campaignsData = await campaignsRes.json();
          campaignCount = campaignsData.data?.length || 0;
        }

        setStats({
          totalProducts: productCount,
          totalCategories: categoryCount,
          totalBrands: brandCount,
          activeCampaigns: campaignCount,
          totalSales: 0, // E-ticaret sitesinde satış sistemi yok
          totalUsers: 0, // Kullanıcı sistemi henüz yok
          totalOrders: 0, // Sipariş sistemi yok
          revenue: 0, // Gelir sistemi yok
        });
      } catch (error) {
        console.error('Dashboard stats fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const refreshDashboard = () => {
    setLoading(true);
    // RecentActivity component'i kendi state'ini yönetiyor, burada sadece stats'i yeniliyoruz
    const fetchStats = async () => {
      try {
        const [productsRes, categoriesRes, brandsRes, campaignsRes] = await Promise.all([
          fetch('/api/products', { cache: 'no-store' }).catch(() => ({ ok: false })),
          fetch('/api/categories', { cache: 'no-store' }).catch(() => ({ ok: false })),
          fetch('/api/brands', { cache: 'no-store' }).catch(() => ({ ok: false })),
          fetch('/api/campaigns', { cache: 'no-store' }).catch(() => ({ ok: false })),
        ]);

        let productCount = 0, categoryCount = 0, brandCount = 0, campaignCount = 0;

        if (productsRes.ok) {
          const data = await productsRes.json();
          productCount = data.data?.length || 0;
        }
        if (categoriesRes.ok) {
          const data = await categoriesRes.json();
          categoryCount = data.data?.length || 0;
        }
        if (brandsRes.ok) {
          const data = await brandsRes.json();
          brandCount = data.data?.length || 0;
        }
        if (campaignsRes.ok) {
          const data = await campaignsRes.json();
          campaignCount = data.data?.length || 0;
        }

        setStats({
          totalProducts: productCount,
          totalCategories: categoryCount,
          totalBrands: brandCount,
          activeCampaigns: campaignCount,
          totalSales: 0,
          totalUsers: 0,
          totalOrders: 0,
          revenue: 0,
        });
      } catch (error) {
        console.error('Refresh error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  };

  const statsCards = [
    {
      title: 'Toplam Ürün',
      value: stats.totalProducts.toString(),
      icon: Package,
      description: 'Sistemdeki ürünler',
    },
    {
      title: 'Kategoriler',
      value: stats.totalCategories.toString(),
      icon: FolderTree,
      description: 'Ana kategoriler',
    },
    {
      title: 'Markalar',
      value: stats.totalBrands.toString(),
      icon: Tags,
      description: 'Kayıtlı markalar',
    },
    {
      title: 'Aktif Kampanyalar',
      value: stats.activeCampaigns.toString(),
      icon: Megaphone,
      description: 'Yayındaki kampanyalar',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            E-ticaret sitenizin genel durumu
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            E-ticaret sitenizin genel durumu ve istatistikleri
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={refreshDashboard}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
          <Button 
            variant={showDebug ? "default" : "outline"}
            onClick={() => setShowDebug(!showDebug)}
          >
            <Database className="h-4 w-4 mr-2" />
            {showDebug ? "Genel Bakış" : "Debug & Durum"}
          </Button>
        </div>
      </div>

      {!showDebug ? (
        <>
          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((card, index) => (
              <StatsCard key={index} {...card} />
            ))}
          </div>

          {/* Son Aktiviteler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity />
            
            {/* Hızlı Aksiyonlar */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4">Hızlı Aksiyonlar</h3>
              <div className="space-y-3">
                <a
                  href="/admin/products"
                  className="flex items-center p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <Package className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium">Ürün Yönetimi</span>
                </a>
                <a
                  href="/admin/categories"
                  className="flex items-center p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors"
                >
                  <FolderTree className="h-5 w-5 mr-3 text-secondary-foreground" />
                  <span className="font-medium">Kategori Yönetimi</span>
                </a>
                <a
                  href="/admin/brands"
                  className="flex items-center p-3 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors"
                >
                  <Tags className="h-5 w-5 mr-3 text-destructive" />
                  <span className="font-medium">Marka Yönetimi</span>
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <DebugDashboard />
      )}
    </div>
  );
}
