// Second offer ("jesusgod"). Fill `href` with each Whop checkout link (whop.com/checkout/plan_...).
// Apple Pay, Google Pay and cards are shown by Whop's checkout when enabled in the Whop dashboard.
export interface JgOffer { slug: string; name: string; price: string; image: string; href: string; badge?: string }

export const JG_OFFERS: JgOffer[] = [
  { slug: "jg-100", name: "Complete Faith Pack", price: "$100", image: "/images/seed-100-new.webp", href: "", badge: "★ Most chosen" },
  { slug: "jg-77", name: "Abundance Pack", price: "$77", image: "/images/seed-77-new.webp", href: "" },
  { slug: "jg-57", name: "Growth Pack", price: "$57", image: "/images/seed-47-new.webp", href: "" },
  { slug: "jg-27", name: "Starter Pack", price: "$27", image: "/images/seed-27-new.webp", href: "" },
];
