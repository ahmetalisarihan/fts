import prisma from "@/libs/prismadb";
import { NextResponse } from 'next/server'

export default async function handler(req: Request) {
    try {
      const products = await prisma.product.findMany({
        where: {
          isRecommended: true,
        },
      });
        return NextResponse.json(products);
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({message:'Bir hata oluştu. Lütfen tekrar deneyin.'}, { status: 500 });
    }
}