import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { CartItem } from "@/context/CartContext";
import { CheckoutClient } from "@/app/checkout/checkout-client";

const push = jest.fn();
const clear = jest.fn();

let cartState: {
  hydrated: boolean;
  items: CartItem[];
  subtotal: number;
  clear: () => void;
};

jest.mock("@/context/CartContext", () => ({
  __esModule: true,
  useCart: () => cartState
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({ push })
}));

describe("CheckoutClient", () => {
  beforeEach(() => {
    push.mockReset();
    clear.mockReset();
    cartState = { hydrated: true, items: [], subtotal: 0, clear };
  });

  it("renders empty cart state", () => {
    render(<CheckoutClient />);
    expect(screen.getByRole("heading", { name: /checkout/i })).toBeInTheDocument();
    expect(screen.getByText(/tidak ada item/i)).toBeInTheDocument();
  });

  it("validates form, opens modal, clears cart and navigates home", async () => {
    const user = userEvent.setup();
    cartState = {
      hydrated: true,
      items: [
        {
          id: "p-1",
          slug: "p-1",
          name: "Produk 1",
          price: 1000,
          image: "https://placehold.co/600x400/png",
          quantity: 2
        }
      ],
      subtotal: 2000,
      clear
    };
    render(<CheckoutClient />);

    const placeOrder = screen.getByRole("button", { name: /place order/i });
    expect(placeOrder).toBeDisabled();

    await user.type(screen.getByPlaceholderText(/nama lengkap/i), "Dika");
    await user.type(screen.getByPlaceholderText(/nama@email\.com/i), "dika@email.com");
    await user.type(screen.getByPlaceholderText(/alamat lengkap pengiriman/i), "Jl. Testing 123");
    expect(placeOrder).toBeEnabled();

    await user.click(placeOrder);
    expect(await screen.findByText(/order sukses/i)).toBeInTheDocument();
    expect(screen.getByText(/ord-/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /kembali ke home/i }));
    expect(clear).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/");
  });
});
