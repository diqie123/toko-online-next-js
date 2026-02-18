import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";

describe("Footer", () => {
  it("renders links and copyright", () => {
    render(<Footer />);

    expect(screen.getByText("TokoOnline")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/products");
    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute("href", "/cart");
    expect(screen.getByRole("link", { name: "Checkout" })).toHaveAttribute("href", "/checkout");

    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });
});
