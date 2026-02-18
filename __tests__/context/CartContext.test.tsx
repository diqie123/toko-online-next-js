import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "@/context/CartContext";

function Harness() {
  const cart = useCart();
  return (
    <div>
      <div data-testid="hydrated">{String(cart.hydrated)}</div>
      <div data-testid="totalItems">{cart.totalItems}</div>
      <div data-testid="subtotal">{cart.subtotal}</div>
      <div data-testid="items">{JSON.stringify(cart.items)}</div>
      <button
        type="button"
        onClick={() =>
          cart.addItem({
            id: "p-1",
            slug: "p-1",
            name: "Produk 1",
            price: 1000,
            image: "https://images.unsplash.com/photo-1?auto=format&fit=crop&w=1200&q=80",
            quantity: 1
          })
        }
      >
        Add
      </button>
      <button
        type="button"
        onClick={() =>
          cart.addItem({
            id: "p-1",
            slug: "p-1",
            name: "Produk 1",
            price: 1000,
            image: "https://placehold.co/600x400/png",
            quantity: 2,
            variant: { Warna: "Hitam" }
          })
        }
      >
        AddVariant
      </button>
      <button type="button" onClick={() => cart.setQuantity("p-1", 5)}>
        SetQty
      </button>
      <button type="button" onClick={() => cart.removeItem("p-1")}>
        Remove
      </button>
      <button type="button" onClick={() => cart.clear()}>
        Clear
      </button>
    </div>
  );
}

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("hydrates from localStorage", async () => {
    localStorage.setItem(
      "cart:v1",
      JSON.stringify({
        items: [
          { id: "p-2", slug: "p-2", name: "Produk 2", price: 2000, image: "", quantity: 2 }
        ]
      })
    );

    render(
      <CartProvider>
        <Harness />
      </CartProvider>
    );

    expect(await screen.findByTestId("hydrated")).toHaveTextContent("true");
    expect(screen.getByTestId("totalItems")).toHaveTextContent("2");
  });

  it("adds items, merges same line, updates subtotal, and persists", async () => {
    const user = userEvent.setup();
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    render(
      <CartProvider>
        <Harness />
      </CartProvider>
    );

    expect(await screen.findByTestId("hydrated")).toHaveTextContent("true");
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByTestId("totalItems")).toHaveTextContent("1");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("1000");

    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByTestId("totalItems")).toHaveTextContent("2");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("2000");

    await user.click(screen.getByRole("button", { name: "AddVariant" }));
    expect(screen.getByTestId("totalItems")).toHaveTextContent("4");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("4000");

    const items = JSON.parse(screen.getByTestId("items").textContent ?? "[]") as Array<any>;
    expect(items.length).toBe(2);
    expect(items[0].image).toMatch(/^https:\/\/placehold\.co\//);
    expect(setItemSpy).toHaveBeenCalled();
  });

  it("setQuantity clamps between 1 and 99", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <Harness />
      </CartProvider>
    );

    expect(await screen.findByTestId("hydrated")).toHaveTextContent("true");
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(screen.getByRole("button", { name: "SetQty" }));
    expect(screen.getByTestId("totalItems")).toHaveTextContent("5");
  });

  it("removes and clears items", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <Harness />
      </CartProvider>
    );

    expect(await screen.findByTestId("hydrated")).toHaveTextContent("true");
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(screen.getByTestId("totalItems")).toHaveTextContent("0");

    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.getByTestId("totalItems")).toHaveTextContent("0");
  });
});

