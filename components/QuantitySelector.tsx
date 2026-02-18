"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99
}: {
  quantity: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-l-xl hover:bg-black/5 dark:hover:bg-white/5"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <div className="min-w-10 px-3 text-center text-sm font-semibold">{quantity}</div>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-r-xl hover:bg-black/5 dark:hover:bg-white/5"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
