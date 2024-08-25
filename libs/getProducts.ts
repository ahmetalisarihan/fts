import { TProduct } from '@/app/types';

export const getProducts = async (): Promise<TProduct[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/`);
    if (res.ok) {
      const products: TProduct[] = await res.json();
      return products;
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};