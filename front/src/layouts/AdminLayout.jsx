// src/layouts/AdminLayout.js
import React from "react";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <AdminNavbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
