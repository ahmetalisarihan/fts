import { TProduct, TCategory } from '@/app/types';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import React from 'react'
import { OptimizedAPI } from '@/utils/api-optimization';

const getCategoryWithProducts = async (catName: string): Promise<{category: TCategory, products: TProduct[]} | null> => {
  try {
    console.log('🔍 Frontend: Kategori arıyor:', catName);
    
    // Cache'i temizle ve fresh data al
    const category = await OptimizedAPI.getCategoryProducts(catName, true);
    
    if (!category) {
      console.log('❌ Frontend: Kategori null döndü');
      return null;
    }
    
    // API artık tüm ürünleri (ana kategori + alt kategoriler) döndürüyor
    const allProducts: TProduct[] = category.products || [];
    
    console.log(`✅ Frontend: Kategori bulundu - ${category.catName}, Toplam ürün: ${allProducts.length}`);
    
    return {
      category,
      products: allProducts
    };
  } catch (error) {
    console.error('❌ Frontend: Kategori yüklenirken hata:', error);
    return null;
  }
};


const ProductsCategory = async ({params} : {
  params: { catName: string }
}) => {
  const categoryName = params.catName;
  const result = await getCategoryWithProducts(categoryName);
  
  if (!result) {
    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-4">Kategori bulunamadı</h1>
        <p>Aradığınız kategori mevcut değil.</p>
      </div>
    );
  }
  
  const { category, products } = result;
  
  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { name: 'Kategoriler', url: '/categories' },
        { name: decodeURIComponent(categoryName), url: `/categories/${categoryName}` }
      ]} />
      
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">
          <span className="font-normal text-muted-foreground">Kategori: </span>
          {decodeURIComponent(categoryName)}
        </h1>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm text-muted-foreground">
            Toplam {products.length} ürün bulundu
          </span>
          {category.subcategories && category.subcategories.length > 0 && (
            <span className="text-sm text-muted-foreground">
              ({category.subcategories.length} alt kategori dahil)
            </span>
          )}
        </div>
      </div>
      
      {/* Alt kategoriler listesi */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Alt Kategoriler:</h3>
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((subcategory: any) => (
              <a
                key={subcategory.id}
                href={`/categories/${categoryName}/subcategories/${subcategory.subcatName}`}
                className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors"
              >
                {subcategory.subcatName}
                {subcategory.products && (
                  <span className="ml-1 text-xs opacity-70">
                    ({subcategory.products.length})
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
      
      {/* Ürünler */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products && products.length > 0 ? (
          products.map((product: TProduct) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <div className='col-span-full py-12 text-center'>
            <p className="text-muted-foreground">Bu kategoride henüz ürün bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsCategory