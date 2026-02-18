import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "@/components/Modal";

describe("Modal", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <Modal open={false} title="Title" onClose={() => {}}>
        Content
      </Modal>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders title and children when open and closes on overlay click", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Modal open title="Order sukses" onClose={onClose}>
        <div>Isi modal</div>
      </Modal>
    );

    expect(screen.getByText("Order sukses")).toBeInTheDocument();
    expect(screen.getByText("Isi modal")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close modal/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

