'use client';

import { useState } from 'react';
import CreateCategoryForm from '@/components/Create/CreateCategoryForm';
import CreateBrandForm from '@/components/Create/CreateBrand';
import CreateProductForm from '@/components/Create/CreateProductForm';
import CreateSubcategoryForm from '@/components/Create/CreateSubcategoryForm';
import CreateCarousel from '@/components/Create/CreateCarousel';
import { Button } from '@/components/ui/button';
import CreatePriceList from '@/components/Create/CreatePriceList';

import { UserButton } from '@clerk/nextjs';
import DeletePriceLists from './Delete/DeletePriceLists';

const Dashboard: React.FC = () => {
    const [selectedForm, setSelectedForm] = useState<'product' | 'category' | 'subcategory' | 'brand' | 'carousel' | 'priceList'>('product');

    const handleFormChange = (formType: 'product' | 'category' | 'subcategory' | 'brand' | 'carousel' | 'priceList') => {
        setSelectedForm(formType);
    };

    return (
        <div>
            <div>
                <div className="flex">
                    <span className="ml-auto">
                        <UserButton />
                    </span>
                </div>
                <div className="text-2xl font-bold">Yönetim Paneli</div>
            </div>
            <div className="flex gap-4 my-4 items-center justify-center">
                <Button
                    className={`px-4 py-2 rounded ${
                        selectedForm === 'product' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleFormChange('product')}
                >
                    Ürün Oluştur
                </Button>
                <Button
                    className={`px-4 py-2 rounded ${
                        selectedForm === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleFormChange('category')}
                >
                    Kategori Oluştur
                </Button>
                <Button
                    className={`px-4 py-2 rounded ${
                        selectedForm === 'subcategory' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleFormChange('subcategory')}
                >
                    Alt Kategori Oluştur
                </Button>
                <Button
                    className={`px-4 py-2 rounded ${
                        selectedForm === 'brand' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleFormChange('brand')}
                >
                    Marka Oluştur
                </Button>
                <Button
                    className={`px-4 py-2 rounded ${
                        selectedForm === 'carousel' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleFormChange('carousel')}
                >
                    Carousel Oluştur
                </Button>
                <Button
                    className={`px-4 py-2 rounded ${
                        selectedForm === 'priceList' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleFormChange('priceList')}
                >
                    Fiyat Listesi Yönetimi
                </Button>
            </div>

            {selectedForm === 'product' && <CreateProductForm />}
            {selectedForm === 'category' && <CreateCategoryForm />}
            {selectedForm === 'subcategory' && <CreateSubcategoryForm />}
            {selectedForm === 'brand' && <CreateBrandForm />}
            {selectedForm === 'carousel' && <CreateCarousel />}
            {selectedForm === 'priceList' && (
                <div>
                    <CreatePriceList />
                    <DeletePriceLists /> {/* Fiyat listesi yönetimi */}
                </div>
            )}
        </div>
    );
};

export default Dashboard;