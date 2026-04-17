import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from "@/context/CartContext";
import { useBook } from "@/hooks/useBooks";
import { Heart, ShoppingCart, ArrowLeft, Star, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const bookId = typeof id === "string" ? id : "";
  const { data: book, isLoading } = useBook(bookId);
  const { addToCart, toggleFavorite, isFavorite } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Book not found.</p>
          <Link href="/products" className="text-primary hover:underline mt-4 inline-block">Browse all books</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const coverColor = book.cover_color || "from-blue-900 to-indigo-800";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to all volumes
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`relative rounded-2xl bg-gradient-to-br ${coverColor} h-80 lg:h-[500px] flex items-center justify-center card-surface`}>
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
            <span className="relative text-4xl md:text-5xl font-display text-white/90 text-center px-8 leading-tight">{book.title}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{book.category}</span>
              <div className="flex items-center gap-1 text-primary">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-sm tabular-nums">{book.rating}</span>
              </div>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">{book.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">by {book.author}</p>
            <p className="text-foreground/80 leading-relaxed mb-8">{book.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Pages", value: book.pages },
                { label: "Year", value: book.year && book.year > 0 ? book.year : book.year ? `${Math.abs(book.year)} BC` : "N/A" },
                { label: "In Stock", value: book.stock },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-xl bg-card card-surface text-center">
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className="font-display text-sm text-foreground tabular-nums">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-display text-3xl text-primary tabular-nums">${Number(book.price).toFixed(2)}</span>
            </div>

            <div className="flex gap-3">
              <button onClick={() => addToCart(book)} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-all active:scale-[0.98]">
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button onClick={() => toggleFavorite(book.id)} className={`p-3 rounded-lg border transition-all active:scale-[0.98] ${isFavorite(book.id) ? "border-red-400/30 bg-red-400/10 text-red-400" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"}`}>
                <Heart className={`h-5 w-5 ${isFavorite(book.id) ? "fill-current" : ""}`} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
