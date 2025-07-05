'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import { NotificationProvider } from '@/contexts/NotificationContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mobil ekran kontrolü
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Mobilde sidebar'ı otomatik kapat
      if (mobile) {
        setIsSidebarCollapsed(true);
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSidebarCollapseAction = (collapsed: boolean) => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsSidebarCollapsed(collapsed);
    }
  };

  const handleMobileMenuClickAction = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <NotificationProvider>
      <div className="flex h-screen bg-background">
        {/* Mobile Overlay */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={cn(
            'fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
            isMobile
              ? isSidebarOpen
                ? 'translate-x-0'
                : '-translate-x-full'
              : 'translate-x-0'
          )}
        >
          <Sidebar
            isCollapsed={isMobile ? false : isSidebarCollapsed}
            onCollapseAction={handleSidebarCollapseAction}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <Header
            onMenuClickAction={handleMobileMenuClickAction}
            isMobile={isMobile}
          />

          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
}
