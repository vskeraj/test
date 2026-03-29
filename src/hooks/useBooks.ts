
import { useQuery } from "@tanstack/react-query";

export interface BookDB {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string | null;
  cover_color: string | null;
  stock: number;
  rating: number | null;
  pages: number | null;
  year: number | null;
  created_at: string;
}

export const useBooks = (category?: string) => {
  return useQuery({
    queryKey: ["books", category],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch");
      let data: BookDB[] = await res.json();
      if (category && category !== "All") {
        data = data.filter(doc => doc.category === category);
      }
      return data;
    },
  });
};

export const useBook = (id: string) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return await res.json() as BookDB;
    },
    enabled: !!id,
  });
};
