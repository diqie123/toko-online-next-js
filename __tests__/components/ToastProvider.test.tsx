import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, useToast } from "@/components/ToastProvider";

function Trigger() {
  const { toast } = useToast();
  return (
    <button type="button" onClick={() => toast("Hello")}>
      Trigger
    </button>
  );
}

describe("ToastProvider", () => {
  it("shows and auto-hides a toast", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );

    await user.click(screen.getByRole("button", { name: /trigger/i }));
    expect(screen.getByText("Hello")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2300);
    });
    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});

