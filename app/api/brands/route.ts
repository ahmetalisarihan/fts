import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";



export async function GET() {
    try {
       const brands = await prisma.brand.findMany();
         return NextResponse.json(brands);
    } catch (error) {
        return NextResponse.json('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
    

}