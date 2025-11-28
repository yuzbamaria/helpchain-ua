import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LinkButton from "../LinkButton";

describe("LinkButton", () => {
  test("renders the button text", () => {
    render(
      <LinkButton size="md" variant="left" type="button" state="normal">
        Click
      </LinkButton>
    );
    expect(screen.getByRole("button", { name: /click/i })).toBeInTheDocument();
  });
  test("calls onClick when clicked in normal state", async () => {
    const user = userEvent.setup(); // start a session
    const handleClick = jest.fn();

    render(
      <LinkButton
        size="md"
        variant="left"
        type="button"
        state="normal"
        onClick={handleClick}
      >
        Clicked
      </LinkButton>
    );
    await user.click(screen.getByRole("button", { name: /clicked/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test("applies correct variant classes", () => {
    const { rerender } = render(
      <LinkButton size="md" variant="left" type="button" state="normal">
        Left
      </LinkButton>
    );
    expect(screen.getByRole("button")).toHaveClass("text-primary-500");

    rerender(
      <LinkButton size="md" variant="left" type="button" state="pressed">
        Right
      </LinkButton>
    );
    expect(screen.getByRole("button")).toHaveClass("text-primary-900");
  });
  test("renders left and right icons", () => {
    render(
      <LinkButton
        size="md"
        variant="left"
        type="button"
        state="normal"
        iconLeft={<span />} 
        iconRight={<span />} 
      >
        Click
      </LinkButton>
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });
});
