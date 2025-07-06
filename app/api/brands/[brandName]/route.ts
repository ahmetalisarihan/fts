import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";


export async function GET(_req: Request, { params }: { params: { brandName: string } }) {

    try {
        const brandName  = params.brandName; 
        const products = await prisma.brand.findUnique({
            where: {brandName},
            include: {
                products: { orderBy: {createdAt: 'desc'}}
            }
        });
        return NextResponse.json(products);
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
    }
    }