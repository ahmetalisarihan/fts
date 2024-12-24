'use client';

import React, { useState } from 'react';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const CreateCampaigns = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!imageUrl || !link) {
            setError('Lütfen resim yükleyin ve link girin.');
            return;
        }

        try {
            const response = await fetch('/api/campaigns', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl, link }), // title yerine imageUrl ve link
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Kampanya oluşturulamadı.');
            } else {
                setSuccess('Kampanya başarıyla oluşturuldu!');
                setImageUrl('');
                setLink('');
            }
        } catch (error) {
            console.error('API hatası:', error);
            setError('Sunucu tarafında bir hata oluştu.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className='text-2xl font-bold my-4'>Kampanya Oluştur</p>
            <div className='space-y-2'>
                <Input 
                    value={link}
                    onChange={e => setLink(e.target.value)} 
                    type="text" 
                    placeholder="Kampanya Bağlantısını Girin" 
                />
                <Button className="max-w-[180px] p-6 flex justify-center items-center bg-sky-500 hover:bg-sky-700 focus:ring-sky-500 focus:ring-offset-sky-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"></path>
                    </svg>
                    <CldUploadButton
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                        onSuccess={(result) => {
                            setImageUrl((result?.info as { secure_url: string })?.secure_url || "");
                        }}
                    >
                        Resim Yükle
                    </CldUploadButton>
                </Button>
                {imageUrl && (
                    <CldImage
                        width="80"
                        height="80"
                        src={imageUrl}
                        sizes="100vw"
                        alt="campaign"
                    />
                )}
            </div>
            <Button type="submit" variant="default" size="default" className="max-w-[250px] m-auto">Kampanya Oluştur</Button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </form>
    );
};

export default CreateCampaigns;