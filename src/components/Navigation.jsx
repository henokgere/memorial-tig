import { NavLink } from 'react-router-dom';

const navLinks = [
  { 
    path: "/", 
    name: "Home",
  },
  { 
    path: "/our-heroes", 
    name: "Our heroes",
  },
  { 
    path: "/tigray-history", 
    name: "Tigray history",
  },
  { 
    path: "/about-us", 
    name: "About us",
  },
  { 
    path: "/contact-us", 
    name: "Contact us",
  }
];

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title - left aligned */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-semibold text-gray-900">
              Memorial
            </span>
          </div>
          
          {/* Navigation links - right aligned */}
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
      </div>
    </nav>
  );
}