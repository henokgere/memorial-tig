import React from 'react';
import { Link } from 'react-router-dom';

const adminLinks = [
  { name: 'Contact Messages', path: '/admin/contact-us' },
  { name: 'Users', path: '/admin/users' },
  { name: 'heroes', path: '/admin/heroes' },
  { name: 'Articles', path: '/admin/articles' },
  { name: 'Books', path: '/admin/books' },
  { name: 'Create Admins', path: '/admin/register' },
];

const AdminDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#383C00] mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {adminLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="block p-6 bg-white shadow hover:shadow-md border rounded-lg transition"
          >
            <h2 className="text-lg font-semibold text-[#383C00]">{link.name}</h2>
            <p className="text-sm text-gray-600 mt-2">Manage {link.name.toLowerCase()} here</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
