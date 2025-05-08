import { NavLink } from 'react-router-dom';

const navLinks = [
  { 
    path: "/", 
    name: "Home",
  },
  { 
    path: "/our-heroes", 
    name: "Our Heroes",
  },
  { 
    path: "/story", 
    name: "Stories",
  },
  { 
    path: "/tigray-history", 
    name: "Tigray History",
  },
  { 
    path: "/about-us", 
    name: "About Us",
  }
];

export default function Navigation() {
  return (
    <nav className="bg-memorial-primary shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-end">
          <div className="flex space-x-7">
            <div className="flex items-center py-4 px-2">
              <span className="font-semibold text-white text-lg">Tigray Memorial</span>
            </div>
            <div className="md:flex mx-4 items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `py-4 px-2 ${
                      isActive 
                        ? 'text-[#383C00] border-b-2 border-memorial-light' 
                        : 'text-[#BEBEBE] hover:text-memorial-light'
                    } font-semibold`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}