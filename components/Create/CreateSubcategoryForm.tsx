'use client';

import { useState, useEffect } from 'react';
import { CategoryData, SubcategoryData } from '@/app/types';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const CreateSubcategoryForm = () => {
  const [subcatName, setSubcatName] = useState('');
  const [description, setDescription] = useState('');
  const [catName, setCatName] = useState('');
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Kategorileri getir
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const result = await response.json();
        
        if (result.success && result.data) {
          setCategories(result.data);
        } else {
          console.error('Kategori API hatası:', result);
          toast.error('Kategoriler getirilemedi.');
        }
      } catch (error) {
        console.error('Kategori fetch hatası:', error);
        toast.error('Kategoriler getirilemedi.');
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!subcatName.trim()) {
      toast.error('Alt kategori adı gereklidir!');
      return;
    }
    
    if (!catName) {
      toast.error('Ana kategori seçimi gereklidir!');
      return;
    }

    setIsLoading(true);
    const data: SubcategoryData = { subcatName: subcatName.trim(), description: description.trim(), catName };

    try {
      const response = await fetch('/api/subcategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || errorData.message || 'Alt kategori oluşturulamadı.';
        toast.error(errorMessage);
        console.error('API Error:', errorData);
      } else {
        toast.success('Alt kategori başarıyla oluşturuldu!');
        setSubcatName('');
        setDescription('');
        setCatName('');
      }
    } catch (error) {
      console.error(error);
      toast.error('Bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Kategoriler yükleniyor...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className='text-2xl font-bold my-4'>Alt Kategori Oluştur</p>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Alt Kategori Adı *</label>
        <Input
          type="text"
          value={subcatName}
          onChange={(e) => setSubcatName(e.target.value)}
          placeholder="Alt Kategori Adı"
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Açıklama</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Açıklama (opsiyonel)"
          disabled={isLoading}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Ana Kategori *</label>
        <Select value={catName} onValueChange={setCatName} disabled={isLoading}>
          <SelectTrigger>
            <SelectValue placeholder="Kategori seçin" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.catName}>
                {category.catName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        type='submit' 
        variant='default' 
        size='default' 
        className='max-w-[250px] m-auto'
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Oluşturuluyor...
          </>
        ) : (
          'Alt Kategori Oluştur'
        )}
      </Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
    </form>
  );
};

export default CreateSubcategoryForm;