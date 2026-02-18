"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: Record<string, string>;
};

type CartState = {
  items: CartItem[];
  hydrated: boolean;
};

type CartAction =
  | { type: "hydrate"; payload: { items: CartItem[] } }
  | { type: "add"; payload: CartItem }
  | { type: "remove"; payload: { id: string; variantKey: string } }
  | { type: "setQty"; payload: { id: string; variantKey: string; quantity: number } }
  | { type: "clear" };

const STORAGE_KEY = "cart:v1";

function toPlaceholderImage(text: string, width = 600, height = 400): string {
  const t = encodeURIComponent(text.slice(0, 48));
  return `https://placehold.co/${width}x${height}/png?text=${t}`;
}

function normalizeImageUrl(src: string | undefined, label: string): string {
  if (!src) return toPlaceholderImage(label);
  try {
    const url = new URL(src);
    if (url.hostname === "images.unsplash.com") return toPlaceholderImage(label);
    return src;
  } catch {
    return toPlaceholderImage(label);
  }
}

function normalizeCartItem(input: CartItem): CartItem {
  const safeName = typeof input.name === "string" ? input.name : "Product";
  return {
    id: String(input.id ?? ""),
    slug: String(input.slug ?? ""),
    name: safeName,
    price: Number(input.price ?? 0) || 0,
    image: normalizeImageUrl(input.image, safeName),
    quantity: Math.max(1, Math.min(99, Math.floor(Number(input.quantity ?? 1) || 1))),
    variant: input.variant && typeof input.variant === "object" ? input.variant : undefined
  };
}

function stableVariantKey(variant: CartItem["variant"]): string {
  if (!variant) return "";
  const entries = Object.entries(variant).sort(([a], [b]) => a.localeCompare(b));
  return entries.map(([k, v]) => `${k}:${v}`).join("|");
}

function sameLine(a: CartItem, b: CartItem): boolean {
  return a.id === b.id && stableVariantKey(a.variant) === stableVariantKey(b.variant);
}

function reducer(state: CartState, action: CartAction): CartState {
  if (action.type === "hydrate") {
    return { items: action.payload.items.map(normalizeCartItem), hydrated: true };
  }

  if (action.type === "add") {
    const incoming = normalizeCartItem(action.payload);
    const items = state.items.slice();
    const index = items.findIndex((it) => sameLine(it, incoming));
    if (index >= 0) {
      items[index] = {
        ...items[index],
        quantity: items[index].quantity + Math.max(1, incoming.quantity)
      };
      return { ...state, items };
    }
    return { ...state, items: [...items, { ...incoming, quantity: Math.max(1, incoming.quantity) }] };
  }

  if (action.type === "remove") {
    const items = state.items.filter(
      (it) => !(it.id === action.payload.id && stableVariantKey(it.variant) === action.payload.variantKey)
    );
    return { ...state, items };
  }

  if (action.type === "setQty") {
    const quantity = Math.max(1, Math.min(99, Math.floor(action.payload.quantity)));
    const items = state.items.map((it) => {
      const match =
        it.id === action.payload.id && stableVariantKey(it.variant) === action.payload.variantKey;
      return match ? { ...it, quantity } : it;
    });
    return { ...state, items };
  }

  return { items: [], hydrated: state.hydrated };
}

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  totalItems: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variant?: CartItem["variant"]) => void;
  setQuantity: (id: string, quantity: number, variant?: CartItem["variant"]) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], hydrated: false });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        dispatch({ type: "hydrate", payload: { items: [] } });
        return;
      }
      const parsed = JSON.parse(raw) as { items?: CartItem[] };
      const items = Array.isArray(parsed.items) ? parsed.items : [];
      dispatch({ type: "hydrate", payload: { items } });
    } catch {
      dispatch({ type: "hydrate", payload: { items: [] } });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
    } catch {
      return;
    }
  }, [state.hydrated, state.items]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, it) => sum + it.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [state.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      hydrated: state.hydrated,
      totalItems,
      subtotal,
      addItem: (item) => dispatch({ type: "add", payload: item }),
      removeItem: (id, variant) =>
        dispatch({ type: "remove", payload: { id, variantKey: stableVariantKey(variant) } }),
      setQuantity: (id, quantity, variant) =>
        dispatch({ type: "setQty", payload: { id, quantity, variantKey: stableVariantKey(variant) } }),
      clear: () => dispatch({ type: "clear" })
    }),
    [state.items, state.hydrated, subtotal, totalItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
