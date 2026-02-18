import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div className="space-y-2">
          <div className="text-sm font-semibold">TokoOnline</div>
          <p className="text-sm text-[rgb(var(--muted))]">
            Toko online statis berbasis Next.js 14, cepat dan SEO-friendly.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">Links</div>
          <div className="flex flex-col gap-2 text-sm text-[rgb(var(--muted))]">
            <Link href="/products" prefetch={false} className="hover:text-[rgb(var(--fg))]">
              Products
            </Link>
            <Link href="/cart" prefetch={false} className="hover:text-[rgb(var(--fg))]">
              Cart
            </Link>
            <Link href="/checkout" prefetch={false} className="hover:text-[rgb(var(--fg))]">
              Checkout
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">Social</div>
          <div className="flex flex-col gap-2 text-sm text-[rgb(var(--muted))]">
            <a href="https://twitter.com" className="hover:text-[rgb(var(--fg))]" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a href="https://instagram.com" className="hover:text-[rgb(var(--fg))]" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://github.com" className="hover:text-[rgb(var(--fg))]" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgb(var(--border))]">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-[rgb(var(--muted))]">
          © {new Date().getFullYear()} TokoOnline. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
