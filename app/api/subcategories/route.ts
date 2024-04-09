import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";


export async function GET(req: Request, { params }: { params: { subcatName: string } }) {

    try {
        const subcatName  = params.subcatName; 
        const products = await prisma.subcategory.findUnique({
            where: {subcatName},
            include: {
                products: { include: {brand: true}, orderBy: {createdAt: 'desc'}}
            }
        });
        return NextResponse.json(products);
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
    }
    }