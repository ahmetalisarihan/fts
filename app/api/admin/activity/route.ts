import prisma from '@/libs/prismadb';

interface Activity {
  id: string;
  type: 'product' | 'brand' | 'category' | 'campaign';
  action: string;
  title: string;
  description: string;
  timestamp: Date;
  user: string;
}

export async function GET() {
  try {
    console.log('Fetching admin activity...');
    
    // Son eklenen ürünleri getir
    const recentProducts = await prisma.product.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        brandName: true,
        catName: true,
        createdAt: true,
      }
    });

    // Son eklenen markaları getir
    const recentBrands = await prisma.brand.findMany({
      take: 2,
      orderBy: {
        id: 'desc'
      },
      select: {
        id: true,
        brandName: true,
      }
    });

    // Son eklenen kategorileri getir
    const recentCategories = await prisma.category.findMany({
      take: 2,
      orderBy: {
        id: 'desc'
      },
      select: {
        id: true,
        catName: true,
      }
    });

    // Son kampanyaları getir
    const recentCampaigns = await prisma.campaigns.findMany({
      take: 2,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
      }
    });

    // Aktiviteleri birleştir ve sırala
    const activities: Activity[] = [];

    // Ürün aktiviteleri
    recentProducts.forEach(product => {
      activities.push({
        id: `product-${product.id}`,
        type: 'product',
        action: 'created',
        title: 'Yeni Ürün Eklendi',
        description: `${product.name} ürünü eklendi`,
        timestamp: product.createdAt,
        user: 'Admin',
      });
    });

    // Marka aktiviteleri
    recentBrands.forEach(brand => {
      activities.push({
        id: `brand-${brand.id}`,
        type: 'brand',
        action: 'created',
        title: 'Yeni Marka Eklendi',
        description: `${brand.brandName} markası eklendi`,
        timestamp: new Date(), // Brand'de createdAt yok, şimdilik current time
        user: 'Admin',
      });
    });

    // Kategori aktiviteleri
    recentCategories.forEach(category => {
      activities.push({
        id: `category-${category.id}`,
        type: 'category',
        action: 'created',
        title: 'Yeni Kategori Eklendi',
        description: `${category.catName} kategorisi eklendi`,
        timestamp: new Date(), // Category'de createdAt yok, şimdilik current time
        user: 'Admin',
      });
    });

    // Kampanya aktiviteleri
    recentCampaigns.forEach(campaign => {
      activities.push({
        id: `campaign-${campaign.id}`,
        type: 'campaign',
        action: 'created',
        title: 'Yeni Kampanya Oluşturuldu',
        description: campaign.title || 'Başlıksız kampanya oluşturuldu',
        timestamp: campaign.createdAt,
        user: 'Admin',
      });
    });

    // Timestamp'e göre sırala ve ilk 10'u al
    const sortedActivities = activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)
      .map(activity => ({
        ...activity,
        timestamp: formatTimeAgo(activity.timestamp),
      }));

    console.log('Activity data:', sortedActivities);
    
    return Response.json({
      success: true,
      data: sortedActivities,
      message: 'Aktiviteler başarıyla getirildi'
    });
    
  } catch (error) {
    console.error('Activity fetch error:', error);
    return Response.json(
      { success: false, error: { message: 'Aktiviteler getirilemedi' } },
      { status: 500 }
    );
  }
}

// Zaman farkını hesapla
function formatTimeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'Az önce';
  if (diffInMinutes < 60) return `${diffInMinutes} dakika önce`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} saat önce`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} gün önce`;
  
  return past.toLocaleDateString('tr-TR');
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
