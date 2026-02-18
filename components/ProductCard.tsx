import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatCurrencyIDR } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <Link href={`/products/${product.slug}`} prefetch={false} className="block">
        <div className="relative h-44 w-full">
          <Image
            src={product.images[0] ?? "https://placehold.co/1200x800/png"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${product.slug}`}
              prefetch={false}
              className="block truncate text-sm font-semibold hover:underline"
            >
              {product.name}
            </Link>
            <div className="mt-1 text-xs text-[rgb(var(--muted))]">{product.category}</div>
          </div>
          <div className="flex items-center gap-1 text-xs text-[rgb(var(--muted))]">
            <Star size={14} className="text-amber-500" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">{formatCurrencyIDR(product.price)}</div>
          <div className="text-xs text-[rgb(var(--muted))]">{product.stock > 0 ? `Stok: ${product.stock}` : "Habis"}</div>
        </div>

        <AddToCartButton
          item={{
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0] ?? "https://placehold.co/600x400/png",
            quantity: 1
          }}
          disabled={product.stock <= 0}
          className="w-full"
        />
      </div>
    </div>
  );
}
