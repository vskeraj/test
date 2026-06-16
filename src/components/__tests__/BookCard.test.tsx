import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BookCard from "@/components/BookCard";
import { CartProvider } from "@/context/CartContext";
import type { BookDB } from "@/hooks/useBooks";

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// CartProvider calls useSession; stub it so no SessionProvider/network is needed.
vi.mock("next-auth/react", () => ({
  useSession: () => ({ data: null, status: "unauthenticated" }),
}));

const book: BookDB = {
  id: "abc123",
  title: "The Midnight Library",
  author: "Matt Haig",
  price: 14.99,
  category: "Fiction",
  description: "A library between life and death.",
  cover_color: "from-blue-900 to-indigo-800",
  stock: 12,
  rating: 4.5,
  pages: 304,
  year: 2020,
  created_at: "2024-01-01",
};

describe("BookCard", () => {
  it("renders the book title, author and formatted price", () => {
    render(
      <CartProvider>
        <BookCard book={book} />
      </CartProvider>
    );
    // Title appears in both the cover and the heading.
    expect(screen.getAllByText("The Midnight Library").length).toBeGreaterThan(0);
    expect(screen.getByText("Matt Haig")).toBeInTheDocument();
    expect(screen.getByText("$14.99")).toBeInTheDocument();
  });
});
