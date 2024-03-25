'use client'
import { TBrand, TCategory } from '@/app/types'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CldImage, CldUploadButton } from 'next-cloudinary'
import UploadButton from './UploadButton'


const CreateProductForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [brands, setBrands] = useState<TBrand[]>([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [categories, setCategories] = useState<TCategory[]>([])
  const [seletedCategory, setSelectedCategory] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch('/api/categories')
      const catNames = await res.json()
      setCategories(catNames)
    }
    fetchAllCategories()
  } ,[])

  useEffect(() => {
    const fetchAllBrands = async () => {
      const res = await fetch('/api/brands')
      const brandNames = await res.json()
      setBrands(brandNames)
    }
    fetchAllBrands()
  }
  ,[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!name || !description ) {
      setError('Lütfen isim ve açıklama alanlarını doldurunuz.')
      return
    }
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        imageUrl,
        selectedBrand,
        seletedCategory
      })
    })
    if(res.ok) {
      setError('')
      setName('')
      setDescription('')
      setImageUrl('')
      setSelectedBrand('')
      setSelectedCategory('')
    } else {
      const error = await res.json()
      setError(error)
    }
  }


  return (
    <div>
        <p className='text-2xl font-bold my-4'>Ürün Oluştur</p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <input onChange={e => setName(e.target.value)} type="text" placeholder="Ürün Adı" />
            <textarea onChange={e => setDescription(e.target.value)} placeholder="Ürün Açıklaması" />
            <CldUploadButton
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result) => {
                    setImageUrl((result?.info as { secure_url: string })?.secure_url || "");
                }}  
            >
                Resim Yükle
            </CldUploadButton>
            {imageUrl &&
              <CldImage
                width="80"
                height="80"
                src={imageUrl}
                sizes="100vw"
                alt={name}
              />
            }

            <select onChange={e => setSelectedBrand(e.target.value)} className='p-3 rounded-md border appearance-none'>
                <option value="">Marka Seçiniz</option>
                {brands && brands.map((brand) => (
                    <option key={brand.id} value={brand.brandName}>{brand.brandName}</option>
                ))}
            </select>
            <select onChange={e => setSelectedCategory(e.target.value)} className='p-3 rounded-md border appearance-none'>
                <option value="">Kategori Seçiniz</option>
                {categories && categories.map((category) => (
                    <option key={category.id} value={category.catName}>{category.catName}</option>
                ))}
            </select>
            <button className='primary-btn' type='submit'>Ürün Oluştur</button>
            {error && <div className='p-2 text-red-500 font-bold'>{error}</div>}
            <UploadButton />
        </form>
    </div>
  )
}

export default CreateProductForm