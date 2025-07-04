import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import StructuredData from './StructuredData'
import { generateBreadcrumbSchema } from '@/utils/structured-data'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const allItems = [
    { name: 'Ana Sayfa', url: '/' },
    ...items
  ]

  return (
    <>
      <StructuredData schema={generateBreadcrumbSchema(allItems)} />
      <nav 
        className={`flex items-center space-x-2 text-sm text-gray-600 py-2 ${className}`}
        aria-label="Breadcrumb"
      >
        <Link 
          href="/" 
          className="flex items-center hover:text-gray-900 transition-colors"
          aria-label="Ana Sayfaya Git"
        >
          <Home size={16} />
        </Link>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={16} className="text-gray-400" />
            {index === items.length - 1 ? (
              <span 
                className="text-gray-900 font-medium"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.url}
                className="hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  )
}

export default Breadcrumb
