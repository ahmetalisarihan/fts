# Kategori Yönetim Sistemi

Bu dokümantasyon, FTS projesindeki gelişmiş kategori yönetim sistemini açıklar.

## Özellikler

### 1. Drag & Drop Sıralama
- **Ana kategoriler** için sürükle-bırak ile sıralama
- **Alt kategoriler** için ayrı sürükle-bırak sistemi
- Gerçek zamanlı sıralama güncellemesi
- API ile sıralama değişikliklerinin kalıcı kaydedilmesi

### 2. Kategori Düzenleme
- Inline düzenleme modu
- Kategori adı ve açıklama düzenleme
- Kaydet/iptal seçenekleri
- Hata yönetimi

### 3. Kategori Silme
- Güvenli silme (onay penceresi)
- Alt kategorileri ve ürünleri olan kategorilerin korunması
- Cascade silme kontrolü

### 4. Görsel İyileştirmeler
- Modern card-based tasarım
- Badge'ler ile kategori/ürün sayısı gösterimi
- Genişletilebilir alt kategori görünümü
- Loading durumları

## Teknik Detaylar

### API Endpoint'leri

#### Kategori Sıralama
```
POST /api/admin/categories/reorder
Body: { categoryIds: string[] }
```

#### Alt Kategori Sıralama
```
POST /api/admin/subcategories/reorder
Body: { subcategoryIds: string[] }
```

#### Kategori Düzenleme
```
PATCH /api/admin/categories/edit
Body: { id: string, catName: string, description?: string }
```

#### Kategori Silme
```
DELETE /api/admin/categories/edit?id=categoryId
```

### Veritabanı Şeması

#### Category Model
```prisma
model Category {
  id            String        @id @default(auto()) @map("_id") @db.ObjectId
  catName       String        @unique
  description   String?
  order         Int?          // Sıralama için yeni alan
  subcategories Subcategory[]
  products      Product[]
  productIDs    String[]      @db.ObjectId 
}
```

#### Subcategory Model
```prisma
model Subcategory {  
  id            String     @id @default(auto()) @map("_id") @db.ObjectId  
  subcatName    String     @unique  
  description   String? 
  order         Int?       // Sıralama için yeni alan
  catName       String 
  category      Category?  @relation(fields: [catName], references: [catName])
  products      Product[]  
  productIDs    String[]   @db.ObjectId 
}
```

### Frontend Bileşenleri

#### CategoryList.tsx
Ana kategori yönetim bileşeni:
- `@dnd-kit` kullanarak modern drag & drop
- Nested sıralama (kategoriler ve alt kategoriler)
- TypeScript ile güçlü tip kontrolü

#### SortableCategory
Tekil kategori bileşeni:
- Düzenleme modları
- Alt kategori genişletme
- Drag handle ile sıralama

#### SortableSubcategory
Alt kategori bileşeni:
- Minimal tasarım
- Ürün sayısı gösterimi
- Drag & drop desteği

## Kullanım

### 1. Admin Paneline Erişim
- `/admin/categories` sayfasına gidin
- "Kategori Listesi" tabını seçin

### 2. Kategori Sıralama
- Kategori kartının sol tarafındaki grip (≡) işaretini kullanarak sürükleyin
- Sıralama otomatik olarak kaydedilir

### 3. Alt Kategori Sıralama
- Kategoriyi genişletin (+/- butonları)
- Alt kategorileri sürükle-bırak ile yeniden sıralayın

### 4. Kategori Düzenleme
- Düzenle butonuna (✏️) tıklayın
- Kategori adı ve açıklamayı değiştirin
- Kaydet (✓) veya İptal (✗) butonlarını kullanın

### 5. Kategori Silme
- Sil butonuna (🗑️) tıklayın
- Onay penceresinde "Evet" seçin
- Sistem alt kategoriler ve ürünler varsa silmeyi engeller

## Güvenlik

### Admin Yetkilendirmesi
- Tüm kategori yönetim API'leri admin yetkisi gerektirir
- Clerk authentication ile güvenlik
- Role-based access control

### Veri Doğrulama
- API endpoint'lerinde input validation
- Prisma ile database constraint'ler
- Frontend'de defensive coding

### Hata Yönetimi
- Try-catch blokları ile hata yakalama
- Kullanıcı dostu hata mesajları
- Otomatik rollback mekanizmaları

## Performans

### Optimizasyonlar
- Selective data fetching (sadece gerekli alanlar)
- Debounced drag operations
- Loading states ile UX iyileştirmesi

### Caching
- API response caching
- Optimistic UI updates
- Minimal re-renders

## Gelecek Geliştirmeler

### Planlanan Özellikler
1. Bulk kategori operations
2. Kategori import/export
3. Drag & drop ile kategori transfer
4. Advanced filtering ve search
5. Kategori analytics

### Teknik İyileştirmeler
1. WebSocket ile real-time updates
2. Infinite scrolling için büyük kategori listeleri
3. Mobile-first responsive design
4. Accessibility improvements (ARIA labels)

## Sorun Giderme

### Yaygın Sorunlar

#### 1. Sıralama Çalışmıyor
- Browser console'da hata kontrolü
- Network tab'de API isteklerini kontrol edin
- Admin yetkilerinizi doğrulayın

#### 2. Kategoriler Yüklenmiyor
- Database bağlantısını kontrol edin
- API endpoint'lerinin erişilebilir olduğunu doğrulayın
- CORS ayarlarını kontrol edin

#### 3. Drag & Drop Çalışmıyor
- @dnd-kit paketlerinin yüklü olduğunu kontrol edin
- Touch device'larda touch sensor'ün aktif olduğunu doğrulayın

### Debug Modları
- `NODE_ENV=development` ile detaylı loglar
- Browser DevTools ile state izleme
- Prisma Studio ile database kontrolü

## Katkıda Bulunma

Kategori yönetim sistemine katkıda bulunmak için:

1. Feature branch oluşturun
2. TypeScript tip kontrollerini geçirin
3. Unit testler ekleyin
4. Dokümantasyonu güncelleyin
5. Pull request gönderin

## İletişim

Sorularınız için:
- GitHub Issues
- Proje maintainer'ları
- Teknik dokümantasyon
