import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // Admin kontrolü - sadece giriş yapmış kullanıcılar
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="border-b bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Ana Siteye Dön</span>
              </Link>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Home className="h-5 w-5" />
                Admin Panel
              </h1>
            </div>
          </div>
        </div>
      </div>
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}