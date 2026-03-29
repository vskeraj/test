import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Edit2, Plus, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import type { BookDB } from "@/hooks/useBooks";

const bookSchema = z.object({
  title: z.string().trim().min(1, "Title required").max(200),
  author: z.string().trim().min(1, "Author required").max(200),
  price: z.coerce.number().min(0, "Price must be positive"),
  category: z.string().trim().min(1, "Category required"),
  description: z.string().trim().max(2000).optional(),
  stock: z.coerce.number().int().min(0).default(0),
  pages: z.coerce.number().int().min(0).optional(),
  year: z.coerce.number().int().optional(),
});

type BookForm = z.infer<typeof bookSchema>;

const AdminPanel = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: books, isLoading } = useQuery({
    queryKey: ["admin-books"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to load inventory");
      return (await res.json()) as BookDB[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete volume");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-books"] }),
  });

  const createMutation = useMutation({
    mutationFn: async (formData: BookForm) => {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add volume");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      setShowAdd(false);
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BookForm }) => {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update volume");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      setEditingId(null);
      reset();
    },
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<BookForm>({
    resolver: zodResolver(bookSchema),
  });

  const startEdit = (book: BookDB) => {
    setEditingId(book.id);
    setShowAdd(true);
    setValue("title", book.title);
    setValue("author", book.author);
    setValue("price", Number(book.price));
    setValue("category", book.category);
    setValue("description", book.description || "");
    setValue("stock", book.stock);
    setValue("pages", book.pages || 0);
    setValue("year", book.year || 2024);
  };

  const onSubmit = (data: BookForm) => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const cancelForm = () => {
    setShowAdd(false);
    setEditingId(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-foreground mb-1">Admin Panel</h1>
            <p className="text-muted-foreground text-sm tabular-nums">{books?.length ?? 0} volumes in inventory</p>
          </div>
          <button onClick={() => showAdd ? cancelForm() : setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-display hover:bg-primary/90 transition-all">
            {showAdd ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showAdd ? "Cancel" : "Add Book"}
          </button>
        </div>

        {showAdd && (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded-2xl bg-card card-surface mb-8">
            <h2 className="font-display text-lg text-foreground mb-4">{editingId ? "Edit Volume" : "Add New Volume"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(["title", "author", "category"] as const).map((f) => (
                <div key={f}>
                  <input {...register(f)} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  {errors[f] && <p className="text-xs text-destructive mt-1">{errors[f]?.message}</p>}
                </div>
              ))}
              <input {...register("price")} type="number" step="0.01" placeholder="Price" className="px-4 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input {...register("stock")} type="number" placeholder="Stock" className="px-4 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input {...register("pages")} type="number" placeholder="Pages" className="px-4 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input {...register("year")} type="number" placeholder="Year" className="px-4 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <textarea {...register("description")} placeholder="Description" rows={3} className="w-full mt-4 px-4 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="mt-4 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-display hover:bg-primary/90 transition-all disabled:opacity-50">
              {createMutation.isPending || updateMutation.isPending ? "Saving..." : editingId ? "Update Volume" : "Save Volume"}
            </button>
          </form>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>
        ) : (
          <div className="rounded-2xl bg-card card-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    {["Title", "Author", "Category", "Price", "Stock", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {books?.map((book) => (
                    <tr key={book.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 text-foreground font-medium">{book.title}</td>
                      <td className="px-5 py-3 text-muted-foreground">{book.author}</td>
                      <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{book.category}</span></td>
                      <td className="px-5 py-3 text-foreground tabular-nums">${Number(book.price).toFixed(2)}</td>
                      <td className="px-5 py-3 text-foreground tabular-nums">{book.stock}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => startEdit(book)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Edit2 className="h-3.5 w-3.5" /></button>
                          <button onClick={() => deleteMutation.mutate(book.id)} disabled={deleteMutation.isPending} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
