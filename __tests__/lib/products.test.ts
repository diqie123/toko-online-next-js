import {
  filterProducts,
  formatCurrencyIDR,
  getAllProducts,
  getCategories,
  paginate,
  sortProducts
} from "@/lib/products";

describe("lib/products", () => {
  it("formatCurrencyIDR formats numbers to IDR", () => {
    expect(formatCurrencyIDR(0)).toMatch(/Rp/);
    expect(formatCurrencyIDR(15000)).toContain("15.000");
  });

  it("getCategories returns unique categories", () => {
    const categories = getCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(new Set(categories).size).toBe(categories.length);
  });

  it("filterProducts filters by category", () => {
    const categories = getCategories();
    const category = categories[0];
    const items = filterProducts({ category });
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((p) => p.category === category)).toBe(true);
  });

  it("filterProducts filters by query", () => {
    const products = getAllProducts();
    const needle = products[0].name.split(" ")[0];
    const items = filterProducts({ query: needle });
    expect(items.length).toBeGreaterThan(0);
    expect(items.some((p) => p.slug === products[0].slug)).toBe(true);
  });

  it("sortProducts sorts by price ascending", () => {
    const sorted = sortProducts(getAllProducts(), "price-asc");
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].price).toBeGreaterThanOrEqual(sorted[i - 1].price);
    }
  });

  it("paginate returns correct page bounds", () => {
    const items = Array.from({ length: 25 }).map((_, i) => i + 1);
    const page1 = paginate(items, 1, 10);
    const page3 = paginate(items, 3, 10);
    expect(page1.items).toHaveLength(10);
    expect(page3.items).toHaveLength(5);
    expect(page3.totalPages).toBe(3);
  });
});

