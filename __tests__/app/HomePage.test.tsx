import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

jest.mock("@/components/ProductCard", () => ({
  __esModule: true,
  ProductCard: ({ product }: any) => <div>{product.name}</div>
}));

jest.mock("@/components/Carousel", () => ({
  __esModule: true,
  Carousel: ({ slides }: any) => <div>{slides?.[0]?.title ?? "Carousel"}</div>
}));

describe("HomePage", () => {
  it("renders hero, featured products, categories, and best sellers sections", () => {
    render(<HomePage />);
    expect(screen.getByText("TokoOnline")).toBeInTheDocument();
    expect(screen.getByText(/featured products/i)).toBeInTheDocument();
    expect(screen.getByText(/categories/i)).toBeInTheDocument();
    expect(screen.getByText(/best sellers/i)).toBeInTheDocument();
    expect(screen.getByText(/belanja cepat/i)).toBeInTheDocument();
  });
});

