import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuantitySelector } from "@/components/QuantitySelector";

describe("QuantitySelector", () => {
  it("increments and decrements within bounds", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<QuantitySelector quantity={2} onChange={onChange} min={1} max={3} />);

    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(onChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(onChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole("button", { name: /decrease quantity/i }));
    expect(onChange).toHaveBeenCalledWith(1);

    await user.click(screen.getByRole("button", { name: /decrease quantity/i }));
    expect(onChange).toHaveBeenCalledWith(1);
  });
});

