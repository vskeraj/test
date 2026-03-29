import React, { createContext, useContext, useState, useCallback } from "react";
import type { BookDB } from "@/hooks/useBooks";

interface CartItem {
  book: BookDB;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  favorites: string[];
  addToCart: (book: BookDB) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  toggleFavorite: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
  cartCount: number;
  cartTotal: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const addToCart = useCallback((book: BookDB) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.book.id === book.id);
      if (existing) {
        return prev.map((i) => i.book.id === book.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { book, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((bookId: string) => {
    setItems((prev) => prev.filter((i) => i.book.id !== bookId));
  }, []);

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.book.id !== bookId));
    } else {
      setItems((prev) => prev.map((i) => (i.book.id === bookId ? { ...i, quantity } : i)));
    }
  }, []);

  const toggleFavorite = useCallback((bookId: string) => {
    setFavorites((prev) => prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]);
  }, []);

  const isFavorite = useCallback((bookId: string) => favorites.includes(bookId), [favorites]);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = items.reduce((sum, i) => sum + Number(i.book.price) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, favorites, addToCart, removeFromCart, updateQuantity, toggleFavorite, isFavorite, cartCount, cartTotal, clearCart: () => setItems([]) }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
