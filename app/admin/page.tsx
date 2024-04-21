'use client'

import { useState } from 'react';
import CreateCategoryForm from '@/components/Create/CreateCategoryForm';
import CreateProductForm from '@/components/Create/CreateProductForm';
import CreateSubcategoryForm from '@/components/Create/CreateSubcategoryForm';
import CreateCarousel from '@/components/Create/CreateCarousel';
import { Button } from '@/components/ui/button';
import CreatePriceList from '@/components/Create/CreatePriceList';

const Dashboard: React.FC = () => {
    const [selectedForm, setSelectedForm] = useState('product');

    const handleFormChange = (formType: 'product' | 'category' | 'subcategory' | 'carousel' | 'priceList') => {
      setSelectedForm(formType);
    };
  
    return (
      <div>
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
            Fiyat Listesi Oluştur
          </Button>
        </div>
  
        {selectedForm === 'product' && <CreateProductForm />}
        {selectedForm === 'category' && <CreateCategoryForm />}
        {selectedForm === 'subcategory' && <CreateSubcategoryForm />} 
        {selectedForm === 'carousel' && <CreateCarousel />}
        {selectedForm === 'priceList' && <CreatePriceList />}
      </div>
    );
  };

export default Dashboard;
