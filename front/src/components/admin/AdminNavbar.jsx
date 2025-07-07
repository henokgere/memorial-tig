// src/components/AdminNavbar.js
import React from "react";
import { Link } from "react-router-dom";
import { UserCircle2, ChevronDown } from "lucide-react";

const AdminNavbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link 
            to="/admin" 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600"
          >
            AdminPortal
          </Link>
          
          {/* Main Navigation */}
          <div className="hidden md:flex space-x-1">
            <NavLink to="/admin/users">Users</NavLink>
            <NavLink to="/admin/heroes">Heroes</NavLink>
            <NavLink to="/admin/articles">Articles</NavLink>
            <NavLink to="/admin/books">Books</NavLink>
            <NavLink to="/admin/contact-us">Contact</NavLink>
            
            {/* Dropdown for Admin Actions */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-all duration-200">
                <span>Admin</span>
                <ChevronDown className="w-4 h-4 mt-0.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 mt-2 w-48 origin-top-right bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <Link 
                  to="/admin/register" 
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                >
                  Add Admin
                </Link>
              </div>
            </div>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 group"
              aria-label="User profile"
            >
              <UserCircle2 className="w-6 h-6 text-gray-300 group-hover:text-yellow-400" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component for consistent styling
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-all duration-200 flex items-center"
    activeClassName="bg-gray-700 text-yellow-400"
  >
    {children}
  </Link>
);

export default AdminNavbar;