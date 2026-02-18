import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "@/components/Navbar";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams("")
}));

jest.mock("@/components/ThemeToggle", () => ({
  __esModule: true,
  ThemeToggle: () => null
}));

jest.mock("@/context/CartContext", () => ({
  __esModule: true,
  useCart: () => ({ totalItems: 3 })
}));

describe("Navbar", () => {
  beforeEach(() => {
    push.mockReset();
  });

  it("renders logo, nav links, and cart badge", () => {
    const { container } = render(<Navbar categories={["Elektronik", "Fashion"]} />);
    expect(screen.getByText("TokoOnline")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /products/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("submits search and navigates", async () => {
    const user = userEvent.setup();
    render(<Navbar categories={["Elektronik"]} />);
    const input = screen.getAllByPlaceholderText(/cari produk/i)[0];
    await user.type(input, "keyboard");
    await user.keyboard("{Enter}");
    expect(push).toHaveBeenCalledWith(expect.stringContaining("/products?q="));
  });
});

