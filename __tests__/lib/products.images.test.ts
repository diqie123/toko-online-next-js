describe("lib/products image normalization", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("normalizes missing/invalid/unsplash images to placeholder", () => {
    jest.doMock("@/lib/products.json", () => [
      {
        id: "p1",
        slug: "p1",
        name: "Produk 1",
        description: "Desc",
        price: 1000,
        category: "Cat",
        images: [],
        rating: 4.5,
        stock: 1,
        createdAt: "2024-01-01"
      },
      {
        id: "p2",
        slug: "p2",
        name: "Produk 2",
        description: "Desc",
        price: 2000,
        category: "Cat",
        images: ["https://images.unsplash.com/photo-123"],
        rating: 4.5,
        stock: 1,
        createdAt: "2024-01-02"
      },
      {
        id: "p3",
        slug: "p3",
        name: "Produk 3",
        description: "Desc",
        price: 3000,
        category: "Cat",
        images: ["not-a-valid-url"],
        rating: 4.5,
        stock: 1,
        createdAt: "2024-01-03"
      }
    ]);

    let mod: any;
    jest.isolateModules(() => {
      mod = require("@/lib/products");
    });

    const items = mod.getAllProducts();
    expect(items).toHaveLength(3);
    expect(items[0].images[0]).toMatch(/^https:\/\/placehold\.co\//);
    expect(items[1].images[0]).toMatch(/^https:\/\/placehold\.co\//);
    expect(items[2].images[0]).toMatch(/^https:\/\/placehold\.co\//);
  });
});
