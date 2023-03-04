import { screen, render, within } from "@testing-library/react";
import UserList from "./UserList";
import { UserType } from "../App";

describe("<UserList/>", () => {
  const renderComponent = () => {
    const users: UserType[] = [
      {
        name: "dean",
        email: "dean@gmail.com",
      },
      {
        name: "sam",
        email: "sam@gmail.com",
      },
    ];

    render(<UserList users={users} />);

    return { users };
  };

  test("it renders one row per user", () => {
    // Render the component
    renderComponent();

    // Find all rows
    const rows = within(screen.getByTestId("users")).getAllByRole("row");

    // Assertion: correct number of rows in the table
    expect(rows).toHaveLength(2);
  });

  test("it renders the name and email of each user", () => {
    // Render the component
    const { users } = renderComponent();

    for (let user of users) {
      const name = screen.getByRole("cell", { name: user.name });
      const email = screen.getByRole("cell", { name: user.email });

      expect(name).toBeInTheDocument();
      expect(email).toBeInTheDocument();
    }
  });
});
