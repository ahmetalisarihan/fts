'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  formatPrice, 
  formatDate, 
  createSlug, 
  capitalize,
  createWhatsAppUrl,
  copyToClipboard 
} from '@/utils/common'
import { useToggle, useCounter, useLocalStorage } from '@/hooks'
import { 
  CONTACT_INFO, 
  PAGINATION, 
  PRODUCT_AVAILABILITY,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES 
} from '@/constants'
import { api } from '@/services/api'
import type { Product, SearchParams } from '@/types'
import Breadcrumb from '@/components/Breadcrumb'

export default function CodeQualityTestPage(): JSX.Element {
  const [isVisible, toggleVisibility] = useToggle(false)
  const { count, increment, decrement, reset } = useCounter(0)
  const [testData, setTestData] = useLocalStorage<string>('code_quality_test', 'Default Value')
  const [loading, setLoading] = useState<boolean>(false)

  const handleApiTest = async (): Promise<void> => {
    setLoading(true)
    try {
      // Example API call with proper types
      const searchParams: SearchParams = {
        query: 'test',
        page: PAGINATION.DEFAULT_PAGE,
        limit: PAGINATION.DEFAULT_LIMIT,
      }
      
      await api.search.searchProducts(searchParams)
      console.log(SUCCESS_MESSAGES.SAVED)
    } catch (error) {
      console.error(ERROR_MESSAGES.GENERIC, error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyToClipboard = async (): Promise<void> => {
    const success = await copyToClipboard(CONTACT_INFO.PHONE)
    if (success) {
      console.log(SUCCESS_MESSAGES.COPIED)
    }
  }

  // Example product data with proper typing
  const exampleProduct: Partial<Product> = {
    name: 'Yangın Söndürme Sistemi',
    price: 1500,
    currency: 'TRY',
    availability: PRODUCT_AVAILABILITY.IN_STOCK,
    createdAt: new Date(),
    slug: createSlug('Yangın Söndürme Sistemi'),
  }

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb items={[
        { name: 'Code Quality Test', url: '/code-quality-test' }
      ]} />

      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold mb-4">Code Quality Test Sayfası</h1>
          <p className="text-gray-600">
            Bu sayfa kod kalitesi iyileştirmelerini test etmek için oluşturulmuştur.
          </p>
        </header>

        <section className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-2xl font-semibold">TypeScript & Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Örnek Product</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(exampleProduct, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="font-medium mb-2">Tip Güvenliği</h3>
              <ul className="text-sm space-y-1">
                <li>✅ Strict TypeScript mode aktif</li>
                <li>✅ Interface tanımları merkezi</li>
                <li>✅ Generic tipler kullanımı</li>
                <li>✅ Null safety kontrolleri</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-2xl font-semibold">Constants & Magic Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Constants Kullanımı</h3>
              <ul className="text-sm space-y-1">
                <li>📞 Telefon: {CONTACT_INFO.PHONE_DISPLAY}</li>
                <li>📧 Email: {CONTACT_INFO.EMAIL}</li>
                <li>📄 Sayfa Başına: {PAGINATION.DEFAULT_LIMIT}</li>
                <li>🔄 Stok Durumu: {PRODUCT_AVAILABILITY.IN_STOCK}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Magic Numbers Eliminated</h3>
              <ul className="text-sm space-y-1">
                <li>✅ API endpoints centralized</li>
                <li>✅ UI breakpoints defined</li>
                <li>✅ Animation durations constant</li>
                <li>✅ File size limits defined</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-2xl font-semibold">Utility Functions (DRY)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Format Functions</h3>
              <ul className="text-sm space-y-1">
                <li>💰 Fiyat: {formatPrice(1500)}</li>
                <li>📅 Tarih: {formatDate(new Date())}</li>
                <li>🔗 Slug: {createSlug('Yangın Söndürme Sistemi')}</li>
                <li>🔤 Capitalize: {capitalize('test string')}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Utility Actions</h3>
              <div className="space-y-2">
                <Button 
                  onClick={handleCopyToClipboard}
                  size="sm"
                  variant="outline"
                >
                  📋 Copy Phone Number
                </Button>
                <br />
                <a 
                  href={createWhatsAppUrl('Test mesajı')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button size="sm" variant="outline">
                    💬 WhatsApp Test
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-2xl font-semibold">Custom Hooks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">useToggle Hook</h3>
              <div className="space-y-2">
                <p className="text-sm">Visibility: {isVisible ? 'Visible' : 'Hidden'}</p>
                <Button onClick={toggleVisibility} size="sm">
                  Toggle Visibility
                </Button>
                {isVisible && (
                  <div className="p-2 bg-blue-100 rounded">
                    Bu içerik toggle ile gösteriliyor!
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">useCounter Hook</h3>
              <div className="space-y-2">
                <p className="text-sm">Count: {count}</p>
                <div className="space-x-2">
                  <Button onClick={increment} size="sm" variant="outline">+</Button>
                  <Button onClick={decrement} size="sm" variant="outline">-</Button>
                  <Button onClick={reset} size="sm" variant="outline">Reset</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-2xl font-semibold">Local Storage Hook</h2>
          <div className="space-y-2">
            <p className="text-sm">Stored Value: {testData}</p>
            <div className="space-x-2">
              <Button 
                onClick={() => setTestData('Updated Value')}
                size="sm"
                variant="outline"
              >
                Update Value
              </Button>
              <Button 
                onClick={() => setTestData('Reset Value')}
                size="sm"
                variant="outline"
              >
                Reset Value
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-2xl font-semibold">API Service Layer</h2>
          <div className="space-y-2">
            <p className="text-sm">API servis katmanı ile tip güvenli API çağrıları</p>
            <Button 
              onClick={handleApiTest}
              disabled={loading}
              size="sm"
            >
              {loading ? 'Testing...' : 'Test API Call'}
            </Button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Code Quality Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">TypeScript</h3>
              <ul className="text-sm space-y-1">
                <li>✅ Strict mode enabled</li>
                <li>✅ Proper type definitions</li>
                <li>✅ Generic types usage</li>
                <li>✅ Interface over type aliases</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Code Organization</h3>
              <ul className="text-sm space-y-1">
                <li>✅ Constants centralized</li>
                <li>✅ Utility functions reusable</li>
                <li>✅ Custom hooks extracted</li>
                <li>✅ API layer structured</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">DRY Principle</h3>
              <ul className="text-sm space-y-1">
                <li>✅ No code duplication</li>
                <li>✅ Shared utilities</li>
                <li>✅ Reusable components</li>
                <li>✅ Common patterns abstracted</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Naming Conventions</h3>
              <ul className="text-sm space-y-1">
                <li>✅ Consistent naming</li>
                <li>✅ Descriptive function names</li>
                <li>✅ Clear variable names</li>
                <li>✅ Proper file organization</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
