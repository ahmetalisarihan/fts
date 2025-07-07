
export type TCategory = {
    id: string;
    catName: string;
    description?: string;
    subcategories?: TSubCategory[];
    products?: TProduct[];
};

export type TSubCategory = {
    id: string;
    subcatName: string;
    description?: string;
    catName: string;
};

export type CategoryData = {
    id?: string;
    catName: string;
    description: string;
};

export type BrandData = {
    id?: string;
    brandName: string;
    description: string;
};


export type SubcategoryData = {
    subcatName: string;
    description: string;
    catName: string;
};


export type TBrand = {
    id: string;
    brandName: string;
    description?: string;
};

export type TProduct = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    technicalSpecs?: string; // Teknik bilgiler için yeni alan
    isRecommended?: boolean;
    imageUrl?: string;
    publicId: string;
    brandName?: string;
    catName?: string;
    subcatName?: string;
    priceName?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
};

export type TPriceList = {
    
    id?: string;
    priceName: string;
    price?: string;
    pdfUrl: string;
    createdAt?: string | number | Date;
    updatedAt?: string | number | Date;
};

export type TCarousel = {
    id: string;
    imageUrl?: string;
    carouselLink?: string | null;
};

export type TCampaigns = {
    id: string;
    title?: string;
    imageUrl: string;
    link?: string;
};