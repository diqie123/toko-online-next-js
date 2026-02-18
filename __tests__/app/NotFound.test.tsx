import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

describe("NotFound", () => {
  it("renders 404 and navigation links", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText(/tidak ditemukan/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /kembali ke home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /browse products/i })).toHaveAttribute("href", "/products");
  });
});
