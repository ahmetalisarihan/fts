'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { TPriceList } from '@/app/types';

const CreatePriceList = () => {
    const [priceName, setPriceName] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const data: TPriceList = { priceName, pdfUrl };

        try {
            const response = await fetch('/api/pricelists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Fiyat listesi oluşturulamadı.');
            } else {
                setSuccess('Fiyat listesi başarıyla oluşturuldu!');
                setPriceName('');
                setPdfUrl('');
            }
        } catch (error) {
            console.error(error);
            setError('Bir hata oluştu.');
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-2xl font-bold my-4">Fiyat Listesi Oluştur</p>
            <Input
            type="text"
            value={priceName}
            onChange={(e) => setPriceName(e.target.value)}
            placeholder="Fiyat Listesi Adı"
            />
            <Input
            type="text"
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
            placeholder="PDF Url"
            />
            <Button type="submit" variant='default' size='default' className='max-w-[250px] m-auto'>
            Fiyat Listesi Oluştur
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </form>
    </div>
  )
}

export default CreatePriceList