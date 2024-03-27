import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";



export async function GET() {
    try {
       const pricelists = await prisma.priceList.findMany();
         return NextResponse.json(pricelists);
    } catch (error) {
        return NextResponse.json('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
    

}
