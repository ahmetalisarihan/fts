import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { TSubCategory } from "@/app/types";

export async function POST(req: Request) {
    const { subcatName, description, catName } = await req.json();
  
    if (!subcatName || !description || !catName) {
      return NextResponse.json({ error: 'Alt kategori adı, açıklama ve ana kategori adı zorunludur!' }, { status: 400 });
    }
  
    try {
      const newSubcategory = await prisma.subcategory.create({
        data: {
          subcatName,
          description,
          category: {
              connect: { catName },
            },
        },
      });
      return NextResponse.json(newSubcategory);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Alt kategori oluşturulamadı.' }, { status: 500 });
    }
  }



  export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const catName = searchParams.get('catName'); 
  
      let subcategories;
  
      if (catName) {

        subcategories = await prisma.subcategory.findMany({
          where: {
            category: {
              catName,
            },
          },
        });
      } else {
        // Tüm alt kategorileri bul (opsiyonel)
        subcategories = await prisma.subcategory.findMany();
      }
  
      return NextResponse.json(subcategories);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Alt kategoriler alınamadı.' }, { status: 500 });
    }
  }
