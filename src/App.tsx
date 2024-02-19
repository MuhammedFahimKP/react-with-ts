import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import useUsers from "./hooks/useUsers";
import UserService, { User } from "./services/user-service";
import userService from "./services/user-service";
// import { AxiosError, CanceledError } from "axios";
// import ProductList from "./components/ProductList";

function App() {
  const { users, isLoading, error, setError, setUsers } = useUsers();
  const deleteUser = (user: User) => {
    const orginalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    UserService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(orginalUsers);
      console.log(err);
    });
  };

  const addUser = () => {
    const newUser = { id: 0, name: "Fahim KP" };
    // const oldUsers = [...users
    userService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]));

    // setUsers([newUser, ...users]);
  };

  const updateUser = (user: User) => {
    const orginalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "8" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    UserService.update(updatedUser).catch((err) => {
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
