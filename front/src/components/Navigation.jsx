// components/Navigation.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe, UserCircle2 } from "lucide-react";
import i18n from "../i18n";
import Search from "./Search";

const navLinks = [
  { path: "/", name: "home" },
  {
    name: "our_heroes",
    path: "our-heroes",
    dropdown: true,
    children: [
      { path: "/our-heroes", name: "Gallery" },
      { path: "/virtual-museum", name: "virtual_museum" },
    ],
  },
  { name: "Documentation", path: "/books" },
  { path: "/tigray-history", name: "tigray_history" },
  {
    name: "Article",
    path: "article",
    dropdown: true,
    children: [
      { path: "/article", name: "Article" },
      { path: "/archive", name: "Archive" },
      { path: "/article-form", name: "Make article" },
    ],
  },
  { path: "/about-us", name: "about_us" },
  { path: "/contact-us", name: "contact_us" },
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
          <Link to="/">
            <div className="flex items-center space-x-4">
              <img src="/vite.png" width={30} alt="" />
              <span className="text-xl font-semibold text-gray-900">
                {t("Memorial")}
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <button className="text-sm font-medium text-gray-500 hover:text-gray-900 hover:font-semibold rounded-md pb-1 px-3 py-2 transition-colors duration-200">
                    {t(link.name)}
                  </button>
                  <div className="absolute left-0 top-full w-40 bg-white border rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm ${
                            isActive
                              ? "text-blue-800 bg-blue-100 underline"
                              : "text-gray-700 hover:font-semibold"
                          } transition-colors duration-200`
                        }
                      >
                        {t(child.name)}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive
                        ? "text-blue-800 bg-blue-100 rounded-md"
                        : "text-gray-500 hover:text-gray-900 hover:font-semibold rounded-md"
                    } pb-1 px-3 py-2 transition-colors duration-200`
                  }
                >
                  {t(link.name)}
                </NavLink>
              )
            )}

            {isRegistered && (
              <NavLink
                to="/list"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-black bg-yellow-200 underline rounded-md"
                      : "text-gray-500 hover:text-gray-900 hover:font-semibold rounded-md"
                  } pb-1 px-3 py-2 transition-colors duration-200`
                }
              >
                {t("list")}
              </NavLink>
            )}

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center text-gray-600 hover:text-gray-900 hover:font-semibold rounded-md px-3 py-2 transition-colors duration-200"
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
                      className="block px-4 py-2 text-gray-700 text-sm hover:text-gray-900 hover:font-semibold w-full text-left transition-colors duration-200"
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

            <Link
              to="/profile"
              className="hover:text-gray-900 hover:font-semibold rounded-md p-2 transition-colors duration-200"
            >
              <UserCircle2 color="#383C00" />
            </Link>
            <Search />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center text-gray-600 hover:text-gray-900 hover:bg-yellow-200 rounded-md p-2 transition-colors duration-200"
            >
              <Search />
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-2 pb-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="px-2">
                  <span className="text-sm font-medium text-gray-500">
                    {t(link.name)}
                  </span>
                  <div className="ml-4 mt-1 flex flex-col space-y-1">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `text-sm px-3 py-2 rounded-md ${
                            isActive
                              ? "text-black hover:text-gray-900 hover:font-semibold underline"
                              : "text-gray-700 hover:text-gray-900 hover:font-semibold"
                          } transition-colors duration-200`
                        }
                      >
                        {t(child.name)}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm font-medium px-3 py-2 rounded-md ${
                      isActive
                        ? "text-black hover:text-gray-900 hover:font-semibold"
                        : "text-gray-500 hover:text-gray-900 hover:font-semibold"
                    } transition-colors duration-200`
                  }
                >
                  {t(link.name)}
                </NavLink>
              )
            )}

            {isRegistered && (
              <NavLink
                to="/list"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-sm font-medium px-3 py-2 rounded-md ${
                    isActive
                      ? "text-black bg-blue-100"
                      : "text-gray-500 hover:text-gray-900 hover:font-semibold"
                  } transition-colors duration-200`
                }
              >
                {t("list")}
              </NavLink>
            )}

            {/* Language Selector */}
            <div className="mt-4 px-2">
              <span className="text-gray-600 text-sm mb-1 block">
                🌐 Language:
              </span>
              <div className="flex flex-col space-y-2">
                {["en", "am", "tg", "fr"].map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className="text-left text-gray-700 text-sm px-3 py-2 rounded-md hover:bg-yellow-200 transition-colors duration-200"
                  >
                    {lng === "en" && "English"}
                    {lng === "am" && "አማርኛ"}
                    {lng === "tg" && "ትግርኛ"}
                    {lng === "fr" && "French"}
                  </button>
                ))}
              </div>
            </div>

            <Link
              to="/profile"
              className="px-3 py-2 hover:text-gray-900 hover:font-semibold rounded-md transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              <UserCircle2 color="#383C00" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
