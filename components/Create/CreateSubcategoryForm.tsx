'use client';

import { useState, useEffect } from 'react';
import { CategoryData, SubcategoryData } from '@/app/types';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

const CreateSubcategoryForm = () => {
  const [subcatName, setSubcatName] = useState('');
  const [description, setDescription] = useState('');
  const [catName, setCatName] = useState('');
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Kategorileri getir
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories'); // Kategorileri çeken API endpoint'iniz
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
        setError('Kategoriler getirilemedi.');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data: SubcategoryData = { subcatName, description, catName };

    try {
      const response = await fetch('/api/subcategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Alt kategori oluşturulamadı.');
      } else {
        setSuccess('Alt kategori başarıyla oluşturuldu!');
        setSubcatName('');
        setDescription('');
        setCatName(''); // Veya dropdown'ı sıfırlayın
      }
    } catch (error) {
      console.error(error);
      setError('Bir hata oluştu.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className='text-2xl font-bold my-4'>Alt Kategori Oluştur</p>
      <Input
        type="text"
        value={subcatName}
        onChange={(e) => setSubcatName(e.target.value)}
        placeholder="Alt Kategori Adı"
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Açıklama"
      />

      <select value={catName} onChange={(e) => setCatName(e.target.value)} className="border rounded p-2">
        <option value="">Kategori Seçin</option>
        {categories.map((category) => (
          <option key={category.id} value={category.catName}>
            {category.catName}
          </option>
        ))}
      </select>
      <Button type='submit' variant='default' size='default' className='max-w-[250px] m-auto'>Alt Kategori Oluştur</Button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default CreateSubcategoryForm;