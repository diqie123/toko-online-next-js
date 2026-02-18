"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "@/components/Modal";
import { useCart } from "@/context/CartContext";
import { formatCurrencyIDR } from "@/lib/products";

const TAX_RATE = 0.11;

export function CheckoutClient() {
  const router = useRouter();
  const { items, hydrated, subtotal, clear } = useCart();
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("transfer");
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 text-sm text-[rgb(var(--muted))]">
        Memuat checkout...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="space-y-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
        <h1 className="text-lg font-semibold">Checkout</h1>
        <p className="text-sm text-[rgb(var(--muted))]">
          Tidak ada item di cart. Tambahkan produk dulu sebelum checkout.
        </p>
        <Link
          href="/products"
          className="inline-flex rounded-xl bg-[rgb(var(--primary))] px-4 py-2 text-sm font-semibold text-white"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const canPlaceOrder = Boolean(name.trim() && email.trim() && address.trim());

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-4">
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
          <h1 className="text-lg font-semibold">Checkout</h1>
          <p className="text-sm text-[rgb(var(--muted))]">Isi data kamu untuk menyelesaikan pesanan.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!canPlaceOrder) return;
            setOrderId(`ORD-${Date.now()}`);
            setOpen(true);
          }}
          className="space-y-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-xs text-[rgb(var(--muted))]">
              Nama
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30"
                placeholder="Nama lengkap"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs text-[rgb(var(--muted))]">
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30"
                placeholder="nama@email.com"
                type="email"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-xs text-[rgb(var(--muted))]">
            Alamat
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="min-h-[100px] rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30"
              placeholder="Alamat lengkap pengiriman"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-[rgb(var(--muted))]">
            Metode pembayaran (fake)
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="h-10 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 text-sm text-[rgb(var(--fg))]"
            >
              <option value="transfer">Transfer Bank</option>
              <option value="ewallet">E-Wallet</option>
              <option value="cod">COD</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={!canPlaceOrder}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[rgb(var(--primary))] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            Place Order
          </button>

          <div className="text-xs text-[rgb(var(--muted))]">
            Dengan menekan Place Order, kamu akan melihat konfirmasi sukses (tanpa payment gateway).
          </div>
        </form>
      </section>

      <aside className="h-fit space-y-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
        <div className="text-base font-semibold">Order Summary</div>

        <div className="space-y-2 text-sm text-[rgb(var(--muted))]">
          {items.map((it) => (
            <div key={`${it.id}-${it.slug}-${it.quantity}`} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-[rgb(var(--fg))]">{it.name}</div>
                <div className="text-xs">
                  Qty {it.quantity} · {formatCurrencyIDR(it.price)}
                </div>
              </div>
              <div className="text-sm font-semibold text-[rgb(var(--fg))]">
                {formatCurrencyIDR(it.price * it.quantity)}
              </div>
            </div>
          ))}
          <div className="h-px bg-[rgb(var(--border))]" />
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-[rgb(var(--fg))]">{formatCurrencyIDR(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Tax (fake)</span>
            <span className="font-semibold text-[rgb(var(--fg))]">{formatCurrencyIDR(tax)}</span>
          </div>
          <div className="flex items-center justify-between text-[rgb(var(--fg))]">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{formatCurrencyIDR(total)}</span>
          </div>
        </div>

        <Link href="/cart" className="inline-flex w-full justify-center text-sm text-[rgb(var(--primary))] hover:underline">
          Kembali ke cart
        </Link>
      </aside>

      <Modal
        open={open}
        title="Order sukses"
        onClose={() => {
          setOpen(false);
          clear();
          router.push("/");
        }}
      >
        <div className="space-y-3">
          <div>
            Terima kasih, <span className="font-semibold text-[rgb(var(--fg))]">{name.trim()}</span>. Pesanan kamu
            berhasil dibuat.
          </div>
          <div>
            <span className="text-xs text-[rgb(var(--muted))]">Order ID</span>
            <div className="text-sm font-semibold text-[rgb(var(--fg))]">{orderId}</div>
          </div>
          <div className="text-xs text-[rgb(var(--muted))]">Metode: {payment}</div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              clear();
              router.push("/");
            }}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[rgb(var(--primary))] px-4 py-2 text-sm font-semibold text-white"
          >
            Kembali ke Home
          </button>
        </div>
      </Modal>
    </div>
  );
}
