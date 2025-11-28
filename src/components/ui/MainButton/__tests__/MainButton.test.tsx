import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainButton from "../MainButton";

describe("MainButton", () => {
  test("renders the button text", () => {
    render(
      <MainButton size="lg" variant="primary" type="button" state="normal">
        Clicked
      </MainButton>
    );
    expect(
      screen.getByRole("button", { name: /clicked/i })
    ).toBeInTheDocument();
  });
  test("calls onClick when clicked in normal state", async () => {
    const user = userEvent.setup(); // start a session
    const handleClick = jest.fn();

    render(
      <MainButton
        size="lg"
        variant="primary"
        type="button"
        state="normal"
        onClick={handleClick}
      >
        Click
      </MainButton>
    );
    await user.click(screen.getByRole("button", { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <MainButton
        size="lg"
        variant="primary"
        type="button"
        state="disabled"
        onClick={handleClick}
      >
        Disabled
      </MainButton>
    );
    await user.click(screen.getByRole("button", { name: /disabled/i }));
    expect(handleClick).toHaveBeenCalledTimes(0);
    expect(screen.getByRole("button")).toBeDisabled(); // from jest-dom
  });
  test("shows spinner when loading", () => {
    render(
      <MainButton size="lg" variant="primary" type="button" state="loading">
        Loading
      </MainButton>
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
  test("applies correct variant classes", () => {
    const { rerender } = render(
      <MainButton variant="primary" size="lg" state="normal" type="button">
        Primary
      </MainButton>
    );
    expect(screen.getByRole("button")).toHaveClass("bg-primary-500");
    rerender(
      <MainButton variant="accent" size="lg" state="normal" type="button">
        Accent
      </MainButton>
    );
    expect(screen.getByRole("button")).toHaveClass("bg-accent-400");
  });
});

