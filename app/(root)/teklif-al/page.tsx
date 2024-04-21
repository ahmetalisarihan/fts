'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangeEvent, FormEvent, useState } from 'react';


type FormData = {
  name: string;
  phone: string;
  email: string;
  companyName: string;
  address: string;
};

const ProposalForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    address: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/teklif', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert('Teklifiniz başarıyla gönderildi!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        companyName: '',
        address: '',
      });
    } else {
      alert('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  return (
    <div>
        <p className='font-bold mt-4 text-xl'>Teklif Formu</p>
    <p className='text-sm text-gray-500 mt-1'>Teklif almak için formu doldurunuz.</p>
  
    <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-3'>

      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Adınız ve Soyadınız" required />
      <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon Numaranız" required />
      <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email Adresiniz" required />
      <Input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Şirket Adınız" required />
      <Input name="address" value={formData.address} onChange={handleChange} placeholder="Addresiniz"  />
      <Button type="submit">Teklif Al</Button>
    </form>
    <p className='mt-3 font-bold'>
      En kısa sürede size dönüş yapılacaktır.
    </p>
    </div>
  );
};

export default ProposalForm;