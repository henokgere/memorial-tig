import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: "Twitter",
      icon: <FaTwitter className="text-blue-500" />,
      handle: "@TMMA",
      url: "#",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-blue-500" />,
      handle: "@TMMA",
      url: "#",
    },
    {
      name: "Telegram",
      icon: <FaTelegram className="text-blue-500" />,
      handle: "t.me/TMMA",
      url: "#",
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="text-blue-500" />,
      handle: "youtube.com/TMMA",
      url: "https://www.youtube.com/@TMMA-1",
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-500" />,
      handle: "facebook.com/TMMA",
      url: "https://web.facebook.com/profile.php?id=61577920920979",
    },
  ];

  return (
    <footer className="bg-gray-800 text-gray-200 py-12 px-4 border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 mb-10">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("Contact Us")}</h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                tesfayonemail@gmail.com
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +251914794475
              </li>
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Tigray Cultural Office, Mekelle, Ethiopia
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("Follow Us")}</h3>
            <ul className="flex flex-col space-y-2 text-sm">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-600 transition"
                  >
                    <span className="mr-2 text-lg">{link.icon}</span>
                    {link.handle}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500">
              {t("Get updates at")}: notime.tigrayjeganu.org
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-xs text-gray-400 border-t pt-6">
          © {new Date().getFullYear()} Tigray Jeganu Memorial. {t("All rights reserved.")}.
        </div>
      </div>
    </footer>
  );
}
