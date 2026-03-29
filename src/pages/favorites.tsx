import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { useBooks } from "@/hooks/useBooks";
import { useCart } from "@/context/CartContext";
import { Heart, Loader2 } from "lucide-react";
import Link from 'next/link';

const Favorites = () => {
  const { favorites } = useCart();
  const { data: books, isLoading } = useBooks();
  const favoriteBooks = (books ?? []).filter((b) => favorites.includes(b.id));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="font-display text-3xl text-foreground mb-2">Your Favorites</h1>
        <p className="text-muted-foreground mb-8 tabular-nums">{favoriteBooks.length} saved volume{favoriteBooks.length !== 1 ? "s" : ""}</p>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>
        ) : favoriteBooks.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No favorites yet. Start exploring!</p>
            <Link href="/products" className="text-sm text-primary hover:underline">Browse books</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteBooks.map((book) => (<BookCard key={book.id} book={book} />))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
