import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Her istek için yeni veri al
export const revalidate = 0; // Önbelleğe almayı devre dışı bırak

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const product = await prisma.product.findUnique({
            where: {
                slug: slug,
            },
        });

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
    const slug = name.toLowerCase().replace(/ /g, "-");
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

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
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
