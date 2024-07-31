import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";


export async function POST(req: Request) {
    const { brandName, description } = await req.json();
  
    if (!brandName ) {
      return NextResponse.json({ error: 'Marka adı ve açıklama zorunludur!' }, { status: 400 });
    }
  
    try {
      const newBrand = await prisma.brand.create({
        data: {
            brandName,
          description,
        },
      });
      return NextResponse.json(newBrand);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Marka oluşturulamadı.' }, { status: 500 });
    }
  }

export async function GET() {
    try {
       const brands = await prisma.brand.findMany();
         return NextResponse.json(brands);
    } catch (error) {
        return NextResponse.json('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
    

}