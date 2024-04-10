'use client'

import { useState } from 'react';
import { CategoryData } from '@/app/types'; // Tip tanımını içe aktarın

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

                <input
                    type="text"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    placeholder="Kategori Adı"
                />


                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Açıklama"
                />

                <button type="submit" className="bg-blue-500 max-w-[250px] m-auto  text-white px-4 py-2 rounded">Kategori Oluştur</button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            
        </form>
    );
};

export default CreateCategoryForm;