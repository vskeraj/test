import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { useBooks } from "@/hooks/useBooks";
import { categories } from "@/data/books";
import { useState } from "react";
import { useRouter } from 'next/router';
import { Search, Loader2 } from "lucide-react";

const Products = () => {
  const router = useRouter();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const setSearchParams = (p) => { const url = new URL(window.location.href); Object.keys(p).forEach(key => url.searchParams.set(key, p[key])); router.push(url.pathname + url.search); };
  const activeCategory = searchParams.get("category") || "All";
  const [search, setSearch] = useState("");
  const { data: books, isLoading } = useBooks();

  const filtered = (books ?? []).filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">All Volumes</h1>
        <p className="text-muted-foreground mb-8 tabular-nums">{filtered.length} books available</p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search by title or author..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((cat) => (
              <button key={cat} onClick={() => setSearchParams(cat === "All" ? {} : { category: cat })} className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"}`}>{cat}</button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((book) => (<BookCard key={book.id} book={book} />))}
          </div>
        )}
        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-20"><p className="text-muted-foreground">No volumes found. Try a different search or category.</p></div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
