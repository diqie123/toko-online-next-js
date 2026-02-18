"use client";

import { ShoppingCart } from "lucide-react";
import { useCart, type CartItem } from "@/context/CartContext";
import { useToast } from "@/components/ToastProvider";

export function AddToCartButton({
  item,
  disabled = false,
  className = ""
}: {
  item: CartItem;
  disabled?: boolean;
  className?: string;
}) {
  const { addItem } = useCart();
  const { toast } = useToast();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        addItem(item);
        toast("Produk ditambahkan ke cart");
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[rgb(var(--primary))] px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      <ShoppingCart size={16} />
      Add to Cart
    </button>
  );
}
