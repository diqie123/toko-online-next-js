import type { Metadata } from "next";
import { CartClient } from "@/app/cart/cart-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Cart",
  description: "Lihat item di cart, ubah quantity, dan lanjut checkout."
};

export default function CartPage() {
  return <CartClient />;
}

