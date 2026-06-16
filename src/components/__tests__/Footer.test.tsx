import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

// next/link needs a router context we don't have in unit tests; render a plain anchor.
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe("Footer", () => {
  it("renders the brand name and navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Firefly")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Terms")).toBeInTheDocument();
  });
});
