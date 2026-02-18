import type { Metadata } from "next";
import { ProductsClient } from "@/app/products/products-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Products",
  description: "Jelajahi semua produk, filter kategori, sort harga, dan cari nama produk."
};

export default function ProductsPage() {
  return <ProductsClient />;
}

