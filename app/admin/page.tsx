'use client'

import { useState } from 'react';
import CreateCategoryForm from '@/components/Create/CreateCategoryForm';
import CreateProductForm from '@/components/Create/CreateProductForm';
import CreateSubcategoryForm from '@/components/Create/CreateSubcategoryForm';

const AdminPage = () => {
  const [selectedForm, setSelectedForm] = useState('product');

  const handleFormChange = (formType: 'product' | 'category' | 'subcategory') => {
    setSelectedForm(formType);
  };

  return (
    <div>
      <h2>Admin Paneli</h2>
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            selectedForm === 'product' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleFormChange('product')}
        >
          Ürün Oluştur
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedForm === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleFormChange('category')}
        >
          Kategori Oluştur
        </button>
        {/* Yeni buton */}
        <button
          className={`px-4 py-2 rounded ${
            selectedForm === 'subcategory' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleFormChange('subcategory')}
        >
          Alt Kategori Oluştur
        </button>
      </div>

      {selectedForm === 'product' && <CreateProductForm />}
      {selectedForm === 'category' && <CreateCategoryForm />}
      {selectedForm === 'subcategory' && <CreateSubcategoryForm />} 
    </div>
  );
};

export default AdminPage;