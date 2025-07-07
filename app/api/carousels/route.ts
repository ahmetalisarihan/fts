import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import { handleApiError, createSuccessResponse, addCorsHeaders } from '@/utils/api-helpers';

export async function GET() {
    try {
        const carousels = await prisma.carousel.findMany();
        return createSuccessResponse(carousels, 'Carousellar başarıyla getirildi');
    } catch (error) {
        return handleApiError(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        const { imageUrl, carouselLink } = await request.json();
        if (!imageUrl) {
            const response = NextResponse.json({ error: 'Resim URL\'i gerekli.' }, { status: 400 });
            return addCorsHeaders(response);
        }

        const newCarousel = await prisma.carousel.create({
            data: {
                imageUrl,
                carouselLink: carouselLink || null,
            },
        });

        return createSuccessResponse(newCarousel, 'Carousel başarıyla oluşturuldu', 201);
    } catch (error) {
        return handleApiError(error);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            const response = NextResponse.json({ error: "ID gerekli." }, { status: 400 });
            return addCorsHeaders(response);
        }

        // Veritabanından silme işlemi
        await prisma.carousel.delete({
            where: { id },
        });

        return createSuccessResponse(null, "Carousel başarıyla silindi.");
    } catch (error) {
        return handleApiError(error);
    }
}

// Handle CORS preflight requests
export async function OPTIONS() {
    const response = new NextResponse(null, { status: 200 });
    return addCorsHeaders(response);
}
