import { defaultSEOConfig } from './seo'

// Organization Schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FTS - Fetes Endüstriyel Yapı Malzemeleri',
    alternateName: 'FTS',
    url: defaultSEOConfig.siteUrl,
    logo: `${defaultSEOConfig.siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-539-516-0183',
      contactType: 'customer service',
      areaServed: 'TR',
      availableLanguage: 'Turkish'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR'
    },
    sameAs: [
      // Sosyal medya linklerini buraya ekleyebilirsiniz
    ]
  }
}

// Website Schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultSEOConfig.siteName,
    url: defaultSEOConfig.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${defaultSEOConfig.siteUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

// Product Schema
export function generateProductSchema(product: {
  name: string
  description: string
  image: string[]
  sku?: string
  brand?: string
  category: string
  price?: number
  currency?: string
  availability?: 'in_stock' | 'out_of_stock'
  condition?: 'new' | 'used' | 'refurbished'
  url: string
}) {
  const {
    name,
    description,
    image,
    sku,
    brand,
    category,
    price,
    currency = 'TRY',
    availability = 'in_stock',
    condition = 'new',
    url
  } = product

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url: `${defaultSEOConfig.siteUrl}${url}`,
    category,
    brand: brand ? {
      '@type': 'Brand',
      name: brand
    } : undefined,
    sku,
    productCondition: `https://schema.org/${condition === 'new' ? 'NewCondition' : condition === 'used' ? 'UsedCondition' : 'RefurbishedCondition'}`,
  }

  // Fiyat bilgisi varsa ekle
  if (price) {
    schema.offers = {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: currency,
      availability: `https://schema.org/${availability === 'in_stock' ? 'InStock' : 'OutOfStock'}`,
      seller: {
        '@type': 'Organization',
        name: 'FTS - Fetes Endüstriyel Yapı Malzemeleri'
      }
    }
  }

  return schema
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{
  name: string
  url: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${defaultSEOConfig.siteUrl}${item.url}`
    }))
  }
}

// LocalBusiness Schema (Eğer fiziksel mağaza varsa)
export function generateLocalBusinessSchema(business?: {
  name?: string
  address?: string
  telephone?: string
  openingHours?: string[]
  geo?: {
    latitude: number
    longitude: number
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${defaultSEOConfig.siteUrl}#business`,
    name: business?.name || 'FTS - Fetes Endüstriyel Yapı Malzemeleri',
    url: defaultSEOConfig.siteUrl,
    telephone: business?.telephone || '+90-539-516-0183',
    address: business?.address ? {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressCountry: 'TR'
    } : undefined,
    geo: business?.geo ? {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude
    } : undefined,
    openingHours: business?.openingHours || ['Mo-Fr 09:00-18:00'],
    priceRange: '$$'
  }
}

// FAQ Schema
export function generateFAQSchema(faqs: Array<{
  question: string
  answer: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Article Schema (Blog yazıları için)
export function generateArticleSchema(article: {
  title: string
  description: string
  image: string
  publishedTime: string
  modifiedTime?: string
  author: string
  url: string
}) {
  const {
    title,
    description,
    image,
    publishedTime,
    modifiedTime,
    author,
    url
  } = article

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'FTS - Fetes Endüstriyel Yapı Malzemeleri',
      logo: {
        '@type': 'ImageObject',
        url: `${defaultSEOConfig.siteUrl}/logo.png`
      }
    },
    url: `${defaultSEOConfig.siteUrl}${url}`
  }
}
