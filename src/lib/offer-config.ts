export interface PlanOffer {
  slug: string;
  image: string;
  label: string;
  href: string;
  plan: string;
  badge?: string;
}

export const OFFERS: PlanOffer[] = [
  {
    slug: "blessing-100",
    image: "/images/seed-100-new.webp",
    label: "I choose the full blessing – $100",
    href: "https://whop.com/checkout/plan_KHYpxzV6UIUzS",
    plan: "plan_KHYpxzV6UIUzS",
    badge: "★ The most blessed",
  },
  {
    slug: "prosper-77",
    image: "/images/seed-77-new.webp",
    label: "I choose to prosper – $77",
    href: "https://whop.com/checkout/plan_S3Sz1RIdPU29P",
    plan: "plan_S3Sz1RIdPU29P",
  },
  {
    slug: "grow-57",
    image: "/images/seed-47-new.webp",
    label: "I choose to grow – $57",
    href: "https://whop.com/checkout/plan_R425FimjfevW3",
    plan: "plan_R425FimjfevW3",
  },
  {
    slug: "begin-27",
    image: "/images/seed-27-new.webp",
    label: "I choose to begin – $27",
    href: "https://whop.com/checkout/plan_JKVmH0pQC21T3",
    plan: "plan_JKVmH0pQC21T3",
  },
];

export function buildCheckoutUrl(checkoutBase: string, search: string | URLSearchParams): string {
  if (!checkoutBase) return "";
  try {
    const url = new URL(checkoutBase);
    const params = typeof search === "string" ? new URLSearchParams(search) : search;
    params.forEach((value, key) => {
      if (key !== "nome" && key !== "liberar" && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  } catch {
    return checkoutBase;
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export function buildUtmRef(searchParams: URLSearchParams): string {
  const sanitize = (val: string | null) => {
    if (!val) return "";
    const first = val.split("::")[0] ?? "";
    const slice = first.includes("|") ? first.slice(first.lastIndexOf("|") + 1) : first;
    return slice.replace(/[^A-Za-z0-9_-]/g, "").replace(/_{2,}/g, "_");
  };

  const utms = UTM_KEYS.map((k) => sanitize(searchParams.get(k)));
  const getRef = () => ["u", ...utms].join("__");
  let result = getRef();
  while (result.length > 200) {
    const maxIdx = utms.reduce(
      (acc, curr, i) => (curr.length > (utms[acc]?.length ?? 0) ? i : acc),
      0
    );
    utms[maxIdx] = (utms[maxIdx] ?? "").slice(0, -1);
    result = getRef();
  }
  return result;
}

export function getOfferBySlug(slug: string): PlanOffer | undefined {
  return OFFERS.find((o) => o.slug === slug);
}

export function getPayRoute(slug: string, search: string): string {
  const q = search ? (search.startsWith("?") ? search : `?${search}`) : "";
  return `/pay/${slug}${q}`;
}
