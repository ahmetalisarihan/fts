/**
 * Türkçe karakterleri URL-safe hale getiren slug oluşturma fonksiyonu
 * @param text - Slug'a çevrilecek metin
 * @returns URL-safe slug
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-') // Sadece harf, rakam ve tire bırak
    .replace(/-+/g, '-') // Çoklu tireleri tek tire yap
    .replace(/^-|-$/g, '') // Baştan ve sondan tireleri kaldır
}

/**
 * Benzersiz slug oluşturma fonksiyonu
 * @param text - Slug'a çevrilecek metin
 * @param checkFunction - Slug'ın mevcut olup olmadığını kontrol eden fonksiyon
 * @returns Benzersiz slug
 */
export async function createUniqueSlug(
  text: string, 
  checkFunction: (slug: string) => Promise<boolean>
): Promise<string> {
  let baseSlug = createSlug(text);
  let finalSlug = baseSlug;
  let counter = 1;
  
  while (await checkFunction(finalSlug)) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return finalSlug;
}
