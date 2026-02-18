import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductsClient } from "@/app/products/products-client";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams("sort=newest&page=1")
}));

jest.mock("@/components/ProductCard", () => ({
  __esModule: true,
  ProductCard: ({ product }: any) => <div>{product.name}</div>
}));

describe("ProductsClient", () => {
  beforeEach(() => {
    push.mockReset();
  });

  it("renders products grid and summary", () => {
    render(<ProductsClient />);
    expect(screen.getByRole("heading", { name: /products/i })).toBeInTheDocument();
    expect(screen.getByText(/menampilkan/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
  });

  it("updates URL params when changing sort and search", async () => {
    const user = userEvent.setup();
    render(<ProductsClient />);

    await user.selectOptions(screen.getByLabelText(/sort/i), "price-asc");
    expect(push).toHaveBeenCalledWith(expect.stringContaining("sort=price-asc"));

    const input = screen.getByPlaceholderText(/ketik nama produk/i);
    await user.click(input);
    await user.paste("neo");
    expect(push).toHaveBeenCalledWith(expect.stringContaining("q=neo"));
  });

  it("navigates to next page", async () => {
    const user = userEvent.setup();
    render(<ProductsClient />);
    expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(push).toHaveBeenCalledWith(expect.stringContaining("page=2"));
  });
});
