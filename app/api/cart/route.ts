import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/libs/prismadb';

// Sepeti getir
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Kullanıcının sepetini bul veya oluştur
    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    // Fiyat değişikliklerini kontrol et
    const itemsWithPriceCheck = cart.items.map((item) => ({
      productId: item.productId,
      name: item.product.name,
      slug: item.product.slug,
      quantity: item.quantity,
      price: item.product.price || 0,
      currency: item.product.currency || 'TRY',
      priceSnapshot: item.priceSnapshot,
      currencySnapshot: item.currencySnapshot,
      imageUrl: item.product.imageUrl,
      sku: item.product.sku,
      priceChanged: 
        item.priceSnapshot !== item.product.price ||
        item.currencySnapshot !== item.product.currency,
    }));

    return NextResponse.json({
      items: itemsWithPriceCheck,
      updatedAt: cart.updatedAt,
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: 'Failed to get cart' },
      { status: 500 }
    );
  }
}

// Sepeti temizle
export async function DELETE() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.cart.deleteMany({
      where: { userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Clear cart error:', error);
    return NextResponse.json(
      { error: 'Failed to clear cart' },
      { status: 500 }
    );
  }
}