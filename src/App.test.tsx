import React from "react";
import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("it can receive a new user and show it on a list", () => {
  const name = "Jane";
  const email = "jane@jane.com";

  render(<App />);

  // Find elements
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    /* fire events that update state */
    
    // Simulate typing in a name
    user.click(nameInput);
    user.keyboard(name);

    // Simulate typing in an email
    user.click(emailInput);
    user.keyboard(email);

    // Simulate button click
    user.click(button);
  });

  // Find tr with name and email
  const nameData = screen.getByRole("cell", { name });
  const emailData = screen.getByRole("cell", { name: email });

  // Assertion: new name and email are in the document
  expect(nameData).toBeInTheDocument();
  expect(emailData).toBeInTheDocument();
});
