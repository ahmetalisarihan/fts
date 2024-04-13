
export type TCategory = {
    id: string;
    catName: string;
};

export type TSubCategory = {
    id: string;
    subCatName: string;
};

export type CategoryData = {
    id?: string;
    catName: string;
    description: string;
};

export type SubcategoryData = {
    subcatName: string;
    description: string;
    catName: string;
};

// export type Category = {
//     id: string;
//     catName: string;
//     description: string;
//     subcategories: Subcategory[];
//   };
  
//   export type Subcategory = {
//     id: string;
//     subcatName: string;
//     description: string;
//     catName: string; // Ana kategori adı (ilişkisel alan)
//     category?: Category; // Opsiyonel olarak ana kategori nesnesi
//     parentCategory: string;
//   };

export type TBrand = {
    id: string;
    brandName: string;

};

export type TProduct = {
    id: string;
    name: string;
    description?: string;
    isRecommended?: boolean;
    imageUrl?: string;
    publicId: string;
    brandName?: string;
    catName?: string;
    subcatName?: string;
    priceName?: string;
};

export type TPriceList = {
    id: string;
    priceName: string;
    price?: string;
    pdfUrl?: string;

};

export type TCarousel = {
    id: string;
    imageUrl?: string;
    carouselLink?: string;
};