import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl space-y-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 text-center">
      <div className="text-3xl font-semibold tracking-tight">404</div>
      <div className="text-sm text-[rgb(var(--muted))]">
        Halaman yang kamu cari tidak ditemukan.
      </div>
      <div className="flex flex-col justify-center gap-2 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-[rgb(var(--primary))] px-4 py-2 text-sm font-semibold text-white"
        >
          Kembali ke Home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 py-2 text-sm font-semibold"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}

