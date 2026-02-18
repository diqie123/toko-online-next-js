import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { ProductCard } from "@/components/ProductCard";
import { formatCurrencyIDR, getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { PurchasePanel } from "@/app/products/[slug]/purchase-panel";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product" };
  const image = product.images[0];
  return {
    title: product.name,
    description: product.description,
    openGraph: image
      ? {
          title: product.name,
          description: product.description,
          images: [{ url: image }]
        }
      : undefined
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-2">
        <ProductImageGallery images={product.images} alt={product.name} />

        <div className="space-y-4">
          <div>
            <div className="text-sm text-[rgb(var(--muted))]">{product.category}</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">{product.name}</h1>
            <div className="mt-2 text-xl font-semibold">{formatCurrencyIDR(product.price)}</div>
            <div className="mt-2 text-sm text-[rgb(var(--muted))]">
              Rating <span className="font-semibold text-[rgb(var(--fg))]">{product.rating.toFixed(1)}</span> · Stok{" "}
              <span className="font-semibold text-[rgb(var(--fg))]">{product.stock}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 text-sm text-[rgb(var(--muted))]">
            {product.description}
          </div>

          <PurchasePanel product={product} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Related Products</h2>
        {related.length === 0 ? (
          <div className="text-sm text-[rgb(var(--muted))]">Belum ada produk terkait.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

