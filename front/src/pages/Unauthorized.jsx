// src/pages/Unauthorized.jsx
import { Link } from 'react-router-dom';
import { FaLock, FaHome } from 'react-icons/fa';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <FaLock className="text-red-500 text-4xl" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to view this page. Please contact the administrator if you believe this is an error.
        </p>
        
        <div className="space-y-3">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#383C00] text-white rounded hover:bg-[#2f3200] transition"
          >
            <FaHome /> Return Home
          </Link>
          
          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-[#383C00] text-[#383C00] rounded hover:bg-gray-100 transition"
          >
            Sign in with different account
          </Link>
        </div>
      </div>
    </div>
  );
}