import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { normalizeCategoryName } from "@/utils/url-helpers";

export async function GET(req: Request, { params }: { params: { catName: string } }) {

    try {
        // URL'i güvenli şekilde decode et
        const catName = normalizeCategoryName(params.catName);
        
        console.log('🔍 Aranan kategori:', catName);
        console.log('🔍 Orijinal param:', params.catName);
        const category = await prisma.category.findUnique({
            where: { catName },
            select: {
                id: true,
                catName: true,
                description: true,
                products: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        description: true,
                        isRecommended: true,
                        brandName: true,
                        catName: true,
                        subcatName: true,
                        priceName: true,
                        publicId: true,
                        metaTitle: true,
                        metaDescription: true,
                        metaKeywords: true,
                        imageUrl: true,
                    },
                },
                subcategories: {
                    select: {
                        id: true,
                        subcatName: true,
                        description: true,
                        catName: true,
                        products: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                                description: true,
                                isRecommended: true,
                                brandName: true,
                                catName: true,
                                subcatName: true,
                                priceName: true,
                                publicId: true,
                                metaTitle: true,
                                metaDescription: true,
                                metaKeywords: true,
                                imageUrl: true,
                            },
                        },
                    },
                },
            },
        });
        
        if (!category) {
            console.log('❌ Kategori bulunamadı:', catName);
            return NextResponse.json({ 
                success: false, 
                message: "Kategori bulunamadı",
                data: null 
            }, { status: 404 });
        }
        
        console.log('✅ Kategori bulundu:', category.catName);
        
        // Ana kategorideki ürünler
        let allProducts = category.products || [];
        
        // Alt kategorilerdeki ürünleri de ekle
        if (category.subcategories && category.subcategories.length > 0) {
            category.subcategories.forEach((subcategory) => {
                if (subcategory.products && subcategory.products.length > 0) {
                    allProducts = [...allProducts, ...subcategory.products];
                }
            });
        }
        
        // Dublicate ürünleri temizle (eğer bir ürün hem ana kategoride hem alt kategoride varsa)
        const uniqueProducts = allProducts.filter((product, index, self) => 
            index === self.findIndex(p => p.id === product.id)
        );
        
        return NextResponse.json({
            success: true,
            data: {
                ...category,
                products: uniqueProducts,
                totalProducts: uniqueProducts.length
            }
        });
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({ 
            success: false, 
            message: "Bir hata oluştu. Lütfen tekrar deneyin." 
        }, { status: 500 });
    }
}
