'use client'

import { useState } from 'react';
import { CategoryData } from '@/app/types'; // Tip tanımını içe aktarın
import { Button } from '../ui/button';
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

const CreateCategoryForm = () => {
    const [catName, setCatName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const data: CategoryData = { catName, description };

        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Kategori oluşturulamadı.');
            } else {
                setSuccess('Kategori başarıyla oluşturuldu!');
                setCatName('');
                setDescription('');
            }
        } catch (error) {
            console.error(error);
            setError('Bir hata oluştu.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-2xl font-bold my-4">Kategori Oluştur</p>

                <Input
                    type="text"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    placeholder="Kategori Adı"
                />

                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Açıklama"
                />
               <Button type='submit' variant='default' size='default' className='max-w-[250px] m-auto'>Kategori Oluştur</Button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            
        </form>
    );
};

export default CreateCategoryForm;