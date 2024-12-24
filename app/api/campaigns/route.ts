import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

// Kampanyaları listele
export async function GET() {
  try {
    const campaigns = await prisma.campaigns.findMany(); 
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Kampanyalar yüklenemedi:', error);
    return NextResponse.json({ error: 'Kampanyalar yüklenemedi.' }, { status: 500 });
  }
}

// Yeni kampanya oluştur
export async function POST(req: NextRequest) {
    const { imageUrl, link } = await req.json();
  
    if (!imageUrl || !link) {
      return new Response(JSON.stringify({ error: 'Resim URL ve link gereklidir.' }), { status: 400 });
    }
  
    try {
      const newCampaign = await prisma.campaigns.create({
        data: { imageUrl, link },  // Modeldeki zorunlu alanlar burada sağlanır
      });
      return new Response(JSON.stringify(newCampaign), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Kampanya oluşturulamadı.' }), { status: 500 });
    }
  }

// Kampanya sil
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return new Response(
                JSON.stringify({ error: "ID gerekli." }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Kampanya verisini veritabanından silme işlemi
        await prisma.campaigns.delete({
            where: { id },
        });

        return new Response(
            JSON.stringify({ message: "Kampanya başarıyla silindi." }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({
                message: "Kampanya silinirken bir hata oluştu.",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}