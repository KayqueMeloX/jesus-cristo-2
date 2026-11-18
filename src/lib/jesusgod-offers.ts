import productImage from "@/assets/time-to-prosper.png.asset.json";

// Second offer ("jesusgod" Whop company). Plans accept only Apple Pay, Google Pay and cards (set in Whop).
export interface JgOffer { slug: string; name: string; price: string; image: string; href: string; badge?: string }

export const JG_OFFERS: JgOffer[] = [
  { slug: "jg-100", name: "Roots of Prosperity — 200 Prayers & Bible Verses", price: "$100", image: productImage.url, href: "https://whop.com/checkout/plan_eeBhq7HZDevYH", badge: "★ The most blessed" },
  { slug: "jg-77", name: "Roots of Prosperity — 150 Prayers & Bible Verses", price: "$77", image: productImage.url, href: "https://whop.com/checkout/plan_LLaCJ93l2EkND" },
  { slug: "jg-57", name: "Roots of Prosperity — 100 Prayers & Bible Verses", price: "$57", image: productImage.url, href: "https://whop.com/checkout/plan_VhE0277poak6C" },
  { slug: "jg-27", name: "Seed of Faith — 50 Prayers & Bible Verses", price: "$27", image: productImage.url, href: "https://whop.com/checkout/plan_ORvGcjoWSftUj" },
];
