import { render } from "@testing-library/react";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

describe("LoadingSkeleton", () => {
  it("renders default rows", () => {
    const { container } = render(<LoadingSkeleton />);
    const cards = container.querySelectorAll(".animate-pulse");
    expect(cards.length).toBe(8);
  });

  it("renders custom rows", () => {
    const { container } = render(<LoadingSkeleton rows={3} />);
    const cards = container.querySelectorAll(".animate-pulse");
    expect(cards.length).toBe(3);
  });
});

