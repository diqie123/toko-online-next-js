import RootLayout from "@/app/layout";
import { render, screen } from "@testing-library/react";

jest.mock("@/app/providers", () => ({
  __esModule: true,
  Providers: ({ children }: any) => <div data-testid="providers">{children}</div>
}));

jest.mock("@/components/Navbar", () => ({
  __esModule: true,
  Navbar: ({ categories }: any) => <div>Navbar:{categories.join(",")}</div>
}));

jest.mock("@/components/Footer", () => ({
  __esModule: true,
  Footer: () => <div>Footer</div>
}));

jest.mock("@/lib/products", () => ({
  __esModule: true,
  getCategories: () => ["Elektronik", "Fashion"]
}));

describe("RootLayout", () => {
  it("renders navbar, children, and footer", () => {
    const err = jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <RootLayout>
        <div>ChildContent</div>
      </RootLayout>
    );

    expect(screen.getByTestId("providers")).toBeInTheDocument();
    expect(screen.getByText("Navbar:Elektronik,Fashion")).toBeInTheDocument();
    expect(screen.getByText("ChildContent")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();

    err.mockRestore();
  });
});
