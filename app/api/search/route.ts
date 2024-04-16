import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { URL } from 'node:url';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = decodeURIComponent(url.searchParams.get('query') || '');

  try {
    if (!query) {
      return NextResponse.json({ error: 'Arama sorgusu boş olamaz.' }, { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Ürünler alınırken bir hata oluştu:', error);
    return NextResponse.json({ error: 'Ürünler alınırken bir hata oluştu.' }, { status: 500 });
  }
}