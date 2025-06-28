// src/pages/Profile.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiEdit, FiLogOut } from 'react-icons/fi';

export default function Profile() {
  const { currentUser, logout } = useContext(AuthContext);
    console.log(currentUser)
  if (!currentUser) {
    return null; // This will be handled by ProtectedRoute
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-[#383C00] p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#383C00] text-2xl font-bold">
              {currentUser.name?.charAt(0) || currentUser.email?.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{currentUser.name || 'User'}</h1>
              <p className="text-[#c0c2a0]">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Personal Information</h2>
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-400">{currentUser.name || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-400">{currentUser.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Role</p>
              <p className="font-medium text-gray-400 capitalize">{currentUser.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Account Actions</h2>
            <Link
              to="/profile/edit"
              className="flex items-center space-x-2 text-[#383C00] hover:text-[#2f3200]"
            >
              <FiEdit /> <span>Edit Profile</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800"
            >
              <FiLogOut /> <span>Sign Out</span>
            </button>
          </div>

          {/* Admin Section - Only visible to admins */}
          {currentUser.role === 'admin' && (
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Admin Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/admin/users"
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  <h3 className="font-medium">Manage Users</h3>
                  <p className="text-sm text-gray-600">View and edit user accounts</p>
                </Link>
                <Link
                  to="/admin/memorials"
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  <h3 className="font-medium">Manage Memorials</h3>
                  <p className="text-sm text-gray-600">Review all memorial entries</p>
                </Link>
                <Link
                  to="/admin/analytics"
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  <h3 className="font-medium">View Analytics</h3>
                  <p className="text-sm text-gray-600">Site usage statistics</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}