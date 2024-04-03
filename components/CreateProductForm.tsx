'use client'
import { TBrand, TCategory, TPriceList } from '@/app/types'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CldImage, CldUploadButton } from 'next-cloudinary'


const CreateProductForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isRecommended, setIsRecommended] = useState(false)
  const [brands, setBrands] = useState<TBrand[]>([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [categories, setCategories] = useState<TCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceLists, setPriceLists] = useState<TPriceList[]>([])
  const [selectedPriceList, setSelectedPriceList] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch('/api/categories')
      const catNames = await res.json()
      setCategories(catNames)
    }
    fetchAllCategories()
  }, [])

  useEffect(() => {
    const fetchAllBrands = async () => {
      const res = await fetch('/api/brands')
      const brandNames = await res.json()
      setBrands(brandNames)
    }
    fetchAllBrands()
  }
    , [])

  useEffect(() => {
    const fetchAllPriceLists = async () => {
      const res = await fetch('/api/pricelists')
      const priceLists = await res.json()
      setPriceLists(priceLists)
    }
    fetchAllPriceLists()
  }
    , [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !description) {
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
        isRecommended,
        imageUrl,
        selectedBrand,
        selectedCategory,
        selectedPriceList,
      })
    })
    if (res.ok) {
      setError('')
      setName('')
      setDescription('')
      setImageUrl('')
      setSelectedBrand('')
      setSelectedCategory('')
      setSelectedPriceList('')

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
        <label >
          <input checked={isRecommended} onChange={e => setIsRecommended(e.target.checked)} type="checkbox" /> Tavsiye Edilen Ürünler
        </label>
        <p>Tavsiye Edilen: {isRecommended ? 'Evet' : 'Hayır'}</p>
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

        <select onChange={e => setSelectedPriceList(e.target.value)} className='p-3 rounded-md border appearance-none'>
          <option value="">Fiyat Listesi Seçiniz</option>
          {priceLists && priceLists.map((priceList) => (
            <option key={priceList.id} value={priceList.priceName}>{priceList.priceName}</option>
          ))}
        </select>
        <div className=''>
          <button type="button" className="max-w-[180px] py-2 px-4 flex justify-center items-center  bg-sky-500 hover:bg-sky-700 focus:ring-sky-500 focus:ring-offset-sky-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
              </path>
            </svg>
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
          </button>



        </div>
        <button className='max-w-[250px] m-auto primary-btn ' type='submit'>Ürün Oluştur</button>
        {error && <div className='p-2 text-red-500 font-bold'>{error}</div>}

      </form>
    </div>
  )
}

export default CreateProductForm