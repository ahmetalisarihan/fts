import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {

try {
    const { id } = params; 
    const product = await prisma.product.findUnique({
        where: {
            id: params.id, 
        },
    });
    return NextResponse.json(product);

} catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
}
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { name, description, selectedBrand, imageUrl, selectedCategory, selectedPriceList, publicId } = await req.json();
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: params.id,
            },
            data: {
                name,
                description,
                brandName: selectedBrand,
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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: params.id,
            },
        });
        return NextResponse.json(deletedProduct);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Silme isleminde bir hata oluştu. Lütfen tekrar deneyin." });
    }
}
