import { render, screen } from "@testing-library/react";
import { Providers } from "@/app/providers";

jest.mock("@/context/CartContext", () => ({
  __esModule: true,
  CartProvider: ({ children }: any) => <div data-testid="cart">{children}</div>
}));

jest.mock("@/components/ThemeProvider", () => ({
  __esModule: true,
  ThemeProvider: ({ children }: any) => <div data-testid="theme">{children}</div>
}));

jest.mock("@/components/ToastProvider", () => ({
  __esModule: true,
  ToastProvider: ({ children }: any) => <div data-testid="toast">{children}</div>
}));

describe("Providers", () => {
  it("wraps children with app providers", () => {
    render(
      <Providers>
        <div>Child</div>
      </Providers>
    );

    expect(screen.getByTestId("theme")).toBeInTheDocument();
    expect(screen.getByTestId("toast")).toBeInTheDocument();
    expect(screen.getByTestId("cart")).toBeInTheDocument();
    expect(screen.getByText("Child")).toBeInTheDocument();
  });
});
