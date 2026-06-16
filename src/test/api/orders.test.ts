import { describe, it, expect, vi, beforeEach } from "vitest";

const getServerSession = vi.fn();
vi.mock("next-auth/next", () => ({ getServerSession: (...a: any[]) => getServerSession(...a) }));
vi.mock("@/pages/api/auth/[...nextauth]", () => ({ authOptions: {} }));
vi.mock("@/lib/mongodb", () => ({ default: vi.fn().mockResolvedValue(undefined) }));

const create = vi.fn();
vi.mock("@/models/Order", () => ({ default: { create: (...a: any[]) => create(...a) } }));

import handler from "@/pages/api/orders/index";

function mockRes() {
  const res: any = {};
  res.statusCode = 0;
  res.status = vi.fn((c: number) => { res.statusCode = c; return res; });
  res.json = vi.fn((d: any) => { res.body = d; return res; });
  res.setHeader = vi.fn();
  return res;
}

describe("POST /api/orders", () => {
  beforeEach(() => {
    getServerSession.mockReset();
    create.mockReset();
  });

  it("creates an order for the authenticated user (201)", async () => {
    getServerSession.mockResolvedValue({ user: { id: "user1", role: "user" } });
    const created = { id: "order1", items: [{ title: "Book A", price: 10, quantity: 1 }], total_amount: 10 };
    create.mockResolvedValue(created);

    const req: any = {
      method: "POST",
      body: { items: [{ title: "Book A", price: 10, quantity: 1 }], total_amount: 10 },
    };
    const res = mockRes();
    await handler(req, res);

    expect(create).toHaveBeenCalledWith(expect.objectContaining({ userId: "user1", total_amount: 10 }));
    expect(res.statusCode).toBe(201);
    expect(res.json).toHaveBeenCalledWith(created);
  });

  it("rejects unauthenticated requests with 401", async () => {
    getServerSession.mockResolvedValue(null);
    const req: any = { method: "POST", body: {} };
    const res = mockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(401);
  });
});
