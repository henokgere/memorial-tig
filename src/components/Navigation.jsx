import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: "/", name: "Home" },
  { path: "/our-heroes", name: "Our heroes" },
  { path: "/tigray-history", name: "Tigray history" },
  { path: "/about-us", name: "About us" },
  { path: "/contact-us", name: "Contact us" }
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-semibold text-gray-900">
              Memorial
            </span>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Nav links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? 'text-[#383C00] border-b-2 border-[#383C00]'
                      : 'text-gray-500 hover:text-gray-700'
                  } pb-1 px-1`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-2 pb-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)} // close menu on link click
                className={({ isActive }) =>
                  `block text-sm font-medium ${
                    isActive
                      ? 'text-[#383C00] border-b-2 border-[#383C00]'
                      : 'text-gray-500 hover:text-gray-700'
                  } pb-1 px-1`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
