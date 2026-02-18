import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { CartItem } from "@/context/CartContext";
import { CartClient } from "@/app/cart/cart-client";

const removeItem = jest.fn();
const setQuantity = jest.fn();

let cartValue: {
  hydrated: boolean;
  items: CartItem[];
  subtotal: number;
  totalItems: number;
  removeItem: typeof removeItem;
  setQuantity: typeof setQuantity;
};

jest.mock("@/context/CartContext", () => ({
  __esModule: true,
  useCart: () => cartValue
}));

describe("CartClient", () => {
  beforeEach(() => {
    removeItem.mockReset();
    setQuantity.mockReset();
    cartValue = {
      hydrated: true,
      items: [],
      subtotal: 0,
      totalItems: 0,
      removeItem,
      setQuantity
    };
  });

  it("renders cart items and totals, supports remove and quantity change", async () => {
    const user = userEvent.setup();
    cartValue = {
      hydrated: true,
      items: [
        {
          id: "p-1",
          slug: "produk-1",
          name: "Produk 1",
          price: 1000,
          image: "https://placehold.co/600x400/png",
          quantity: 2
        }
      ],
      subtotal: 2000,
      totalItems: 2,
      removeItem,
      setQuantity
    };
    render(<CartClient />);

    expect(screen.getByRole("heading", { name: /cart/i })).toBeInTheDocument();
    expect(screen.getByText("Produk 1")).toBeInTheDocument();
    expect(screen.getByText(/2 item/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /remove item/i }));
    expect(removeItem).toHaveBeenCalledWith("p-1", undefined);

    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(setQuantity).toHaveBeenCalledWith("p-1", 3, undefined);
  });

  it("renders empty state when cart is empty", () => {
    render(<CartClient />);
    expect(screen.getByRole("heading", { name: /cart/i })).toBeInTheDocument();
    expect(screen.getByText(/masih kosong/i)).toBeInTheDocument();
  });
});
