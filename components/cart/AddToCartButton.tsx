'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price?: number | null;
    currency?: string | null;
    imageUrl?: string | null;
    sku?: string | null;
  };
  quantity?: number;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  variant = 'default',
  size = 'default',
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product.price) {
      toast({
        title: 'Fiyat Bilgisi Yok',
        description: 'Bu ürün için fiyat bilgisi bulunmamaktadır. Lütfen bizimle iletişime geçin.',
        variant: 'destructive',
      });
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      currency: product.currency || 'TRY',
      priceSnapshot: product.price,
      currencySnapshot: product.currency || 'TRY',
      imageUrl: product.imageUrl || undefined,
      sku: product.sku || undefined,
      quantity,
    });

    setAdded(true);
    toast({
      title: 'Sepete Eklendi',
      description: `${product.name} sepetinize eklendi.`,
    });

    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      size={size}
      className={className}
      disabled={added}
    >
      {added ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Eklendi
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Sepete Ekle
        </>
      )}
    </Button>
  );
}