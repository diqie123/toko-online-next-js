import { render, screen } from "@testing-library/react";

describe("Product detail (app/products/[slug])", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("generateStaticParams returns slugs", async () => {
    jest.doMock("@/lib/products", () => ({
      __esModule: true,
      getAllProducts: () => [{ slug: "a" }, { slug: "b" }],
      getProductBySlug: () => undefined,
      getRelatedProducts: () => [],
      formatCurrencyIDR: (v: number) => String(v)
    }));
    jest.doMock("next/navigation", () => ({ __esModule: true, notFound: () => {} }));

    const mod = await import("@/app/products/[slug]/page");
    expect(mod.generateStaticParams()).toEqual([{ slug: "a" }, { slug: "b" }]);
  });

  it("generateMetadata uses product fields", async () => {
    jest.doMock("@/lib/products", () => ({
      __esModule: true,
      getAllProducts: () => [],
      getProductBySlug: (slug: string) =>
        slug === "x"
          ? {
              slug: "x",
              name: "Produk X",
              description: "Desc",
              images: ["https://placehold.co/1200x800/png"]
            }
          : undefined,
      getRelatedProducts: () => [],
      formatCurrencyIDR: (v: number) => String(v)
    }));
    jest.doMock("next/navigation", () => ({ __esModule: true, notFound: () => {} }));

    const mod = await import("@/app/products/[slug]/page");
    const meta = mod.generateMetadata({ params: { slug: "x" } });
    expect(meta.title).toBe("Produk X");
    expect(meta.description).toBe("Desc");
    expect((meta.openGraph as any)?.images?.[0]?.url).toContain("placehold.co");
  });

  it("renders product detail and related products", async () => {
    jest.doMock("@/components/ProductImageGallery", () => ({
      __esModule: true,
      ProductImageGallery: ({ alt }: any) => <div>Gallery {alt}</div>
    }));
    jest.doMock("@/app/products/[slug]/purchase-panel", () => ({
      __esModule: true,
      PurchasePanel: ({ product }: any) => <div>Buy {product.slug}</div>
    }));
    jest.doMock("@/components/ProductCard", () => ({
      __esModule: true,
      ProductCard: ({ product }: any) => <div>Card {product.slug}</div>
    }));
    jest.doMock("@/lib/products", () => ({
      __esModule: true,
      getAllProducts: () => [],
      getProductBySlug: () => ({
        id: "p-1",
        slug: "produk-1",
        name: "Produk 1",
        description: "Desc",
        price: 1000,
        category: "Elektronik",
        images: ["https://placehold.co/1200x800/png"],
        rating: 4.5,
        stock: 10,
        variants: [],
        createdAt: new Date().toISOString()
      }),
      getRelatedProducts: () => [{ id: "p-2", slug: "produk-2" }],
      formatCurrencyIDR: () => "Rp 1.000"
    }));
    jest.doMock("next/navigation", () => ({ __esModule: true, notFound: () => {} }));

    const mod = await import("@/app/products/[slug]/page");
    render(mod.default({ params: { slug: "produk-1" } }));

    expect(screen.getByRole("heading", { name: "Produk 1" })).toBeInTheDocument();
    expect(screen.getByText("Gallery Produk 1")).toBeInTheDocument();
    expect(screen.getByText("Buy produk-1")).toBeInTheDocument();
    expect(screen.getByText(/related products/i)).toBeInTheDocument();
    expect(screen.getByText("Card produk-2")).toBeInTheDocument();
  });

  it("calls notFound when slug not found", async () => {
    const notFound = jest.fn(() => {
      throw new Error("NOT_FOUND");
    });
    jest.doMock("@/lib/products", () => ({
      __esModule: true,
      getAllProducts: () => [],
      getProductBySlug: () => undefined,
      getRelatedProducts: () => [],
      formatCurrencyIDR: () => ""
    }));
    jest.doMock("next/navigation", () => ({ __esModule: true, notFound }));

    const mod = await import("@/app/products/[slug]/page");
    expect(() => mod.default({ params: { slug: "missing" } })).toThrow("NOT_FOUND");
    expect(notFound).toHaveBeenCalledTimes(1);
  });
});

