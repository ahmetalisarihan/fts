'use client'

import { useState } from 'react';
import { CategoryData } from '@/app/types'; // Tip tanımını içe aktarın
import { Button } from '../ui/button';
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const CreateCategoryForm = () => {
    const [catName, setCatName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!catName.trim()) {
            toast.error('Kategori adı gereklidir!');
            return;
        }
        
        setIsLoading(true);
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
                const errorMessage = errorData.message || 'Kategori oluşturulamadı.';
                setError(errorMessage);
                toast.error(errorMessage);
            } else {
                const successMessage = 'Kategori başarıyla oluşturuldu!';
                setSuccess(successMessage);
                toast.success(successMessage);
                setCatName('');
                setDescription('');
            }
        } catch (error) {
            console.error(error);
            const errorMessage = 'Bir hata oluştu.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
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
                        'Kategori Oluştur'
                    )}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            
        </form>
    );
};

export default CreateCategoryForm;