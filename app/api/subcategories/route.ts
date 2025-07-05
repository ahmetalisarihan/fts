import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

// POST: Yeni alt kategori oluşturma
export async function POST(req: Request) {
    const { subcatName, description, catName } = await req.json();

    if (!subcatName || !catName) {
        return NextResponse.json({ error: 'Alt kategori adı ve ana kategori adı zorunludur!' }, { status: 400 });
    }

    try {
        const newSubcategory = await prisma.subcategory.create({
            data: {
                subcatName,
                description,
                catName, // Doğrudan catName ataması
            },
        });
        return NextResponse.json(newSubcategory);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Alt kategori oluşturulamadı.' }, { status: 500 });
    }
}

// GET: Alt kategorileri ve ürünleri getir
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const catName = searchParams.get('catName');

        if (!catName) {
            return NextResponse.json({ message: 'Kategori adı belirtilmelidir.' }, { status: 400 });
        }

        const category = await prisma.category.findUnique({
            where: { catName },
            include: {
                subcategories: {
                    include: {
                        products: true,
                    },
                    orderBy: [
                        { order: 'asc' },
                        { subcatName: 'asc' }
                    ]
                },
            },
        });

        if (!category) {
            return NextResponse.json({ message: 'Belirtilen kategori bulunamadı.' }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Alt kategoriler ve ürünler alınamadı.' }, { status: 500 });
    }
}

// PATCH: Alt kategoriyi güncelle
export async function PATCH(req: Request) {
  try {
    const { subcatName, description, catName, id } = await req.json();

    console.log('Gelen Veri:', { subcatName, description, catName, id });

    if (!subcatName || !catName || !id) {
      console.error('Eksik veri:', { subcatName, catName, id });
      return NextResponse.json(
        { message: 'Alt kategori adı, ana kategori adı ve id zorunludur.' },
        { status: 400 }
      );
    }

    const updatedSubcategory = await prisma.subcategory.update({
      where: { id },  // id'yi kullanarak güncelleme yapıyoruz
      data: { subcatName, description, catName },
    });

    console.log('Güncellenen Alt Kategori:', updatedSubcategory);
    
    return NextResponse.json(updatedSubcategory, { status: 200 });
  } catch (error) {
    console.error('Alt kategori güncelleme hatası:', error);
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
    return NextResponse.json({ message: `Alt kategori güncellenemedi: ${errorMessage}` }, { status: 500 });
  }
}

// DELETE: Alt kategoriyi sil
export async function DELETE(req: Request) {
  try {
    const { subcatName } = await req.json();

    if (!subcatName) {
      return NextResponse.json({ message: 'Alt kategori adı belirtilmelidir.' }, { status: 400 });
    }

    const deletedSubcategory = await prisma.subcategory.delete({
      where: { subcatName },
    });

    return NextResponse.json(deletedSubcategory, { status: 200 });
  } catch (error) {
    console.error('Alt kategori silme hatası:', error);
    return NextResponse.json({ message: 'Alt kategori silinemedi.' }, { status: 500 });
  }
}