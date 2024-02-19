import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { AxiosError, CanceledError } from "./services/api-client";
import { useEffect, useState } from "react";
import UserService, { User } from "./services/user-service";
import userService from "./services/user-service";
// import { AxiosError, CanceledError } from "axios";
// import ProductList from "./components/ProductList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const deleteUser = (user: User) => {
    const orginalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    UserService.deleteUser(user.id).catch((err) => {
      setError(err.message);
      setUsers(orginalUsers);
      console.log(err);
    });
  };

  useEffect(() => {
    const { request, cancel } = UserService.getAllUsers();

    request
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => cancel();
  }, []);

  const addUser = () => {
    const newUser = { id: 0, name: "Fahim KP" };
    // const oldUsers = [...users
    userService
      .addUser(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]));

    // setUsers([newUser, ...users]);
  };

  const updateUser = (user: User) => {
    const orginalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "8" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    UserService.updateUser(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(orginalUsers);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border" role="status"></div>}

      <button className="btn btn-primary mb-3" onClick={() => addUser()}>
        add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}

            <div>
              <button
                className="btn btn-outline-success mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
