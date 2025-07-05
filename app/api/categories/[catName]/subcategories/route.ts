import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";


export async function GET(req: Request, { params }: { params: { catName: string } }) {
    try {
        const catName = params.catName;
        
        if (!catName) {
            return NextResponse.json(
                { success: false, error: { message: 'Kategori adı gerekli' } },
                { status: 400 }
            );
        }
        
        const subcategories = await prisma.subcategory.findMany({
            where: { catName },
            include: {
                products: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    }
                },
            },
            orderBy: [
                { order: 'asc' },
                { subcatName: 'asc' }
            ]
        });
        
        return NextResponse.json({
            success: true,
            data: subcategories,
            message: 'Alt kategoriler başarıyla getirildi'
        });
        
    } catch (error) {
        console.error('Subcategories fetch error:', error);
        return NextResponse.json(
            { success: false, error: { message: 'Alt kategoriler getirilemedi' } },
            { status: 500 }
        );
    }
}
