import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import prisma from "@/libs/prismadb";


export async function POST(req: Request) {
    const { catName, description } = await req.json();
  
    if (!catName ) {
      return NextResponse.json({ error: 'Kategori adı ve açıklama zorunludur!' }, { status: 400 });
    }
  
    try {
      const newCategory = await prisma.category.create({
        data: {
          catName,
          description,
        },
      });
      return NextResponse.json(newCategory);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Kategori oluşturulamadı.' }, { status: 500 });
    }
  }


export async function GET() {
    try {
      const categories = await prisma.category.findMany({
        include: {
          subcategories: {
            include: {
              products: true,
            },
          },
        },
      });
      return NextResponse.json(categories);
    } catch (error) {
      return NextResponse.json('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
    

}
