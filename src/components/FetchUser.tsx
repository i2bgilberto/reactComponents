import { useEffect, useState } from "react";
import axios, { AxiosError, CanceledError } from "axios";
import { set } from "react-hook-form";

interface User {
  id: number;
  username: string;
}

const FetchUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    // Fetch users
    const fetchData = async () => {
      axios
        .get<User[]>("https://jsonplaceholder.typicode.com/users", {
          signal: controller.signal,
        })
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError((err as AxiosError).message);
          setLoading(false);
        });

      return () => controller.abort();
    };
    fetchData();
  }, []);
  // Delete a user
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setUsers(originalUsers);
      });
  };
  // Add a new user
  const addUser = () => {
    const originalUsers = [...users];
    const newUser = {
      id: 0,
      username: "Ramon",
    };
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(({ data: savedUser }) => {
        setUsers([savedUser, ...users]);
      })
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });

    setUsers([...users, newUser]);
  };

  //Update User
  const UpdateUser = (user: User) => {
    const originalUsers = [...users];
    const updateUser = { ...user, username: user.username + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updateUser : u)));

    axios
      .patch(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
        updateUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };
  return (
    <>
      <h1>User List</h1>
      {error && <h2 className="text-danger text-center mb-5">{error}</h2>}
      {loading && <div className="spinner-border"></div>}

      <button className="btn btn-primary mb-4" onClick={addUser}>
        Add user
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.username}
            <div className="mb-1">
              <button
                className="btn btn-outline-secondary mx-3"
                onClick={() => UpdateUser(user)}
              >
                Update User
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
};

export default FetchUser;
