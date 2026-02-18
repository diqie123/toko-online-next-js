import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "@/components/ProductCard";
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

describe("ProductCard", () => {
  beforeEach(() => {
    addItem.mockReset();
    toast.mockReset();
  });

  it("renders name, price, rating, image, and supports add to cart", async () => {
    const user = userEvent.setup();
    const product: Product = {
      id: "p-1",
      slug: "produk-1",
      name: "Produk 1",
      description: "Desc",
      price: 125000,
      category: "Elektronik",
      images: ["https://placehold.co/1200x800/png"],
      rating: 4.6,
      stock: 10,
      variants: [],
      createdAt: new Date().toISOString(),
      tags: []
    };

    const { container } = render(<ProductCard product={product} />);
    expect(screen.getByText("Produk 1")).toBeInTheDocument();
    expect(screen.getByText("4.6")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Produk 1" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(addItem).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  it("disables add to cart when stock is 0", () => {
    const product: Product = {
      id: "p-2",
      slug: "produk-2",
      name: "Produk 2",
      description: "Desc",
      price: 1000,
      category: "Elektronik",
      images: ["https://placehold.co/1200x800/png"],
      rating: 4.1,
      stock: 0,
      variants: [],
      createdAt: new Date().toISOString(),
      tags: []
    };

    render(<ProductCard product={product} />);
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeDisabled();
  });
});

