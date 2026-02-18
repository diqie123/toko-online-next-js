import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Carousel } from "@/components/Carousel";

describe("Carousel", () => {
  it("renders slides and supports next/prev navigation", async () => {
    const user = userEvent.setup();
    render(
      <Carousel
        slides={[
          { title: "Slide 1", subtitle: "S1", image: "https://placehold.co/1200x800/png", href: "/products" },
          { title: "Slide 2", subtitle: "S2", image: "https://placehold.co/1200x800/png", href: "/cart" }
        ]}
      />
    );

    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /next slide/i }));
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /previous slide/i }));
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });

  it("auto-plays when there are multiple slides", () => {
    jest.useFakeTimers();
    render(
      <Carousel
        slides={[
          { title: "Title A", subtitle: "Sub A", image: "https://placehold.co/1200x800/png", href: "/products" },
          { title: "Title B", subtitle: "Sub B", image: "https://placehold.co/1200x800/png", href: "/cart" }
        ]}
      />
    );

    expect(screen.getByText("Title A")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(4600);
    });
    expect(screen.getByText("Title B")).toBeInTheDocument();
    jest.useRealTimers();
  });
});
