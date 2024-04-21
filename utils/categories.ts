import { TCategory } from '@/app/types';
import { use } from 'react';

export const getCategories = async (): Promise<TCategory[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
    if (res.ok) {
      const categories = await res.json();
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export function useCategories() {
  return use(getCategories());
}