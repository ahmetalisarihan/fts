import { TProduct } from '@/app/types';
import { use } from 'react';

export const getProducts = async (): Promise<TProduct[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`);
    if (res.ok) {
      const products = await res.json();
      return products;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export function useProducts() {
  return use(getProducts());
}