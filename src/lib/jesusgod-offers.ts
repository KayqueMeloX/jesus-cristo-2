// Second offer ("jesusgod" Whop company). Plans accept only Apple Pay, Google Pay and cards (set in Whop).
export interface JgOffer { slug: string; name: string; price: string; image: string; href: string; badge?: string }

export const JG_OFFERS: JgOffer[] = [
  { slug: "jg-100", name: "I choose the full blessing", price: "$100", image: "/images/seed-100-new.webp", href: "https://whop.com/checkout/plan_m4CD3HqdaqiMY", badge: "★ The most blessed" },
  { slug: "jg-77", name: "I choose to prosper", price: "$77", image: "/images/seed-77-new.webp", href: "https://whop.com/checkout/plan_vNX15KKJpeTcr" },
  { slug: "jg-57", name: "I choose to grow", price: "$57", image: "/images/seed-47-new.webp", href: "https://whop.com/checkout/plan_hHHotzjpW2IjB" },
  { slug: "jg-27", name: "I choose to begin", price: "$27", image: "/images/seed-27-new.webp", href: "https://whop.com/checkout/plan_rLpB1i8MbksnH" },
];
