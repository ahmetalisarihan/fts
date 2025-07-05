'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Check, X, ExternalLink, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNotifications } from '@/contexts/NotificationContext';
import { Notification } from '@/types/notifications';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function NotificationDropdown() {
  const { 
    notifications, 
    unreadCount, 
    loading, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    refreshNotifications 
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleDeleteNotification = (e: React.MouseEvent, notificationId: string) => {
    e.preventDefault();
    e.stopPropagation();
    deleteNotification(notificationId);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'product':
        return '📦';
      case 'category':
        return '📂';
      case 'brand':
        return '🏷️';
      case 'campaign':
        return '📢';
      case 'warning':
        return '⚠️';
      case 'system':
        return '⚙️';
      default:
        return 'ℹ️';
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-blue-500';
      case 'low':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    try {
      return formatDistanceToNow(timestamp, { 
        addSuffix: true, 
        locale: tr 
      });
    } catch {
      return 'Bir süre önce';
    }
  };

  // Show recent notifications (max 10)
  const recentNotifications = notifications.slice(0, 10);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div 
          role="button"
          tabIndex={0}
          className="relative inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground cursor-pointer"
          onClick={() => {
            if (!isOpen) {
              refreshNotifications();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!isOpen) {
                refreshNotifications();
              }
            }
          }}
        >
          <Bell className={`h-4 w-4 ${loading ? 'animate-pulse' : ''}`} />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-[10px] flex items-center justify-center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-96 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-3">
          <DropdownMenuLabel className="p-0">
            Bildirimler
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount} okunmamış
              </Badge>
            )}
          </DropdownMenuLabel>
          
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="h-6 px-2 text-xs"
              >
                <Check className="h-3 w-3 mr-1" />
                Tümünü Oku
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshNotifications}
              disabled={loading}
              className="h-6 px-2 text-xs"
            >
              <Bell className={`h-3 w-3 ${loading ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
        </div>
        
        <DropdownMenuSeparator />

        {recentNotifications.length === 0 ? (
          <div className="p-6 text-center">
            <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Henüz bildirim yok
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Yeni aktiviteler burada görünecek
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {recentNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="p-0"
                onSelect={() => handleNotificationClick(notification)}
              >
                <div 
                  className={`w-full p-3 flex items-start gap-3 hover:bg-muted/50 transition-colors ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-950/20' : ''
                  }`}
                >
                  {/* Priority indicator */}
                  <div className={`w-1 h-full ${getPriorityColor(notification.priority)} rounded-full flex-shrink-0`} />
                  
                  {/* Icon */}
                  <div className="text-lg flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className={`text-sm font-medium line-clamp-1 ${
                        !notification.read ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {notification.title}
                      </h4>
                      
                      <div className="flex items-center gap-1 ml-2">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDeleteNotification(e, notification.id)}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      
                      {notification.actionUrl && (
                        <Link 
                          href={notification.actionUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                        >
                          {notification.actionText || 'Görüntüle'}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}

        {notifications.length > 10 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link 
                href="/admin/notifications" 
                className="w-full text-center py-2 text-sm text-primary hover:text-primary/80"
              >
                Tüm bildirimleri görüntüle ({notifications.length})
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
