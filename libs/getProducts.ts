import { TProduct } from '@/app/types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const getProducts = async (): Promise<TProduct[] | null> => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store' // Disable caching for development
    });
    
    if (res.ok) {
      const response: ApiResponse<TProduct[]> = await res.json();
      
      // Check if response follows new API format
      if (response.success && Array.isArray(response.data)) {
        return response.data;
      } 
      // Fallback for old format (direct array)
      else if (Array.isArray(response)) {
        return response as TProduct[];
      }
      else {
        console.error('Unexpected API response format:', response);
        return null;
      }
    } else {
      const errorText = await res.text();
      console.error('API request failed:', res.status, errorText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return null; // Return null instead of throwing to prevent crashes
  }
};
