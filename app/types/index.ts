export type TCategory = {
    id: string;
    catName: string;

};

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
    priceName?: string;
};

export type TPriceList = {
    id: string;
    priceName: string;
    price?: string;
    pdfUrl?: string;

};