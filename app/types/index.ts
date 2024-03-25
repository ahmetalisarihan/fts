export type TCategory = {
    id: string;
    catName: string;
    //products: TProduct[];
};

export type TBrand = {
    id: string;
    brandName: string;
    //products: TProduct[];
};

export type TProduct = {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    publicId: string;
    brandName?: string;
    catName?: string;
};