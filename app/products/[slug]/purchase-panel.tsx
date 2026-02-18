"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "@/components/AddToCartButton";
import { QuantitySelector } from "@/components/QuantitySelector";

export function PurchasePanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);

  const [selection, setSelection] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const v of product.variants ?? []) {
      const first = v.options[0];
      if (first) initial[v.name] = first;
    }
    return initial;
  });

  const variantSummary = useMemo(() => {
    const entries = Object.entries(selection);
    if (entries.length === 0) return undefined;
    return selection;
  }, [selection]);

  return (
    <div className="space-y-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
      {(product.variants ?? []).length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {(product.variants ?? []).map((v) => (
            <label key={v.name} className="flex flex-col gap-1 text-xs text-[rgb(var(--muted))]">
              {v.name}
              <select
                value={selection[v.name] ?? ""}
                onChange={(e) => setSelection((prev) => ({ ...prev, [v.name]: e.target.value }))}
                className="h-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 text-sm text-[rgb(var(--fg))]"
              >
                {v.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-sm text-[rgb(var(--muted))]">Quantity</div>
          <QuantitySelector quantity={qty} onChange={setQty} max={Math.max(1, product.stock)} />
        </div>

        <AddToCartButton
          item={{
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0] ?? "https://placehold.co/600x400/png",
            quantity: qty,
            variant: variantSummary
          }}
          disabled={product.stock <= 0}
          className="min-w-[180px]"
        />
      </div>
    </div>
  );
}
