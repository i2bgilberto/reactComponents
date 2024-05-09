import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "../services/api-service";

const FetchUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    // Fetch users
    const fetchData = async () => {
      const { request, cancel } = userService.getAllUsers();

      request
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
      return () => cancel();
    };
    fetchData();
  }, []);
  // Delete a user
  const deleteUser = (id: number) => {
    const userOriginal = [...users];
    setUsers(users.filter((user) => user.id !== id));
    userService.deleteUser(id).catch((err) => {
      setUsers(userOriginal);
      setError(err.message);
    });
  };

  //Update user
  const updateUser = (user: User) => {
    const userOriginal = [...users];
    const updatedUsers = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUsers : u)));
    userService.updateUser(updatedUsers).catch((err) => {
      setUsers(userOriginal);
      setError(err.message);
    });
  };

  //Add user
  const addUser = () => {
    const userOriginal = [...users];
    const newUser = { id: users.length + 1, name: "Ramon Alcala" };
    setUsers([...users, newUser]);
    userService.addUser(newUser).catch((err) => {
      setUsers(userOriginal);
      setError(err.message);
    });
  };

  return (
    <>
      <h1>User List</h1>
      {error && <h2 className="text-danger text-center mb-5">{error}</h2>}
      {loading && <div className="spinner-border"></div>}

      <button className="btn btn-primary mb-4" onClick={() => addUser()}>
        Add user
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div className="mb-1">
              <button
                className="btn btn-outline-secondary mx-3"
                onClick={() => updateUser(user)}
              >
                Update User
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user.id)}
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
