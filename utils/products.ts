import { TProduct } from '@/app/types';

// Belirli bir ürün ID'si için ürün bilgilerini çekme
export const getProductById = async (slug: string): Promise<TProduct | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${slug}`);
    if (res.ok) {
      const product = await res.json();
      return product;
    }
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }
  return null;
};
