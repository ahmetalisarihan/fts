import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        console.log('📋 All products with slugs:');
        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} -> slug: "${product.slug}"`);
        });
        
        return NextResponse.json({
            success: true,
            count: products.length,
            products: products.map(p => ({
                id: p.id,
                name: p.name,
                slug: p.slug,
                createdAt: p.createdAt
            }))
        });
    } catch (error) {
        console.error("Debug products error:", error);
        return NextResponse.json({ message: "Bir hata oluştu." }, { status: 500 });
    }
}
