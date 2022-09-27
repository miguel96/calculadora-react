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

  it("Should let substract two numbers", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("5"));
    await user.click(screen.getByText("-"));
    await user.click(screen.getByText("1"));
    await user.click(screen.getByText("="));
    expect(screen.getByDisplayValue("4")).toBeInTheDocument();
  });

  it("Should let join add and substract ops", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("5"));
    await user.click(screen.getByText("-"));
    await user.click(screen.getByText("1"));
    await user.click(screen.getByText("+"));
    await user.click(screen.getByText("3"));
    await user.click(screen.getByText("="));
    expect(screen.getByDisplayValue("7")).toBeInTheDocument();
  });

  it("Should show an error on invalid ops", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("5"));
    await user.click(screen.getByText("-"));
    await user.click(screen.getByText("-"));
    await user.click(screen.getByText("+"));
    await user.click(screen.getByText("3"));
    await user.click(screen.getByText("="));
    expect(screen.getByText("invalid operation")).toBeInTheDocument();
  });
});
