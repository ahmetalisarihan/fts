import { NextResponse } from 'next/server'
import prisma from "@/libs/prismadb";
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
    try {
        const {
            name, 
            description,
            isRecommended, 
            selectedBrand, 
            imageUrl, 
            selectedCategory, 
            selectedSubcategory, 
            selectedPriceList, 
            publicId,
            metaTitle,
            metaDescription,
            metaKeywords,
        } = await req.json()

        const slug = name
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '') // Özel karakterleri kaldır

        if (!name || !description) {
            return NextResponse.json(
                { error: 'Ürün ismi ve açıklama zorunludur!' }, 
                { status: 400 }
            )
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                slug,
                description,
                brandName: selectedBrand,
                isRecommended,
                imageUrl,
                publicId,
                catName: selectedCategory,
                subcatName: selectedSubcategory,
                priceName: selectedPriceList,
                metaTitle,
                metaDescription,
                metaKeywords,
            }
        })

        // Revalidate the products page and the new product's page
        revalidatePath('/products')
        revalidatePath(`/products/${slug}`)

        console.log('Ürün eklendi:', newProduct.name)
        return NextResponse.json({ message: 'Ürün başarıyla eklendi', product: newProduct }, { status: 201 })
    } catch (error) {
        console.error('Ürün eklenirken hata oluştu:', error)
        return NextResponse.json({ error: 'Bir hata oluştu. Lütfen tekrar deneyin.' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'Bir hata oluştu. Lütfen tekrar deneyin.'}, { status: 500 });
    }
}

