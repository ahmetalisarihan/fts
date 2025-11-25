import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

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
      <div className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Admin Panel
          </h1>
        </div>
      </div>
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}