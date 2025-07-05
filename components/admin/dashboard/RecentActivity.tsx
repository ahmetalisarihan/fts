'use client';

import { useEffect, useState } from 'react';
import { Clock, Package, FolderTree, Tags, Megaphone } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'product' | 'category' | 'brand' | 'campaign';
  action: 'created' | 'updated' | 'deleted';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        console.log('Fetching activities from API...');
        
        const response = await fetch('/api/admin/activity', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Activities response:', data);
          setActivities(data.data || []);
        } else {
          console.error('Failed to fetch activities:', response.status);
          // Fallback boş array
          setActivities([]);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
        // Fallback boş array
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'product':
        return Package;
      case 'category':
        return FolderTree;
      case 'brand':
        return Tags;
      case 'campaign':
        return Megaphone;
      default:
        return Package;
    }
  };

  const getActionColor = (action: ActivityItem['action']) => {
    switch (action) {
      case 'created':
        return 'text-green-600 bg-green-100';
      case 'updated':
        return 'text-blue-600 bg-blue-100';
      case 'deleted':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionText = (action: ActivityItem['action']) => {
    switch (action) {
      case 'created':
        return 'Oluşturuldu';
      case 'updated':
        return 'Güncellendi';
      case 'deleted':
        return 'Silindi';
      default:
        return 'İşlem';
    }
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Son Aktiviteler</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-muted animate-pulse rounded-full" />
              <div className="flex-1 space-y-1">
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Son Aktiviteler</h3>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => {
            const Icon = getIcon(activity.type);
            
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${getActionColor(activity.action)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionColor(activity.action)}`}>
                      {getActionText(activity.action)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-muted-foreground">
                      {activity.user} tarafından
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Henüz aktivite bulunmuyor</p>
            <p className="text-xs text-muted-foreground mt-1">
              Ürün, kategori veya marka eklediğinizde burada görünecektir
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <a
          href="/admin/activity"
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          Tüm aktiviteleri görüntüle →
        </a>
      </div>
    </div>
  );
}
