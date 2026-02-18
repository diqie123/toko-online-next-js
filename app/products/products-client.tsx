"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { filterProducts, getCategories, paginate, sortProducts, type SortKey } from "@/lib/products";

const PAGE_SIZE = 8;

function parseSort(value: string | null): SortKey {
  if (value === "price-asc" || value === "price-desc" || value === "newest") return value;
  return "newest";
}

export function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const q = searchParams.get("q") ?? "";
  const sort = parseSort(searchParams.get("sort"));
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const categories = useMemo(() => ["", ...getCategories()], []);

  const result = useMemo(() => {
    const filtered = filterProducts({ category: category || undefined, query: q || undefined });
    const sorted = sortProducts(filtered, sort);
    return paginate(sorted, page, PAGE_SIZE);
  }, [category, page, q, sort]);

  function updateParams(next: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(next)) {
      if (!v) params.delete(k);
      else params.set(k, v);
    }
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  }

  function gotoPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Products</h1>
          <p className="text-sm text-[rgb(var(--muted))]">
            Filter kategori, urutkan, dan cari produk favorit kamu.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1 text-xs text-[rgb(var(--muted))]">
            Kategori
            <select
              value={category}
              onChange={(e) => updateParams({ category: e.target.value || undefined })}
              className="h-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 text-sm text-[rgb(var(--fg))]"
            >
              <option value="">Semua</option>
              {categories
                .filter(Boolean)
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-xs text-[rgb(var(--muted))]">
            Sort
            <select
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="h-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 text-sm text-[rgb(var(--fg))]"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price low-high</option>
              <option value="price-desc">Price high-low</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-xs text-[rgb(var(--muted))]">
            Search
            <input
              value={q}
              onChange={(e) => updateParams({ q: e.target.value || undefined })}
              placeholder="Ketik nama produk..."
              className="h-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30"
            />
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 text-sm text-[rgb(var(--muted))]">
        <div>
          Menampilkan <span className="font-semibold text-[rgb(var(--fg))]">{result.items.length}</span> dari{" "}
          <span className="font-semibold text-[rgb(var(--fg))]">{result.total}</span> produk
        </div>
        <Link href="/products" className="text-[rgb(var(--primary))] hover:underline">
          Reset
        </Link>
      </div>

      {result.total === 0 ? (
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 text-sm text-[rgb(var(--muted))]">
          Tidak ada produk yang cocok dengan filter kamu.
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {result.items.map((p) => (
              <ProductCard key={`${p.id}`} product={p} />
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 text-sm">
            <button
              type="button"
              onClick={() => gotoPage(result.page - 1)}
              disabled={result.page <= 1}
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 py-2 disabled:opacity-40"
            >
              Prev
            </button>
            <div className="text-[rgb(var(--muted))]">
              Page <span className="font-semibold text-[rgb(var(--fg))]">{result.page}</span> / {result.totalPages}
            </div>
            <button
              type="button"
              onClick={() => gotoPage(result.page + 1)}
              disabled={result.page >= result.totalPages}
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 py-2 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
