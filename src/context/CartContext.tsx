import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();
  const userId = (session?.user as any)?.id as string | undefined;

  const [items, setItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  // Gate localStorage writes until we've hydrated from it, so the initial empty
  // state never clobbers a previously-saved cart/favorites.
  const [hydrated, setHydrated] = useState(false);

  // Hydrate the cart from localStorage once on mount (SSR-safe).
  useEffect(() => {
    try {
      const raw = localStorage.getItem("firefly_cart");
      if (raw) setItems(JSON.parse(raw));
    } catch { /* ignore corrupt storage */ }
    setHydrated(true);
  }, []);

  // Persist the cart whenever it changes (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem("firefly_cart", JSON.stringify(items)); } catch { /* ignore */ }
  }, [items, hydrated]);

  // Signed-in: load favorites from the database. Guest: load from localStorage.
  useEffect(() => {
    if (!userId) {
      try {
        const raw = localStorage.getItem("firefly_favorites");
        setFavorites(raw ? JSON.parse(raw) : []);
      } catch { setFavorites([]); }
      return;
    }
    let active = true;
    fetch("/api/favorites")
      .then((r) => (r.ok ? r.json() : []))
      .then((ids: string[]) => { if (active) setFavorites(ids); })
      .catch(() => {});
    return () => { active = false; };
  }, [userId]);

  // Persist guest favorites to localStorage (signed-in favorites live in the DB).
  useEffect(() => {
    if (userId) return;
    try { localStorage.setItem("firefly_favorites", JSON.stringify(favorites)); } catch { /* ignore */ }
  }, [favorites, userId]);

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
    const wasFavorite = favorites.includes(bookId);
    // Optimistic update for a snappy UI.
    setFavorites((prev) => wasFavorite ? prev.filter((id) => id !== bookId) : [...prev, bookId]);
    // Persist for signed-in users; guests keep favorites in memory only.
    if (!userId) return;
    fetch("/api/favorites", {
      method: wasFavorite ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: bookId }),
    }).catch(() => {
      // Revert on failure.
      setFavorites((prev) => wasFavorite ? [...prev, bookId] : prev.filter((id) => id !== bookId));
    });
  }, [favorites, userId]);

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
