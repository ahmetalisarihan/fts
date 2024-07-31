'use client'

import { useState } from 'react';
import { BrandData } from '@/app/types'; 
import { Button } from '../ui/button';
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

const CreateBrandForm = () => {
    const [brandName, setBrandName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const data: BrandData = { brandName, description };

        try {
            const response = await fetch('/api/brands', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Marka oluşturulamadı.');
            } else {
                setSuccess('Marka başarıyla oluşturuldu!');
                setBrandName('');
                setDescription('');
            }
        } catch (error) {
            console.error(error);
            setError('Bir hata oluştu.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-2xl font-bold my-4">Marka Oluştur</p>

                <Input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Marka Adı"
                />

                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Açıklama"
                />
               <Button type='submit' variant='default' size='default' className='max-w-[250px] m-auto'>Marka Oluştur</Button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            
        </form>
    );
};

export default CreateBrandForm;