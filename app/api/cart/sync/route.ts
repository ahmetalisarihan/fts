import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/libs/prismadb';

// LocalStorage'daki sepeti veritabanı ile senkronize et
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items } = await request.json();

    // Kullanıcının sepetini bul veya oluştur
    let cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // LocalStorage'daki her ürünü ekle
    for (const item of items) {
      const existingItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId: item.productId,
        },
      });

      if (existingItem) {
        // Miktarı güncelle (daha yüksek olanı al)
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: Math.max(existingItem.quantity, item.quantity),
          },
        });
      } else {
        // Yeni ürün ekle
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.productId,
            quantity: item.quantity,
            priceSnapshot: item.priceSnapshot,
            currencySnapshot: item.currencySnapshot,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sync cart error:', error);
    return NextResponse.json(
      { error: 'Failed to sync cart' },
      { status: 500 }
    );
  }
}