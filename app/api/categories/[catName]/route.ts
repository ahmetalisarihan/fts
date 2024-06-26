import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";


export async function GET(req: Request, { params }: { params: { catName: string } }) {

    try {
        const catName  = params.catName; 
        const products = await prisma.category.findUnique({
            where: {catName},
            include: {
                subcategories: {
                    include: {
                        products: true,
                    }
                },
                products: true,
                
            }
        });
        return NextResponse.json(products);
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
    }
    }
