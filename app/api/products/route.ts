import { NextResponse } from 'next/server'
import prisma from "@/libs/prismadb";
import React from 'react'

export async function POST(req: Request) {
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
        metaKeywords, } =
    await req.json()

    const slug = name
    .toLowerCase()
    .replace(/ /g, '-')

    if (!name || !description ) {
        return  NextResponse.json(
            {error:'Ürün ismi ve açıklama zorunludur!'}, 
            { status: 500 }
            )
    }
    try {
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
        console.log('Urun eklendi')
        return NextResponse.json(newProduct)
    } catch (error) {
        return NextResponse.json({message:'Bir hata oluştu. Lütfen tekrar deneyin.'})
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

