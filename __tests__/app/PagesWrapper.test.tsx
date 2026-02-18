import { render, screen } from "@testing-library/react";
import CartPage from "@/app/cart/page";
import CheckoutPage from "@/app/checkout/page";
import ProductsPage from "@/app/products/page";

jest.mock("@/app/cart/cart-client", () => ({
  __esModule: true,
  CartClient: () => <div>CartClient</div>
}));

jest.mock("@/app/checkout/checkout-client", () => ({
  __esModule: true,
  CheckoutClient: () => <div>CheckoutClient</div>
}));

jest.mock("@/app/products/products-client", () => ({
  __esModule: true,
  ProductsClient: () => <div>ProductsClient</div>
}));

describe("Page wrappers", () => {
  it("renders CartPage", () => {
    render(<CartPage />);
    expect(screen.getByText("CartClient")).toBeInTheDocument();
  });

  it("renders CheckoutPage", () => {
    render(<CheckoutPage />);
    expect(screen.getByText("CheckoutClient")).toBeInTheDocument();
  });

  it("renders ProductsPage", () => {
    render(<ProductsPage />);
    expect(screen.getByText("ProductsClient")).toBeInTheDocument();
  });
});
