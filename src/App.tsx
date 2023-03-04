import { useState } from "react";
import UserForm from "./templates/UserForm";
import UserList from "./templates/UserList";

export type UserType = {
  name: string;
  email: string;
};

function App() {
  const [users, setUsers] = useState<UserType[]>([]);

  const onUserAdd = (user: UserType) => {
    setUsers([...users, user]);
  };

  return (
    <div>
      <UserForm onUserAdd={onUserAdd} />
      <hr />
      <UserList users={users}/>
    </div>
  );
}

export default App;
