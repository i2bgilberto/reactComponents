import { useEffect, useState } from "react";
import axios, { AxiosError, CanceledError } from "axios";

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
  return (
    <>
      <h1>User List</h1>
      {error && <h2 className="text-danger text-center mb-5">{error}</h2>}
      {loading && <div className="spinner-border"></div>}
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.username}
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FetchUser;
