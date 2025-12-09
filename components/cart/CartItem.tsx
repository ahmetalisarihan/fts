'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart, CartItem as CartItemType } from '@/contexts/CartContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const formatPrice = (price: number, currency: string) => {
    const currencySymbols: Record<string, string> = {
      TRY: '₺',
      USD: '$',
      EUR: '€',
    };
    return `${price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currencySymbols[currency] || currency}`;
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.productId, newQuantity);
    }
  };

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Ürün Görseli */}
      <Link href={`/yapi-malzemeleri/${item.slug}`} className="flex-shrink-0">
        <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-xs">Görsel Yok</span>
            </div>
          )}
        </div>
      </Link>

      {/* Ürün Bilgileri */}
      <div className="flex-1 min-w-0">
        <Link 
          href={`/yapi-malzemeleri/${item.slug}`}
          className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
        >
          {item.name}
        </Link>
        
        {item.sku && (
          <p className="text-xs text-gray-500 mt-1">SKU: {item.sku}</p>
        )}

        {/* Fiyat Değişiklik Uyarısı */}
        {item.priceChanged && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Fiyat değişti: {formatPrice(item.priceSnapshot, item.currencySnapshot)} → {formatPrice(item.price, item.currency)}
            </AlertDescription>
          </Alert>
        )}

        {/* Miktar Kontrolü */}
        <div className="flex items-center gap-2 mt-3">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="w-16 h-8 text-center"
          />
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
            onClick={() => removeItem(item.productId)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Fiyat */}
      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="font-semibold text-gray-900 dark:text-white">
            {formatPrice(item.price * item.quantity, item.currency)}
          </p>
          <p className="text-xs text-gray-500">
            {formatPrice(item.price, item.currency)} / adet
          </p>
        </div>
      </div>
    </div>
  );
}