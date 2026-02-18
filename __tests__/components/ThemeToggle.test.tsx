import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/ThemeToggle";

const toggle = jest.fn();

jest.mock("@/components/ThemeProvider", () => ({
  __esModule: true,
  useTheme: () => ({ theme: "light", toggle })
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    toggle.mockReset();
  });

  it("calls toggle when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: /toggle dark mode/i }));
    expect(toggle).toHaveBeenCalledTimes(1);
  });
});
