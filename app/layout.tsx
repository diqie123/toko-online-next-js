import type { Metadata } from "next";
import "@/app/globals.css";
import { Suspense } from "react";
import { Providers } from "@/app/providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: {
    default: "TokoOnline",
    template: "%s | TokoOnline"
  },
  description: "Website toko online statis menggunakan Next.js 14 (App Router).",
  keywords: ["toko online", "next.js", "tailwind", "SSG", "produk"],
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "TokoOnline",
    description: "Website toko online statis menggunakan Next.js 14 (App Router).",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "TokoOnline",
    description: "Website toko online statis menggunakan Next.js 14 (App Router)."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = getCategories();

  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Suspense
              fallback={
                <div className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 backdrop-blur">
                  <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
                    <div className="h-5 w-28 animate-pulse rounded bg-black/5 dark:bg-white/5" />
                    <div className="ml-auto h-10 w-28 animate-pulse rounded-xl bg-black/5 dark:bg-white/5" />
                  </div>
                </div>
              }
            >
              <Navbar categories={categories} />
            </Suspense>
            <main className="flex-1">
              <div className="mx-auto w-full max-w-6xl px-4 py-8">{children}</div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
