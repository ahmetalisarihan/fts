import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                catName: true,
                _count: {
                    select: {
                        products: true,
                        subcategories: true
                    }
                }
            }
        });
        
        console.log('📋 Tüm kategoriler:', categories);
        
        return NextResponse.json({
            success: true,
            data: categories,
            message: `${categories.length} kategori bulundu`
        });
    } catch (error) {
        console.error('❌ Database hatası:', error);
        return NextResponse.json({
            success: false,
            message: "Database hatası",
            error: error
        }, { status: 500 });
    }
}
