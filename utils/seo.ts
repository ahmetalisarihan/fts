import { Metadata } from 'next'

interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  category?: string
  tags?: string[]
}

const defaultSEO = {
  siteName: 'FTS - Fetes Endüstriyel Yapı Malzemeleri',
  siteUrl: 'https://www.fetesendustriyelyapi.com.tr',
  defaultTitle: 'FTS - Fetes Endüstriyel Yapı Malzemeleri',
  defaultDescription: 'Kaliteli yangın güvenlik sistemleri, su pompaları ve endüstriyel çözümler. Türkiye\'nin güvenilir endüstriyel yapı malzemeleri tedarikçisi.',
  defaultImage: '/api/og',
  twitterHandle: '@fts_endustriyel',
  locale: 'tr_TR',
  defaultKeywords: [
    'yangın güvenlik sistemleri',
    'su pompaları',
    'endüstriyel malzemeler',
    'yapı malzemeleri',
    'güvenlik sistemleri',
    'yangın söndürme',
    'endüstriyel çözümler',
    'Türkiye'
  ]
}

export function generateMetadata(config: SEOConfig = {}): Metadata {
  const {
    title,
    description = defaultSEO.defaultDescription,
    keywords = [],
    image = defaultSEO.defaultImage,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    category,
    tags = []
  } = config

  const fullTitle = title 
    ? `${title} | ${defaultSEO.siteName}`
    : defaultSEO.defaultTitle

  const fullUrl = url 
    ? `${defaultSEO.siteUrl}${url}`
    : defaultSEO.siteUrl

  const allKeywords = [
    ...defaultSEO.defaultKeywords,
    ...keywords,
    ...tags
  ].join(', ')

  const metadata: Metadata = {
    metadataBase: new URL(defaultSEO.siteUrl),
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: author ? [{ name: author }] : [{ name: 'FTS' }],
    creator: 'FTS',
    publisher: 'FTS',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: defaultSEO.locale,
      url: fullUrl,
      title: fullTitle,
      description,
      siteName: defaultSEO.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || defaultSEO.defaultTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(category && { section: category }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: defaultSEO.twitterHandle,
      images: [image],
    },
    alternates: {
      canonical: fullUrl,
    },
    category,
  }

  return metadata
}

export function generateProductMetadata(product: {
  name: string
  description: string
  price?: number
  brand?: string
  category: string
  images?: string[]
  sku?: string
  availability?: 'in_stock' | 'out_of_stock'
  slug: string
}) {
  const {
    name,
    description,
    price,
    brand,
    category,
    images = [],
    sku,
    availability = 'in_stock',
    slug
  } = product

  return generateMetadata({
    title: name,
    description: `${description} - ${brand ? `${brand} markası` : 'Kaliteli'} ${category.toLowerCase()} ürünü. ${price ? `Fiyat: ${price} TL` : 'Uygun fiyat'}`,
    keywords: [name, brand, category, 'fiyat', 'satış'].filter(Boolean) as string[],
    image: images[0] || defaultSEO.defaultImage,
    url: `/products/${slug}`,
    type: 'article',
    category,
    tags: [name, brand, category, sku].filter(Boolean) as string[]
  })
}

export function generateCategoryMetadata(category: {
  name: string
  description?: string
  slug: string
  productCount?: number
}) {
  const {
    name,
    description,
    slug,
    productCount
  } = category

  const metaDescription = description || 
    `${name} kategorisindeki kaliteli ürünler. ${productCount ? `${productCount} farklı ürün` : 'Geniş ürün yelpazesi'} ile ihtiyaçlarınıza çözüm.`

  return generateMetadata({
    title: name,
    description: metaDescription,
    keywords: [name, 'kategori', 'ürünler', 'fiyat'],
    url: `/categories/${slug}`,
    category: name
  })
}

export const defaultSEOConfig = defaultSEO
