import { screen, render, act } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

describe("<UserForm/>", () => {
  test("it shows two inputs and a button", () => {
    // Step 1: render the component
    render(<UserForm onUserAdd={() => {}} />);

    // Step 2: Manipulate the component or find element(s) in it
    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    // Step 3: Make an assertion - make sure the component is doing what we expect it to do
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
  });

  //* NOT THE BEST IMPLEMENTATION
  //   test("it calls onUserAdd() when the form is submitted NOT THE BEST IMPLEMENTATION", () => {

  //     const name = "Jane";
  //     const email = "jane@jane.com";

  //     const argsList: any[] = [];
  //     const callback = (...args: any) => {
  //       argsList.push(args);
  //     };

  //     // Try to render component
  //     render(<UserForm onUserAdd={callback} />);

  //     // Find two inputs
  //     const [nameInput, emailInput] = screen.getAllByRole("textbox");

  //     // Simulate typing in a name
  //     user.click(nameInput);
  //     user.keyboard(name);

  //     // Simulate typing in an email
  //     user.click(emailInput);
  //     user.keyboard(email);

  //     // Find the button
  //     const button = screen.getByRole("button");

  //     // Simulate clicking on the button
  //     user.click(button);

  //     // Assertion to make sure "onUserAdd()" get called with name and email
  //     expect(argsList).toHaveLength(1);
  //     expect(argsList[0][0]).toEqual({ name, email });
  //   });

  //* BETTER IMPLEMENTATION
  test("it calls onUserAdd() when the form is submitted: BETTER IMPLEMENTATION", () => {
    const name = "Jane";
    const email = "jane@jane.com";

    const mockOnUserAdd = jest.fn();

    // Try to render component
    render(<UserForm onUserAdd={mockOnUserAdd} />);

    // Find two inputs
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    // Find the button
    const button = screen.getByRole("button");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      // Simulate typing in a name
      user.click(nameInput);
      user.keyboard(name);

      // Simulate typing in an email
      user.click(emailInput);
      user.keyboard(email);

      // Simulate clicking on the button
      user.click(button);
    });

    // Assertion to make sure "onUserAdd()" get called with name and email
    expect(mockOnUserAdd).toHaveBeenCalled();
    expect(mockOnUserAdd).toHaveBeenCalledWith({ name, email });
  });

  test("it empties the two inputs when for is submitted", () => {
    const name = "Jane";
    const email = "jane@jane.com";

    // Try to render component
    render(<UserForm onUserAdd={() => {}} />);

    // Find all necessary elements
    const button = screen.getByRole("button");
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      // Simulate user interaction
      user.click(nameInput);
      user.keyboard(name);

      user.click(emailInput);
      user.keyboard(email);
    });

    // Assertion: name and email inputs should have values
    expect(nameInput).toHaveValue(name);
    expect(emailInput).toHaveValue(email);
    
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
        // Simulate user form submission
        user.click(button);
    });
    
    // Assertion: name and email inputs should have empty string
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  });
});
