'use client'
import { TProduct } from '@/app/types';
import { generateProductMetadata } from '@/libs/metadata';
import { ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Tag, Building2, Package, FileText, Star, Share2, Phone, Mail } from 'lucide-react';

type Props = {
  params: { slug: string };
};

const ProductDetail = ({ params }: Props) => {
  const [product, setProduct] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageZoomed, setImageZoomed] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${params.slug}`, {
          cache: 'no-store'
        });
        
        if (res.ok) {
          const productData = await res.json();
          setProduct(productData);
        } else {
          setError('Ürün bulunamadı');
        }
      } catch (err) {
        setError('Ürün yüklenirken bir hata oluştu');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error || 'Ürün Bulunamadı!'}</h1>
          <p className="text-gray-600 mb-4">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
          <p className="text-sm text-gray-500">Slug: {params.slug}</p>
          <Link href="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header/Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Ana Sayfaya Dön</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: product.description || product.name,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Ürün linki panoya kopyalandı!');
                  }
                }}
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Paylaş</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">Ana Sayfa</Link>
            <span className="text-gray-400">/</span>
            {product.catName && (
              <>
                <Link href={`/categories/${encodeURIComponent(product.catName)}`} className="hover:text-gray-900 transition-colors">
                  {product.catName}
                </Link>
                <span className="text-gray-400">/</span>
              </>
            )}
            {product.subcatName && product.catName && (
              <>
                <Link href={`/categories/${encodeURIComponent(product.catName)}/subcategories/${encodeURIComponent(product.subcatName)}`} className="hover:text-gray-900 transition-colors">
                  {product.subcatName}
                </Link>
                <span className="text-gray-400">/</span>
              </>
            )}
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden bg-white shadow-lg cursor-pointer" onClick={() => setImageZoomed(true)}>
              <CardContent className="p-0">
                <div className="aspect-square relative bg-gray-50 flex items-center justify-center group">
                  <Image 
                    src={product.imageUrl || '/noimage.png'} 
                    alt={product.name || ''} 
                    width={600} 
                    height={600}
                    className="object-contain w-full h-full p-6 transition-transform group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 px-3 py-1 rounded">
                      Büyütmek için tıklayın
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Mobile Action Buttons */}
            <div className="lg:hidden space-y-3">
              <Link href="/iletisim">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                  <Phone className="h-5 w-5 mr-2" />
                  Fiyat Teklifi Al
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button variant="outline" className="w-full py-3 text-lg">
                  <Mail className="h-5 w-5 mr-2" />
                  İletişime Geç
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            
            {/* Product Title & Badge */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                {product.isRecommended && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-current" />
                    <span>Tavsiye</span>
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Details */}
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6 space-y-4">
                
                {/* Brand */}
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-gray-500 block">Marka</span>
                    <Link 
                      href={`/brands/${encodeURIComponent(product.brandName || '')}`} 
                      className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {product.brandName || 'Belirtilmemiş'}
                    </Link>
                  </div>
                </div>

                <Separator />

                {/* Category */}
                <div className="flex items-center space-x-3">
                  <Tag className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-gray-500 block">Kategori</span>
                    <div className="flex items-center space-x-2">
                      {product.catName && (
                        <Link 
                          href={`/categories/${encodeURIComponent(product.catName)}`} 
                          className="font-semibold text-green-600 hover:text-green-800 transition-colors"
                        >
                          {product.catName}
                        </Link>
                      )}
                      {product.catName && product.subcatName && (
                        <>
                          <span className="text-gray-400">/</span>
                          <Link 
                            href={`/categories/${encodeURIComponent(product.catName)}/subcategories/${encodeURIComponent(product.subcatName)}`} 
                            className="font-semibold text-green-600 hover:text-green-800 transition-colors"
                          >
                            {product.subcatName}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Price List */}
                {product.priceName && (
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-gray-500 block">Fiyat Listesi</span>
                      <Link 
                        href={`/pricelists/${product.priceName}`} 
                        target="_blank"
                        className="font-semibold text-purple-600 hover:text-purple-800 transition-colors inline-flex items-center space-x-1"
                      >
                        <span>{product.priceName}</span>
                        <Package className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            {product.description && (
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <span>Ürün Açıklaması</span>
                  </h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {product.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Desktop Action Buttons */}
            <div className="hidden lg:block space-y-3">
              <Link href="/iletisim">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold">
                  <Phone className="h-5 w-5 mr-2" />
                  Fiyat Teklifi Al
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button variant="outline" className="w-full py-4 text-lg">
                  <Mail className="h-5 w-5 mr-2" />
                  İletişime Geç
                </Button>
              </Link>
            </div>

            {/* Meta Information */}
            {(product.metaTitle || product.metaDescription || product.metaKeywords) && (
              <Card className="bg-gray-50 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Teknik Bilgiler</h3>
                  <div className="space-y-2 text-sm">
                    {product.metaTitle && (
                      <div>
                        <span className="font-medium text-gray-600">Meta Başlık:</span>
                        <p className="text-gray-800">{product.metaTitle}</p>
                      </div>
                    )}
                    {product.metaDescription && (
                      <div>
                        <span className="font-medium text-gray-600">Meta Açıklama:</span>
                        <p className="text-gray-800">{product.metaDescription}</p>
                      </div>
                    )}
                    {product.metaKeywords && (
                      <div>
                        <span className="font-medium text-gray-600">Anahtar Kelimeler:</span>
                        <p className="text-gray-800">{product.metaKeywords}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {imageZoomed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setImageZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
              onClick={() => setImageZoomed(false)}
            >
              <span className="text-2xl">×</span>
            </button>
            <Image 
              src={product.imageUrl || '/noimage.png'} 
              alt={product.name || ''} 
              width={800} 
              height={800}
              className="object-contain max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
