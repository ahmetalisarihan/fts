'use client';

import { useState } from 'react';
import CreateCategoryForm from '@/components/Create/CreateCategoryForm';
import CreateBrandForm from '@/components/Create/CreateBrand';
import CreateProductForm from '@/components/Create/CreateProductForm';
import CreateSubcategoryForm from '@/components/Create/CreateSubcategoryForm';
import CreateCarousel from '@/components/Create/CreateCarousel';
import { Button } from '@/components/ui/button';
import CreatePriceList from '@/components/Create/CreatePriceList';
import DeletePriceLists from './Delete/DeletePriceLists';
import DeleteCarousel from './Delete/DeleteCarousel';
import { UserButton } from '@clerk/nextjs';
import CreateCampaigns from './Create/CreateCampaigns';
import DeleteCampaign from './Delete/DeleteCampain';
import ManageSubcategories from './ManageSubcategories';


const Dashboard: React.FC = () => {
    const [selectedForm, setSelectedForm] = useState<
        'product' | 'category' | 'subcategory' | 'subcategorymanage' | 'brand' | 'carousel' | 'priceList' | 'campaign'
    >('product');

    const handleFormChange = (
        formType: 'product' | 'category' | 'subcategory' | 'subcategorymanage' | 'brand' | 'carousel' | 'priceList' | 'campaign'
    ) => {
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
                    className={`py-2 px-4 border ${
                        selectedForm === 'subcategorymanage' ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => setSelectedForm('subcategorymanage')}
                    >
                    Alt Kategorileri Yönet
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
                    Carousel Yönetimi
                </Button>
                <Button
                    className={`px-4 py-2 rounded ${
                        selectedForm === 'priceList' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleFormChange('priceList')}
                >
                    Fiyat Listesi Yönetimi
                </Button>
                <Button
                    className={`px-4 py-2 rounded ${
                        selectedForm === 'campaign' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleFormChange('campaign')}
                >
                    Kampanya Yönetimi
                </Button>
            </div>

            {selectedForm === 'product' && <CreateProductForm />}
            {selectedForm === 'category' && <CreateCategoryForm />}
            {selectedForm === 'subcategory' && <CreateSubcategoryForm />}
            {selectedForm === 'subcategorymanage' && <ManageSubcategories />}
            {selectedForm === 'brand' && <CreateBrandForm />}
            {selectedForm === 'carousel' && (
                <div>
                    <CreateCarousel />
                    <DeleteCarousel />
                </div>
            )}
            {selectedForm === 'priceList' && (
                <div>
                    <CreatePriceList />
                    <DeletePriceLists />
                </div>
            )}
            {selectedForm === 'campaign' && (
                <div>
                    <CreateCampaigns />
                    <DeleteCampaign />  {/* Kampanyaları yönetme ve silme işlemi */}
                </div>
            )}
        </div>
    );
};

export default Dashboard;