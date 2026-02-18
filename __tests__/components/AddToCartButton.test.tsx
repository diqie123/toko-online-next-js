import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddToCartButton } from "@/components/AddToCartButton";

const addItem = jest.fn();
const toast = jest.fn();

jest.mock("@/context/CartContext", () => ({
  __esModule: true,
  useCart: () => ({ addItem })
}));

jest.mock("@/components/ToastProvider", () => ({
  __esModule: true,
  useToast: () => ({ toast })
}));

describe("AddToCartButton", () => {
  beforeEach(() => {
    addItem.mockReset();
    toast.mockReset();
  });

  it("renders and triggers addItem + toast", async () => {
    const user = userEvent.setup();
    render(
      <AddToCartButton
        item={{
          id: "p-1",
          slug: "p-1",
          name: "Produk",
          price: 1000,
          image: "https://placehold.co/600x400/png",
          quantity: 1
        }}
      />
    );

    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(addItem).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalledWith(expect.stringMatching(/ditambahkan/i));
  });

  it("is disabled when disabled=true", async () => {
    const user = userEvent.setup();
    render(
      <AddToCartButton
        disabled
        item={{
          id: "p-1",
          slug: "p-1",
          name: "Produk",
          price: 1000,
          image: "https://placehold.co/600x400/png",
          quantity: 1
        }}
      />
    );

    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(addItem).not.toHaveBeenCalled();
    expect(toast).not.toHaveBeenCalled();
  });
});

