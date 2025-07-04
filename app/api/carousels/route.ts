import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function GET() {
    try {
        const carousels = await prisma.carousel.findMany();
        return new Response(JSON.stringify(carousels), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Carouselları çekerken bir hata oluştu.' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { imageUrl, carouselLink } = await request.json();
        if (!imageUrl || !carouselLink) {
            return new Response(JSON.stringify({ error: 'Resim URL i ve bağlantı gerekli.' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const newCarousel = await prisma.carousel.create({
            data: {
                imageUrl,
                carouselLink,
            },
        });

        return new Response(JSON.stringify(newCarousel), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Yeni carousel öğesi oluşturulurken bir hata oluştu.' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return new Response(JSON.stringify({ error: "ID gerekli." }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        // Veritabanından silme işlemi
        await prisma.carousel.delete({
            where: { id },
        });

        return new Response(JSON.stringify({ message: "Carousel başarıyla silindi." }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({
                message: "Carousel silinirken bir hata oluştu.",
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