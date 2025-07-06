import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";


export async function GET(_req: Request, { params }: { params: { subcatName: string } }) {

    try {
        const subcatName  = params.subcatName; 
        const products = await prisma.subcategory.findUnique({
            where: {subcatName},
            include: {
                products: true,
            }
        });
        return NextResponse.json(products);
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
    }
}
