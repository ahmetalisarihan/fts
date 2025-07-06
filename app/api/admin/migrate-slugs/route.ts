import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

// Türkçe karakterleri URL-safe hale getiren fonksiyon
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-') // Sadece harf, rakam ve tire bırak
    .replace(/-+/g, '-') // Çoklu tireleri tek tire yap
    .replace(/^-|-$/g, '') // Baştan ve sondan tireleri kaldır
}

export async function POST() {
    try {
        // Tüm ürünleri al
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                slug: true
            }
        });
        
        console.log('🔧 Starting slug migration for', products.length, 'products...');
        
        const updates = [];
        
        for (const product of products) {
            const newSlug = createSlug(product.name);
            
            if (product.slug !== newSlug) {
                console.log(`📝 Updating: "${product.name}" -> "${product.slug}" => "${newSlug}"`);
                
                // Yeni slug'ın benzersiz olduğundan emin ol
                let finalSlug = newSlug;
                let counter = 1;
                
                while (await prisma.product.findFirst({ 
                    where: { 
                        slug: finalSlug,
                        id: { not: product.id }
                    } 
                })) {
                    finalSlug = `${newSlug}-${counter}`;
                    counter++;
                }
                
                const updated = await prisma.product.update({
                    where: { id: product.id },
                    data: { slug: finalSlug }
                });
                
                updates.push({
                    id: product.id,
                    name: product.name,
                    oldSlug: product.slug,
                    newSlug: finalSlug
                });
            } else {
                console.log(`✅ OK: "${product.name}" -> "${product.slug}"`);
            }
        }
        
        console.log('✅ Slug migration completed!', updates.length, 'updates made.');
        
        return NextResponse.json({
            success: true,
            message: `Slug migration completed! ${updates.length} products updated.`,
            updates
        });
        
    } catch (error) {
        console.error("Slug migration error:", error);
        return NextResponse.json({ 
            success: false,
            message: "Slug migration failed.",
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
