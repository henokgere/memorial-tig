import React, { useState, useEffect } from "react";
import api from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate}  from "react-router-dom";

const AdminRegisterUser = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "editor",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Generate 6-digit password
  const generatePassword = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  // Auto-generate password when form loads
  useEffect(() => {
    setFormData((prev) => ({ ...prev, password: generatePassword() }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/users/admin/register", formData);

      toast.success("User registered successfully!", {
        autoClose: 5000,
      });

      setFormData({
        name: "",
        email: "",
        role: "editor",
        password: generatePassword(),
      });
      navigate("/admin");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-4 text-gray-800">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Register Admin User
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow-lg rounded-xl p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="editor">Editor</option>
            <option value="creator">Creator</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            maxLength={16}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-gray-500 focus:border-gray-500"
          />
          <p className="text-sm text-gray-500 mt-1">You can edit the auto-generated 6-digit password</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md transition"
        >
          {loading ? "Registering..." : "Register Admin"}
        </button>
      </form>
    </div>
  );
};

export default AdminRegisterUser;
