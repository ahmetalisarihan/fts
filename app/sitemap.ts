import { MetadataRoute } from 'next'
import { defaultSEOConfig } from '@/utils/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = defaultSEOConfig.siteUrl

  // Statik sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fiyat-listeleri`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kategoriler`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // TODO: Dinamik sayfalar eklemek için:
  // - Veritabanından kategorileri çek
  // - Veritabanından ürünleri çek
  // - Blog yazılarını çek (varsa)

  return staticPages
}
