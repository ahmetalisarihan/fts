'use client'
import { TBrand, TCategory, TSubCategory, TPriceList } from '@/app/types'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CldImage, CldUploadButton } from 'next-cloudinary'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'


const CreateProductForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isRecommended, setIsRecommended] = useState(false)
  const [brands, setBrands] = useState<TBrand[]>([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [categories, setCategories] = useState<TCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [subcategories, setSubcategories] = useState<TSubCategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [priceLists, setPriceLists] = useState<TPriceList[]>([])
  const [selectedPriceList, setSelectedPriceList] = useState('')
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('');

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
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        const res = await fetch(`/api/categories/${selectedCategory}/subcategories`);
        if (res.ok) {
          const subcatData = await res.json();
          setSubcategories(subcatData);
        } else {
          setSubcategories([]);
        }
      } else {
        setSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

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
      e.preventDefault();
      if (!name || !description) {
        setError('Lütfen isim ve açıklama alanlarını doldurunuz.');
        return;
      }
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          isRecommended,
          imageUrl,
          selectedBrand,
          selectedCategory,
          selectedSubcategory,
          selectedPriceList,
          metaTitle,
          metaDescription,
          metaKeywords,
        }),
      });
      if (res.ok) {
        setName('');
        setDescription('');
        setSelectedBrand('');
        setSelectedCategory('');
        setSelectedSubcategory('');
        setSelectedPriceList('');
        setImageUrl('');
        setIsRecommended(false);
        setSuccess('Başarıyla ürün eklendi!');
        setError('');
      } else {
        const error = await res.json();
        setError(error);
        setSuccess('');
      }
    };


  return (
    <div>
      <p className='text-2xl font-bold my-4'>Ürün Oluştur</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <Input
    value={name}
    onChange={e => setName(e.target.value)}
    type="text"
    placeholder="Ürün Adı"
    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  />
  <Textarea
    value={description}
    onChange={e => setDescription(e.target.value)}
    placeholder="Ürün Açıklaması"
    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  />
        <label >
          <input checked={isRecommended} onChange={e => setIsRecommended(e.target.checked)} type="checkbox" /> Tavsiye Edilen Ürünler
        </label>
        <select
  value={selectedBrand}
  onChange={(e) => setSelectedBrand(e.target.value)}
  className="p-3 rounded-md border appearance-none"
>
  <option value="">Marka Seçiniz</option>
  {brands &&
    brands.map((brand) => (
      <option key={brand.id} value={brand.brandName}>
        {brand.brandName}
      </option>
    ))}
</select>

<select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  className="p-3 rounded-md border appearance-none"
>
  <option value="">Kategori Seçiniz</option>
  {categories &&
    categories.map((category) => (
      <option key={category.id} value={category.catName}>
        {category.catName}
      </option>
    ))}
</select>

{selectedCategory && (
  <select
    value={selectedSubcategory}
    onChange={(e) => setSelectedSubcategory(e.target.value)}
    className="p-3 rounded-md border appearance-none"
    disabled={!subcategories.length}
  >
    <option value="">Alt Kategori Seçiniz</option>
    {subcategories.length > 0 &&
      subcategories.map((subcategory) => (
        <option key={subcategory.id} value={subcategory.subcatName}>
          {subcategory.subcatName}
        </option>
      ))}
    {!subcategories.length && (
      <option disabled>Seçili kategori için alt kategori bulunamadı.</option>
    )}
  </select>
)}

<select
  value={selectedPriceList}
  onChange={(e) => setSelectedPriceList(e.target.value)}
  className="p-3 rounded-md border appearance-none"
>
  <option value="">Fiyat Listesi Seçiniz</option>
  {priceLists &&
    priceLists.map((priceList) => (
      <option key={priceList.id} value={priceList.priceName}>
        {priceList.priceName}
      </option>
    ))}

</select>
<p className='font-bold text-lg'>SEO</p>
        <p className='text-gray-500 text-sm'>Başlıklar genellikle 60-70 karakter arasında olmalıdır.</p>
        <Input
          value={metaTitle}
          onChange={e => setMetaTitle(e.target.value)}
          type="text"
          placeholder="Meta Title"
          maxLength={60}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className='text-gray-500 text-sm'>Meta açıklamalar 150-160 karakter arasında olmalıdır.</p>
        <Textarea
          value={metaDescription}
          onChange={e => setMetaDescription(e.target.value)}
          placeholder="Meta Description"
          maxLength={160}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className='text-gray-500 text-sm'>Meta anahtar kelimeler artık SEO için kullanılmamaktadır. Ama istenirse 255 karaktere kadar virgüller ile ayırarak yazilabilir.</p>
        <Input
          value={metaKeywords}
          onChange={e => setMetaKeywords(e.target.value)}
          type="text"
          placeholder="Meta Keywords"
          maxLength={255}
          className="..."
        />
        <div className=''>
        <div className="max-w-[180px] p-6 flex justify-center items-center bg-sky-500 hover:bg-sky-700 focus:ring-sky-500 focus:ring-offset-sky-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
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
</div>



        </div>
        <Button type='submit' variant='default' size='default' className='max-w-[250px] m-auto'>Ürün Oluştur</Button>

        {error && <div className='p-2 text-red-500 font-bold'>{error}</div>}
        {success && <p className="p-2 text-green-500 font-bold">{success}</p>}

      </form>
    </div>
  )
}

export default CreateProductForm