"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart, type CartItem } from "@/context/CartContext";
import { formatCurrencyIDR } from "@/lib/products";

const TAX_RATE = 0.11;

function variantText(item: CartItem): string {
  const entries = Object.entries(item.variant ?? {});
  if (entries.length === 0) return "";
  return entries.map(([k, v]) => `${k}: ${v}`).join(" · ");
}

export function CartClient() {
  const { items, hydrated, subtotal, removeItem, setQuantity, totalItems } = useCart();

  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 text-sm text-[rgb(var(--muted))]">
        Memuat cart...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="space-y-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
        <h1 className="text-lg font-semibold">Cart</h1>
        <p className="text-sm text-[rgb(var(--muted))]">Cart kamu masih kosong.</p>
        <Link
          href="/products"
          className="inline-flex rounded-xl bg-[rgb(var(--primary))] px-4 py-2 text-sm font-semibold text-white"
        >
          Mulai belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-4">
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
          <h1 className="text-lg font-semibold">Cart</h1>
          <p className="text-sm text-[rgb(var(--muted))]">{totalItems} item</p>
        </div>

        <div className="space-y-3">
          {items.map((it) => {
            const vText = variantText(it);
            return (
              <div
                key={`${it.id}-${vText}`}
                className="flex gap-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
                  <Image src={it.image} alt={it.name} fill sizes="80px" className="object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link href={`/products/${it.slug}`} className="block truncate text-sm font-semibold hover:underline">
                        {it.name}
                      </Link>
                      {vText ? <div className="mt-1 text-xs text-[rgb(var(--muted))]">{vText}</div> : null}
                      <div className="mt-2 text-sm font-semibold">{formatCurrencyIDR(it.price)}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(it.id, it.variant)}
                      className="inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 py-2 text-sm hover:opacity-90"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <QuantitySelector
                      quantity={it.quantity}
                      onChange={(qty) => setQuantity(it.id, qty, it.variant)}
                    />
                    <div className="text-sm font-semibold">
                      {formatCurrencyIDR(it.price * it.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <aside className="h-fit space-y-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
        <div className="text-base font-semibold">Ringkasan</div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-[rgb(var(--muted))]">
            <span>Subtotal</span>
            <span className="font-semibold text-[rgb(var(--fg))]">{formatCurrencyIDR(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-[rgb(var(--muted))]">
            <span>Tax (fake)</span>
            <span className="font-semibold text-[rgb(var(--fg))]">{formatCurrencyIDR(tax)}</span>
          </div>
          <div className="h-px bg-[rgb(var(--border))]" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Total</span>
            <span className="text-sm font-semibold">{formatCurrencyIDR(total)}</span>
          </div>
        </div>

        <Link
          href="/checkout"
          className="inline-flex w-full items-center justify-center rounded-xl bg-[rgb(var(--primary))] px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
        >
          Proceed to Checkout
        </Link>

        <Link href="/products" className="inline-flex w-full justify-center text-sm text-[rgb(var(--primary))] hover:underline">
          Lanjut belanja
        </Link>
      </aside>
    </div>
  );
}

