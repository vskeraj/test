import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the DB layer so no real MongoDB connection is needed.
vi.mock("@/lib/mongodb", () => ({ default: vi.fn().mockResolvedValue(undefined) }));

const find = vi.fn();
vi.mock("@/models/Product", () => ({ default: { find: (...a: any[]) => find(...a) } }));
vi.mock("@/data/books", () => ({ books: [] }));

import handler from "@/pages/api/products/index";

function mockRes() {
  const res: any = {};
  res.statusCode = 0;
  res.status = vi.fn((c: number) => { res.statusCode = c; return res; });
  res.json = vi.fn((d: any) => { res.body = d; return res; });
  return res;
}

describe("GET /api/products", () => {
  beforeEach(() => {
    find.mockReset();
  });

  it("returns the list of products with status 200", async () => {
    const products = [{ id: "1", title: "Book A" }, { id: "2", title: "Book B" }];
    find.mockResolvedValue(products);

    const req: any = { method: "GET" };
    const res = mockRes();
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.json).toHaveBeenCalledWith(products);
  });
});
