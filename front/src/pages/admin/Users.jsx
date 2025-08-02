import React, { useEffect, useState, useContext } from "react";
import api from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchFilter from "../../components/admin/SearchFilter";
import DynamicTable from "../../components/DynamicTable";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users/users");
      console.log("res: ", res.data);
      setUsers(res.data.data || res.data);
      setFilteredUsers(res.data.data || res.data);
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

      <SearchFilter data={users} onFilter={setFilteredUsers} placeholder="Search users..." />

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <DynamicTable
          data={filteredUsers}
          columns={Object.keys(filteredUsers[0] || {}).filter(k => k !== '__v')}
          actions={(article) => (
            <button
              onClick={() => handleDelete(article._id)}
              className="text-red-600 hover:text-red-800 transition"
              title="Delete Article"
            >
              <DeleteIcon />
            </button>
          )}
        />
      )}
    </div>
  );
};

export default AdminUsersPage;
