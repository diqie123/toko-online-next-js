import productsData from "@/lib/products.json";
import type { Product } from "@/lib/types";

export type SortKey = "newest" | "price-asc" | "price-desc";

function toPlaceholderImage(text: string, width = 1200, height = 800): string {
  const t = encodeURIComponent(text.slice(0, 48));
  return `https://placehold.co/${width}x${height}/png?text=${t}`;
}

function normalizeImageUrl(src: string | undefined, label: string): string {
  if (!src) return toPlaceholderImage(label);
  try {
    const url = new URL(src);
    if (url.hostname === "images.unsplash.com") return toPlaceholderImage(label);
    return src;
  } catch {
    return toPlaceholderImage(label);
  }
}

const ALL_PRODUCTS: Product[] = (productsData as Product[]).map((p) => ({
  ...p,
  images: (p.images ?? []).length
    ? p.images.map((src, idx) => normalizeImageUrl(src, `${p.name} ${idx + 1}`))
    : [toPlaceholderImage(p.name)]
}));

export function getAllProducts(): Product[] {
  return ALL_PRODUCTS.slice();
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  const categories = new Set<string>();
  for (const p of getAllProducts()) categories.add(p.category);
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
}

export function formatCurrencyIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const list = products.slice();
  if (sort === "price-asc") return list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return list.sort((a, b) => b.price - a.price);
  return list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function filterProducts(params: {
  category?: string;
  query?: string;
}): Product[] {
  const category = (params.category ?? "").trim();
  const query = (params.query ?? "").trim().toLowerCase();

  return getAllProducts().filter((p) => {
    const matchCategory = category ? p.category === category : true;
    const matchQuery = query
      ? `${p.name} ${p.description} ${(p.tags ?? []).join(" ")}`.toLowerCase().includes(query)
      : true;
    return matchCategory && matchQuery;
  });
}

export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number
): { page: number; pageSize: number; total: number; totalPages: number; items: T[] } {
  const safePageSize = Math.max(1, pageSize);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safePageSize;
  const end = start + safePageSize;
  return {
    page: safePage,
    pageSize: safePageSize,
    total,
    totalPages,
    items: items.slice(start, end)
  };
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = getAllProducts().filter(
    (p) => p.category === product.category && p.slug !== product.slug
  );
  return sameCategory.slice(0, Math.max(0, limit));
}
