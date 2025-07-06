'use client'
import { TBrand, TCategory, TSubCategory, TPriceList, TProduct } from '@/app/types'
import React, { useEffect, useState } from 'react'
import { CldImage, CldUploadButton } from 'next-cloudinary'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import toast from 'react-hot-toast'

interface EditProductFormProps {
  product: TProduct & {
    brand?: { brandName: string }
    category?: { catName: string }
    subcategory?: { subcatName: string }
    priceList?: { priceName: string }
  }
  onProductUpdated: () => void
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onProductUpdated }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description || '')
  const [isRecommended, setIsRecommended] = useState(product.isRecommended || false)
  const [brands, setBrands] = useState<TBrand[]>([])
  // Ürün verisinden direkt brandName, catName vb. alanlarını kullan
  const [selectedBrand, setSelectedBrand] = useState(product.brandName || product.brand?.brandName || '')
  const [imageUrl, setImageUrl] = useState(product.imageUrl || '')
  const [categories, setCategories] = useState<TCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState(product.catName || product.category?.catName || '')
  const [subcategories, setSubcategories] = useState<TSubCategory[]>([])
  const [selectedSubcategory, setSelectedSubcategory] = useState(product.subcatName || product.subcategory?.subcatName || '')
  const [priceLists, setPriceLists] = useState<TPriceList[]>([])
  const [selectedPriceList, setSelectedPriceList] = useState(product.priceName || product.priceList?.priceName || '')
  const [metaTitle, setMetaTitle] = useState(product.metaTitle || '')
  const [metaDescription, setMetaDescription] = useState(product.metaDescription || '')
  const [metaKeywords, setMetaKeywords] = useState(product.metaKeywords || '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch('/api/categories')
      const catNames = await res.json()
      setCategories(catNames.data)
    }
    fetchAllCategories()
  }, [])

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        const res = await fetch(`/api/categories/${selectedCategory}/subcategories`)
        if (res.ok) {
          const subcatData = await res.json()
          setSubcategories(subcatData.data)
        } else {
          setSubcategories([])
        }
      } else {
        setSubcategories([])
      }
    }

    // Eğer kategori değiştirilirse alt kategoriyi temizle
    if (selectedCategory !== (product.catName || product.category?.catName)) {
      setSelectedSubcategory('')
    }
    fetchSubcategories()
  }, [selectedCategory, product.category?.catName])

  useEffect(() => {
    const fetchAllBrands = async () => {
      const res = await fetch('/api/brands')
      const brandNames = await res.json()
      setBrands(brandNames.data)
    }
    fetchAllBrands()
  }, [])

  useEffect(() => {
    const fetchAllPriceLists = async () => {
      const res = await fetch('/api/pricelists')
      const priceLists = await res.json()
      setPriceLists(priceLists)
    }
    fetchAllPriceLists()
  }, [])

  // Ürün açıldığında mevcut kategori için alt kategorileri yükle
  useEffect(() => {
    const initialCategory = product.catName || product.category?.catName
    if (initialCategory && categories.length > 0) {
      const fetchInitialSubcategories = async () => {
        const res = await fetch(`/api/categories/${initialCategory}/subcategories`)
        if (res.ok) {
          const subcatData = await res.json()
          setSubcategories(subcatData.data)
        }
      }
      fetchInitialSubcategories()
    }
  }, [categories, product.catName, product.category?.catName])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !description) {
      toast.error('Lütfen isim ve açıklama alanlarını doldurunuz.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
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
      })

      if (res.ok) {
        toast.success('Ürün başarıyla güncellendi!')
        setOpen(false)
        onProductUpdated()
      } else {
        const error = await res.json()
        toast.error(error.message || 'Ürün güncellenirken bir hata oluştu.')
      }
    } catch (error) {
      toast.error('Ürün güncellenirken bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setName(product.name)
    setDescription(product.description || '')
    setIsRecommended(product.isRecommended || false)
    setSelectedBrand(product.brandName || product.brand?.brandName || '')
    setImageUrl(product.imageUrl || '')
    setSelectedCategory(product.catName || product.category?.catName || '')
    setSelectedSubcategory(product.subcatName || product.subcategory?.subcatName || '')
    setSelectedPriceList(product.priceName || product.priceList?.priceName || '')
    setMetaTitle(product.metaTitle || '')
    setMetaDescription(product.metaDescription || '')
    setMetaKeywords(product.metaKeywords || '')
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (newOpen) {
        // Dialog açıldığında form verilerini sıfırla/yenile
        resetForm()
      }
      setOpen(newOpen)
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Düzenle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ürün Düzenle: {product.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 space-y-4">
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Ürün Adı"
            required
          />
          
          <Textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Ürün Açıklaması"
            required
          />
          
          <label className="flex items-center gap-2">
            <input 
              checked={isRecommended} 
              onChange={e => setIsRecommended(e.target.checked)} 
              type="checkbox" 
            />
            Tavsiye Edilen Ürünler
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

          <div className="space-y-2">
            <p className="font-bold text-lg">SEO</p>
            <p className="text-gray-500 text-sm">Başlıklar genellikle 60-70 karakter arasında olmalıdır.</p>
            <Input
              value={metaTitle}
              onChange={e => setMetaTitle(e.target.value)}
              type="text"
              placeholder="Meta Title"
              maxLength={60}
            />
            <p className="text-gray-500 text-sm">Meta açıklamalar 150-160 karakter arasında olmalıdır.</p>
            <Textarea
              value={metaDescription}
              onChange={e => setMetaDescription(e.target.value)}
              placeholder="Meta Description"
              maxLength={160}
            />
            <p className="text-gray-500 text-sm">Meta anahtar kelimeler artık SEO için kullanılmamaktadır. Ama istenirse 255 karaktere kadar virgüller ile ayırarak yazılabilir.</p>
            <Input
              value={metaKeywords}
              onChange={e => setMetaKeywords(e.target.value)}
              type="text"
              placeholder="Meta Keywords"
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Ürün Resmi</p>
            <div className="flex flex-col gap-2">
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
              </div>
              {imageUrl && (
                <CldImage
                  width="80"
                  height="80"
                  src={imageUrl}
                  sizes="100vw"
                  alt={name}
                />
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              variant="default" 
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Güncelleniyor...' : 'Ürünü Güncelle'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              İptal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProductForm
