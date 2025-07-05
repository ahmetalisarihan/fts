'use client';

import { useEffect, useState } from 'react';
import { CategoryData, SubcategoryData } from '@/app/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const ManageSubcategories = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [subcategories, setSubcategories] = useState<SubcategoryData[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingSubcategory, setEditingSubcategory] = useState<SubcategoryData | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error(error);
        setError('Kategoriler getirilemedi.');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`/api/subcategories?catName=${selectedCategory}`);
        const data = await response.json();
        setSubcategories(data.subcategories || []);
      } catch (error) {
        console.error(error);
        setError('Alt kategoriler getirilemedi.');
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  const handleDelete = async (subcatName: string) => {
    try {
      const response = await fetch(`/api/subcategories`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subcatName }),
      });

      if (!response.ok) {
        setError('Alt kategori silinemedi.');
      } else {
        setSuccess('Alt kategori başarıyla silindi!');
        setSubcategories((prev) =>
          prev.filter((subcategory) => subcategory.subcatName !== subcatName)
        );
      }
    } catch (error) {
      console.error(error);
      setError('Bir hata oluştu.');
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!editingSubcategory) return;
  
    // Veriyi konsola yazdırarak kontrol edin
    console.log('Düzenlenecek Veri:', editingSubcategory);
  
    try {
      const response = await fetch('/api/subcategories', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSubcategory),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Alt kategori düzenlenemedi.');
      } else {
        setSuccess('Alt kategori başarıyla düzenlendi!');
        setEditingSubcategory(null);
        setSubcategories((prev) =>
          prev.map((subcategory) =>
            subcategory.subcatName === editingSubcategory.subcatName
              ? editingSubcategory
              : subcategory
          )
        );
      }
    } catch (error) {
      console.error('Frontend hata:', error);
      setError('Bir hata oluştu.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Alt Kategorileri Yönet</h2>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border rounded p-2 mb-4"
      >
        <option value="">Kategori Seçin</option>
        {categories.map((category) => (
          <option key={category.catName} value={category.catName}>
            {category.catName}
          </option>
        ))}
      </select>

      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory.subcatName} className="flex justify-between items-center border-b py-2">
            <span>{subcategory.subcatName}</span>
            <div className='space-x-2'>
              <Button
                onClick={() => setEditingSubcategory(subcategory)}
                variant="outline"
                size="sm"
              >
                Düzenle
              </Button>
              <Button
                onClick={() => handleDelete(subcategory.subcatName)}
                variant="destructive"
                size="sm"
              >
                Sil
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {editingSubcategory && (
        <form onSubmit={handleEdit} className="mt-4 border-t pt-4 space-y-2">
          <h3 className="text-lg font-semibold ">Alt Kategori Düzenle</h3>
          <Input
            type="text"
            value={editingSubcategory.subcatName}
            onChange={(e) =>
              setEditingSubcategory({ ...editingSubcategory, subcatName: e.target.value })
            }
            placeholder="Alt Kategori Adı"
          />
          <Textarea
            value={editingSubcategory.description}
            onChange={(e) =>
              setEditingSubcategory({ ...editingSubcategory, description: e.target.value })
            }
            placeholder="Açıklama"
          />
          <Button type="submit" variant="default">
            Kaydet
          </Button>
          <Button
            onClick={() => setEditingSubcategory(null)}
            variant="outline"
            className="ml-2"
          >
            İptal
          </Button>
        </form>
      )}

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default ManageSubcategories;