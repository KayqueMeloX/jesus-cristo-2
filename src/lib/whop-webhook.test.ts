import { expect, it } from "vitest";
import { normalizeWhopPayload } from "./whop-webhook";
it("reads Whop money objects", () => {
  const p = normalizeWhopPayload({ type: "payment.succeeded", data: { id: "pay_1", currency: "usd", total: { currency: "usd", amount: "33.21" }, usd_total: { currency: "usd", amount: "33.22" } } });
  expect(p?.amount).toBe(33.22); expect(p?.currency).toBe("USD");
});
it("reads plain numbers", () => {
  expect(normalizeWhopPayload({ type: "x", data: { id: "p", total: 27 } })?.amount).toBe(27);
});
it("uses charged EUR amount and line item product name", () => {
  const p = normalizeWhopPayload({ type: "payment.succeeded", data: { id: "pay_2", usd_total: { currency: "usd", amount: "0.67" }, amount_charged: { currency: "eur", amount: "0.62" }, line_items: [{ product_id: "prod_X", variant_id: "plan_Y", product_title: "Seed of Faith" }] } });
  expect(p?.amount).toBe(0.62); expect(p?.currency).toBe("EUR"); expect(p?.productName).toBe("Seed of Faith"); expect(p?.planId).toBe("plan_Y");
});
