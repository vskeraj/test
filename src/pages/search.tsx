import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { useBooks } from "@/hooks/useBooks";
import { useState } from "react";
import { Search as SearchIcon, Loader2 } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const { data: books, isLoading } = useBooks();
  const results = query.length >= 2
    ? (books ?? []).filter((b) => b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()) || b.category.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="font-display text-3xl text-foreground mb-6">Search</h1>
        <div className="relative max-w-xl mb-10">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title, author, or genre..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg" autoFocus />
        </div>
        {isLoading && <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>}
        {query.length >= 2 && !isLoading && <p className="text-muted-foreground mb-6 tabular-nums">{results.length} result{results.length !== 1 ? "s" : ""}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((book) => (<BookCard key={book.id} book={book} />))}
        </div>
        {query.length >= 2 && !isLoading && results.length === 0 && (
          <p className="text-center text-muted-foreground py-20">The lantern found no volumes matching "{query}".</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
