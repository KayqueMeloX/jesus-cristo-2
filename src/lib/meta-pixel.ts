/** Browser-only Meta Pixel helpers. Call only from effects/handlers. */
type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[]; loaded: boolean; version: string; push: unknown };
declare global { interface Window { fbq?: Fbq; _fbq?: Fbq } }

export function loadMetaPixel(pixelId: string): void {
  if (window.fbq) return;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args); else n.queue.push(args);
  } as Fbq;
  n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
  window.fbq = n; window._fbq = n;
  const s = document.createElement("script");
  s.async = true; s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  n("init", pixelId);
  n("track", "PageView");
}

export function getCookie(name: string): string | undefined {
  return document.cookie.split("; ").find((c) => c.startsWith(name + "="))?.split("=")[1];
}

/** _fbc from cookie, or built from ?fbclid= when the cookie isn't set yet. */
export function getFbc(): string | undefined {
  const c = getCookie("_fbc");
  if (c) return c;
  const id = new URLSearchParams(window.location.search).get("fbclid");
  return id ? `fb.1.${Date.now()}.${id}` : undefined;
}
