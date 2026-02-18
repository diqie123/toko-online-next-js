import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PurchasePanel } from "@/app/products/[slug]/purchase-panel";
import type { Product } from "@/lib/types";

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

describe("PurchasePanel", () => {
  beforeEach(() => {
    addItem.mockReset();
    toast.mockReset();
  });

  it("limits quantity by stock and adds to cart with variant", async () => {
    const user = userEvent.setup();
    const product: Product = {
      id: "p-1",
      slug: "produk-1",
      name: "Produk 1",
      description: "Desc",
      price: 1000,
      category: "Elektronik",
      images: ["https://placehold.co/1200x800/png"],
      rating: 4.5,
      stock: 1,
      variants: [{ name: "Warna", options: ["Hitam", "Putih"] }],
      createdAt: new Date().toISOString(),
      tags: []
    };

    render(<PurchasePanel product={product} />);
    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(screen.getByText("1")).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(/warna/i), "Putih");
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(addItem).toHaveBeenCalledTimes(1);
    expect(addItem).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "p-1",
        quantity: 1,
        variant: expect.objectContaining({ Warna: "Putih" })
      })
    );
    expect(toast).toHaveBeenCalled();
  });
});

