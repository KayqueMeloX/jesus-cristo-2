import { expect, it } from "vitest";
import { normalizeWhopPayload } from "./whop-webhook";
it("reads Whop money objects", () => {
  const p = normalizeWhopPayload({ type: "payment.succeeded", data: { id: "pay_1", currency: "usd", total: { currency: "usd", amount: "33.21" }, usd_total: { currency: "usd", amount: "33.22" } } });
  expect(p?.amount).toBe(33.22); expect(p?.currency).toBe("USD");
});
it("reads plain numbers", () => {
  expect(normalizeWhopPayload({ type: "x", data: { id: "p", total: 27 } })?.amount).toBe(27);
});
