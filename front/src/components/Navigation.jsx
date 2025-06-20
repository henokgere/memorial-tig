import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, UserCircle2 } from 'lucide-react';
import i18n from '../i18n';

const navLinks = [
  { path: "/", name: "home" },
  {
    path: "/our-heroes",
    name: "our_heroes",
    children: [
      { path: "/our-heroes/gallery", name: "Gallery" },
      { path: "/our-heroes/virtual-museum", name: "virtual_museum" }
    ]
  },
  { path: "/tigray-history", name: "tigray_history" },
  { path: "/about-us", name: "about_us" },
  { path: "/contact-us", name: "contact_us" }
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { t } = useTranslation();
  const isRegistered = !!localStorage.getItem("token");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to='/'>
            <div className="flex items-center space-x-4">
              <img src="/vite.png" width={30} alt="" />
              <span className="text-xl font-semibold text-gray-900">{t("Memorial")}</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive
                        ? 'text-[#383C00] border-b-2 border-[#383C00]'
                        : 'text-gray-500 hover:text-gray-700'
                    } pb-1 px-1`
                  }
                >
                  {t(link.name)}
                </NavLink>

                {/* Dropdown menu */}
                {link.children && (
                  <div className="absolute left-0 mt-2 w-44 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    {link.children.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm ${
                            isActive ? 'text-[#383C00]' : 'text-gray-700 hover:bg-gray-100'
                          }`
                        }
                      >
                        {t(sub.name)}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isRegistered && (
              <NavLink
                to="/list"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? 'text-[#383C00] border-b-2 border-[#383C00]'
                      : 'text-gray-500 hover:text-gray-700'
                  } pb-1 px-1`
                }
              >
                {t("list")}
              </NavLink>
            )}

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <Globe className="w-5 h-5 mr-1" />
                {i18n.language}
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                  {["en", "am", "tg", "fr"].map((lng) => (
                    <button
                      key={lng}
                      onClick={() => changeLanguage(lng)}
                      className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 w-full text-left"
                    >
                      {lng === "en" && "English"}
                      {lng === "am" && "አማርኛ"}
                      {lng === "tg" && "ትግርኛ"}
                      {lng === "fr" && "French"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/login">
              <UserCircle2 color="#383C00" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-2 pb-4">
            {navLinks.map((link) => (
              <div key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm font-medium ${
                      isActive
                        ? 'text-[#383C00] border-b-2 border-[#383C00]'
                        : 'text-gray-500 hover:text-gray-700'
                    } pb-1 px-1`
                  }
                >
                  {t(link.name)}
                </NavLink>
                {/* Mobile dropdown children */}
                {link.children && (
                  <div className="ml-4 mt-1">
                    {link.children.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setMenuOpen(false)}
                        className="block text-sm text-gray-600 hover:text-gray-800 py-1"
                      >
                        {t(sub.name)}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isRegistered && (
              <NavLink
                to="/list"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-sm font-medium ${
                    isActive
                      ? 'text-[#383C00] border-b-2 border-[#383C00]'
                      : 'text-gray-500 hover:text-gray-700'
                  } pb-1 px-1`
                }
              >
                {t("list")}
              </NavLink>
            )}

            {/* Language Selector */}
            <div className="mt-4 px-2">
              <span className="text-gray-600 text-sm mb-1 block">🌐 Language:</span>
              <div className="flex flex-col space-y-2">
                {["en", "am", "tg", "fr"].map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className="text-left text-gray-700 text-sm hover:underline"
                  >
                    {lng === "en" && "English"}
                    {lng === "am" && "አማርኛ"}
                    {lng === "tg" && "ትግርኛ"}
                    {lng === "fr" && "French"}
                  </button>
                ))}
              </div>
            </div>

            <Link to="/login" className="pl-2 pt-2">
              <UserCircle2 color="#383C00" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
