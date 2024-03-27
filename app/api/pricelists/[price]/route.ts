import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";


export async function GET(req: Request, { params }: { params: { priceName: string } }) {

    try {
        const priceName  = params.priceName; 
        const products = await prisma.priceList.findUnique({
            where: {priceName},
            include: {
                products: {  orderBy: {createdAt: 'desc'}}
            }
        });
        return NextResponse.json(products);
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
    }
    }