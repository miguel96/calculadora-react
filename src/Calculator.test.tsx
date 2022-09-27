import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Calculator", () => {
  it("Should let sum two numbers", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("1"));
    await user.click(screen.getByText("+"));
    await user.click(screen.getByText("2"));
    await user.click(screen.getByText("="));
    expect(screen.getByDisplayValue("3")).toBeInTheDocument();
  });
});
