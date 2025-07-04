import { generateMetadata } from '@/utils/seo'
import StructuredData from '@/components/StructuredData'
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema, 
  generateLocalBusinessSchema 
} from '@/utils/structured-data'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata = generateMetadata({
  title: 'SEO Test Sayfası',
  description: 'SEO ve metadata test sayfası',
  keywords: ['seo', 'test', 'metadata'],
  url: '/seo-test'
})

export default function SEOTestPage() {
  return (
    <div className="container mx-auto p-4">
      <StructuredData schema={[
        generateOrganizationSchema(),
        generateWebsiteSchema(),
        generateLocalBusinessSchema()
      ]} />
      
      <Breadcrumb items={[
        { name: 'SEO Test', url: '/seo-test' }
      ]} />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">SEO Test Sayfası</h1>
        
        <div className="grid gap-6">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Metadata Bilgileri</h2>
            <div className="space-y-2">
              <p><strong>Title:</strong> SEO Test Sayfası | FTS - Fetes Endüstriyel Yapı Malzemeleri</p>
              <p><strong>Description:</strong> SEO ve metadata test sayfası</p>
              <p><strong>Keywords:</strong> seo, test, metadata</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Structured Data</h2>
            <div className="space-y-2">
              <p>✅ Organization Schema</p>
              <p>✅ Website Schema</p>
              <p>✅ LocalBusiness Schema</p>
              <p>✅ Breadcrumb Schema</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">SEO Kontrol Listesi</h2>
            <ul className="space-y-2">
              <li>✅ Meta title ve description</li>
              <li>✅ Open Graph tags</li>
              <li>✅ Twitter Card</li>
              <li>✅ Canonical URL</li>
              <li>✅ Robots meta</li>
              <li>✅ Structured Data (JSON-LD)</li>
              <li>✅ Breadcrumb navigation</li>
              <li>✅ Mobile viewport</li>
              <li>✅ Language declaration</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Test Araçları</h2>
            <div className="space-y-2">
              <a 
                href="https://search.google.com/test/rich-results" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                🔍 Google Rich Results Test
              </a>
              <a 
                href="https://www.facebook.com/sharing/debugger/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                📱 Facebook Sharing Debugger
              </a>
              <a 
                href="https://cards-dev.twitter.com/validator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                🐦 Twitter Card Validator
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
