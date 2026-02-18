import type { Metadata } from "next";
import { CheckoutClient } from "@/app/checkout/checkout-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Isi data pengiriman, pilih pembayaran (fake), dan place order."
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}

