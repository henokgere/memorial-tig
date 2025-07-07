import React, { useEffect, useState, useContext } from "react";
import api from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users/users");
      console.log("res: ", res.data);
      setUsers(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      toast.success("User deleted successfully");
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        All Registered Users
      </h1>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto text-gray-800">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Role</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4">
                    {currentUser?._id !== user._id ? (
                      <button
                        onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800 transition duration-200"
                      >
                        <DeleteIcon />
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Current User
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
