import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Her istek için yeni veri al
export const revalidate = 0; // Önbelleğe almayı devre dışı bırak

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        console.log('🔍 Looking for product with slug:', slug);
        
        const product = await prisma.product.findUnique({
            where: {
                slug: slug,
            },
        });
        
        console.log('🔍 Found product:', product ? product.id : 'NOT FOUND');

        if (!product) {
            return NextResponse.json({ message: "Ürün bulunamadı" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Ürün getirilirken hata oluştu:", error);
        return NextResponse.json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
    const { name, description,isRecommended, selectedBrand, imageUrl, selectedCategory, selectedPriceList, publicId } = await req.json();
    
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
    
    const slug = name ? createSlug(name) : '';
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                slug: params.slug,
            },
            data: {
                name,
                slug,
                description,
                brandName: selectedBrand,
                isRecommended,
                imageUrl,
                publicId,
                catName: selectedCategory,
                priceName: selectedPriceList,
            },
        });
        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Bir düzenleme hatası oluştu. Lütfen tekrar deneyin." });
    }
}

export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                slug: params.slug,
            },
        });
        return NextResponse.json(deletedProduct);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Silme isleminde bir hata oluştu. Lütfen tekrar deneyin." });
    }
}
