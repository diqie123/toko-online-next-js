import Link from "next/link";
import { Carousel, type Slide } from "@/components/Carousel";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts, getCategories, sortProducts } from "@/lib/products";

export const dynamic = "force-static";

export default function HomePage() {
  const slides: Slide[] = [
    {
      title: "Belanja cepat, desain rapi",
      subtitle: "Toko online statis dengan Next.js 14 + Tailwind.",
      image:
        "https://placehold.co/1600x900/png?text=Belanja+cepat%2C+desain+rapi",
      href: "/products"
    },
    {
      title: "Elektronik pilihan",
      subtitle: "Produk favorit untuk produktivitas dan hiburan.",
      image:
        "https://placehold.co/1600x900/png?text=Elektronik+pilihan",
      href: "/products?category=Elektronik"
    },
    {
      title: "Fashion harian",
      subtitle: "Nyaman, minimalis, mudah dipadukan.",
      image:
        "https://placehold.co/1600x900/png?text=Fashion+harian",
      href: "/products?category=Fashion"
    }
  ];

  const products = getAllProducts();
  const featured = sortProducts(products, "newest").slice(0, 8);
  const bestSellers = products.slice().sort((a, b) => b.rating - a.rating).slice(0, 4);
  const categories = getCategories();

  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <Carousel slides={slides} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">TokoOnline</h1>
            <p className="mt-1 text-sm text-[rgb(var(--muted))]">
              Belanja produk favorit kamu. Semua data statis, cepat, dan SEO-friendly.
            </p>
          </div>
          <Link
            href="/products"
            prefetch={false}
            className="hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2 text-sm font-semibold hover:opacity-90 sm:inline-flex"
          >
            Lihat semua
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-lg font-semibold">Featured Products</h2>
          <Link href="/products" prefetch={false} className="text-sm text-[rgb(var(--primary))] hover:underline">
            Browse
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <Link href="/products" prefetch={false} className="text-sm text-[rgb(var(--primary))] hover:underline">
            Semua kategori
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/products?category=${encodeURIComponent(c)}`}
              prefetch={false}
              className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 hover:opacity-90"
            >
              <div className="text-sm font-semibold">{c}</div>
              <div className="mt-1 text-xs text-[rgb(var(--muted))]">Lihat produk</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-lg font-semibold">Best Sellers</h2>
          <Link
            href="/products?sort=newest"
            prefetch={false}
            className="text-sm text-[rgb(var(--primary))] hover:underline"
          >
            New arrivals
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
