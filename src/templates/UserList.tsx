import { UserType } from "../App";

const UserList = ({ users }: { users: UserType[] }) => {
  const renderedUsers = users.map((user, idx) => {
    return (
      <tr key={idx}>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody data-testid="users">{renderedUsers}</tbody>
    </table>
  );
};

export default UserList;
