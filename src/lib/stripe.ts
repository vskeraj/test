import Stripe from "stripe";

// Server-side Stripe client. Pin the API version for stable behaviour across
// dependency upgrades.
const secret = process.env.STRIPE_SECRET_KEY;
if (!secret) {
  // Surfaced loudly in dev; payment routes will 500 with a clear message instead.
  console.warn("[stripe] STRIPE_SECRET_KEY is not set — payments will not work.");
}

export const stripe = new Stripe(secret || "sk_test_placeholder", {
  apiVersion: "2026-05-27.dahlia",
});

export const stripeConfigured = Boolean(secret);
