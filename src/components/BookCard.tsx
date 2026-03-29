import Link from 'next/link';
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { BookDB } from "@/hooks/useBooks";

const BookCard = ({ book }: { book: BookDB }) => {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const coverColor = book.cover_color || "from-blue-900 to-indigo-800";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative rounded-2xl bg-card card-surface overflow-hidden transition-all duration-300 hover:glow-border"
    >
      <Link href={`/products/${book.id}`}>
        <div className={`relative h-48 bg-gradient-to-br ${coverColor} flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <span className="relative text-3xl font-display text-white/90 text-center px-4 leading-tight">{book.title}</span>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link href={`/products/${book.id}`} className="hover:text-primary transition-colors">
            <h3 className="font-display text-sm text-foreground line-clamp-1">{book.title}</h3>
          </Link>
          <div className="flex items-center gap-1 text-primary shrink-0">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs tabular-nums">{book.rating}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-3">{book.author}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg text-primary tabular-nums">${Number(book.price).toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleFavorite(book.id)}
              className={`p-1.5 rounded-md transition-colors ${isFavorite(book.id) ? "text-red-400 bg-red-400/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
            >
              <Heart className={`h-4 w-4 ${isFavorite(book.id) ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={() => addToCart(book)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
