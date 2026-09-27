import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser
} from "../../api/admin";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteUser(id);

      setUsers(
        users.filter((user) => user._id !== id)
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Users
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage registered users.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Loading users...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold">
                    Name
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Email
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Role
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b last:border-0"
                  >
                    <td className="px-6 py-4 text-sm font-medium">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.phone || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleDelete(user._id)
                        }
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;