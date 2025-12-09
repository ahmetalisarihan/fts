'use client';

import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, MessageCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { createWhatsAppUrl } from '@/utils/common';
import { useUser } from '@clerk/nextjs';

export default function CartPage() {
  const { items, clearCart, totalItems } = useCart();
  const { user } = useUser();

  // Para birimlerine göre grupla
  const groupedByCurrency = items.reduce((acc, item) => {
    const currency = item.currency;
    if (!acc[currency]) {
      acc[currency] = [];
    }
    acc[currency].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  // Toplam hesapla
  const totals = Object.entries(groupedByCurrency).map(([currency, currencyItems]) => {
    const total = currencyItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { currency, total };
  });

  const formatPrice = (price: number, currency: string) => {
    const currencySymbols: Record<string, string> = {
      TRY: '₺',
      USD: '$',
      EUR: '€',
    };
    return `${price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currencySymbols[currency] || currency}`;
  };

  // WhatsApp mesajı oluştur
  const generateWhatsAppMessage = () => {
    let message = '🛒 *ÜRÜN TEKLİF TALEBİ*\n\n';
    
    if (user) {
      message += `👤 *Müşteri:* ${user.fullName || user.firstName || 'Misafir'}\n`;
      message += `📧 *E-posta:* ${user.primaryEmailAddress?.emailAddress || '-'}\n\n`;
    }
    
    message += '📦 *Ürünler:*\n';
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   • Adet: ${item.quantity}\n`;
      message += `   • Birim Fiyat: ${formatPrice(item.price, item.currency)}\n`;
      message += `   • Toplam: ${formatPrice(item.price * item.quantity, item.currency)}\n`;
      if (item.sku) {
        message += `   • SKU: ${item.sku}\n`;
      }
      message += '\n';
    });
    
    message += '💰 *Toplam (Tahmini):*\n';
    totals.forEach(({ currency, total }) => {
      message += `• ${formatPrice(total, currency)}\n`;
    });
    
    message += '\n📝 *Not:* Lütfen güncel fiyat ve stok durumu için bilgi veriniz.';
    
    return message;
  };

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = createWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Sepetiniz Boş</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Henüz sepetinize ürün eklemediniz.
            </p>
            <Link href="/yapi-malzemeleri">
              <Button>Ürünleri İncele</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sepet Ürünleri */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sepetim</CardTitle>
                  <CardDescription>
                    {totalItems} ürün
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Sepeti Temizle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Özet ve İşlemler */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Sipariş Özeti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Toplam Fiyatlar */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Toplam Tutar (Tahmini):
                </p>
                {totals.map(({ currency, total }) => (
                  <div key={currency} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{currency}:</span>
                    <span className="text-lg font-bold">
                      {formatPrice(total, currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t space-y-3">
                {/* WhatsApp ile Teklif Al */}
                <Button
                  onClick={handleSendWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp ile Teklif Al
                </Button>

                {!user && (
                  <Link href="/sign-in" className="block">
                    <Button variant="outline" className="w-full">
                      Giriş Yap
                    </Button>
                  </Link>
                )}

                <p className="text-xs text-gray-500 text-center">
                  Fiyatlar tahminidir. Güncel fiyat ve stok durumu için WhatsApp üzerinden iletişime geçiniz.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}