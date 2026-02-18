import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductImageGallery } from "@/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("switches active image when clicking thumbnail", async () => {
    const user = userEvent.setup();
    render(
      <ProductImageGallery
        alt="Produk"
        images={[
          "https://placehold.co/1200x800/png?text=1",
          "https://placehold.co/1200x800/png?text=2"
        ]}
      />
    );

    const main = screen.getAllByRole("img", { name: "Produk" })[0] as HTMLImageElement;
    expect(main.src).toContain("text=1");

    await user.click(screen.getByRole("button", { name: /select image 2/i }));
    expect((screen.getAllByRole("img", { name: "Produk" })[0] as HTMLImageElement).src).toContain("text=2");
  });
});

