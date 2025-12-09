'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  quantity: number;
  price: number;
  currency: string;
  priceSnapshot: number;
  currencySnapshot: string;
  imageUrl?: string;
  sku?: string;
  priceChanged?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  syncCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoaded } = useUser();

  // LocalStorage'dan sepeti yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      setIsLoading(false);
    }
  }, []);

  // Kullanıcı giriş yaptığında sepeti senkronize et
  useEffect(() => {
    if (isLoaded && user) {
      syncCart();
    }
  }, [isLoaded, user]);

  // LocalStorage'a kaydet
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isLoading]);

  // Sepeti veritabanı ile senkronize et
  const syncCart = async () => {
    if (!user) return;

    try {
      // Veritabanından sepeti al
      const response = await fetch('/api/cart');
      if (response.ok) {
        const dbCart = await response.json();
        
        // LocalStorage'daki sepet varsa birleştir
        const localCart = items;
        if (localCart.length > 0) {
          // LocalStorage'daki ürünleri veritabanına ekle
          await fetch('/api/cart/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: localCart }),
          });
          
          // Güncellenmiş sepeti al
          const updatedResponse = await fetch('/api/cart');
          if (updatedResponse.ok) {
            const updatedCart = await updatedResponse.json();
            setItems(updatedCart.items || []);
          }
        } else {
          setItems(dbCart.items || []);
        }
      }
    } catch (error) {
      console.error('Cart sync error:', error);
    }
  };

  const addItem = async (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const quantity = item.quantity || 1;
    
    setItems((prev) => {
      const existingItem = prev.find((i) => i.productId === item.productId);
      
      if (existingItem) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      
      return [...prev, { ...item, quantity, priceSnapshot: item.price, currencySnapshot: item.currency }];
    });

    // Kullanıcı giriş yaptıysa veritabanına da ekle
    if (user) {
      try {
        await fetch('/api/cart/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...item, quantity }),
        });
      } catch (error) {
        console.error('Failed to add item to database:', error);
      }
    }
  };

  const removeItem = async (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));

    if (user) {
      try {
        await fetch(`/api/cart/items/${productId}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Failed to remove item from database:', error);
      }
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );

    if (user) {
      try {
        await fetch(`/api/cart/items/${productId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity }),
        });
      } catch (error) {
        console.error('Failed to update quantity in database:', error);
      }
    }
  };

  const clearCart = async () => {
    setItems([]);

    if (user) {
      try {
        await fetch('/api/cart', {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Failed to clear cart in database:', error);
      }
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        syncCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}