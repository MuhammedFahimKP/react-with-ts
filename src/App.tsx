import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import apiClient, { AxiosError, CanceledError } from "./services/api-client";
import { useEffect, useState } from "react";
// import { AxiosError, CanceledError } from "axios";
// import ProductList from "./components/ProductList";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const deleteUser = (user: User) => {
    const orginalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    apiClient.delete(`/users/${user.id}`).catch((err) => {
      setError(err.message);
      setUsers(orginalUsers);
      console.log(err);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    // const getUseres = async () => {
    //   try {
    //     const res = await axios.get<User[]>(
    //       "https://jsonplaceholder.typicode.com/users",
    //       {
    //         signal: controller.signal,
    //       }
    //     );
    //     setUsers(res.data);
    //   } catch (err) {
    //     if (err instanceof CanceledError) return;
    //     setError((err as AxiosError).message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    apiClient
      .get<User[]>("/users", {
        signal: controller.signal,
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const addUser = () => {
    const newUser = { id: 0, name: "Fahim KP" };
    // const oldUsers = [...users]

    apiClient
      .post("/users", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]));

    // setUsers([newUser, ...users]);
  };

  const updateUser = (user: User) => {
    const orginalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "8" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    apiClient.patch("/users/" + user.id, updatedUser).catch((err) => {
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
