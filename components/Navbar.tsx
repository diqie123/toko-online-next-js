"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCart } from "@/context/CartContext";

export function Navbar({ categories }: { categories: string[] }) {
  const { totalItems } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const categoryLinks = useMemo(
    () =>
      categories.map((c) => ({
        label: c,
        href: `/products?category=${encodeURIComponent(c)}`
      })),
    [categories]
  );

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    const url = q ? `/products?q=${encodeURIComponent(q)}` : "/products";
    router.push(url);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-2 sm:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <Link href="/" prefetch={false} className="font-semibold tracking-tight">
          TokoOnline
        </Link>

        <nav className="hidden items-center gap-4 text-sm text-[rgb(var(--muted))] sm:flex">
          <Link href="/products" prefetch={false} className="hover:text-[rgb(var(--fg))]">
            Products
          </Link>
          {categoryLinks.slice(0, 4).map((c) => (
            <Link key={c.href} href={c.href} prefetch={false} className="hover:text-[rgb(var(--fg))]">
              {c.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden w-full max-w-md items-center gap-2 sm:flex">
          <form onSubmit={submitSearch} className="flex w-full items-center gap-2">
            <div className="relative w-full">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari produk..."
                className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/cart"
            prefetch={false}
            className="relative inline-flex items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-2"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 ? (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[rgb(var(--primary))] px-1 text-xs font-semibold text-white">
                {totalItems}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))] sm:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4">
            <form onSubmit={submitSearch} className="flex items-center gap-2">
              <div className="relative w-full">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari produk..."
                  className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[rgb(var(--primary))] px-3 py-2 text-sm font-semibold text-white"
              >
                <Search size={16} />
              </button>
            </form>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/products"
                prefetch={false}
                className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-2 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Products
              </Link>
              {categoryLinks.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  prefetch={false}
                  className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-2 text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
