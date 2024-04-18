import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";


export async function GET(req: Request, { params }: { params: { catName: string } }) {

    try {
        const catName  = params.catName; 
        const subcategory = await prisma.subcategory.findMany({
            where: 
            { catName
            },
            include: {
                products: true,
      
                },
        });
        return NextResponse.json(subcategory);
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
    }
    }
