import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#434343] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">{t("contact_us")}</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
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
                tigray_leganu@locationok.com
              </p>
              <p className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
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
                +1 (617) 555-0192
              </p>
              <p className="flex items-start">
                <svg
                  className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Tigray Cultural Office, Mekelle, Ethiopia
              </p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">{t("follow us")}</h3>
            <div className="flex flex-col space-y-2 text-sm">
              {[
                { name: "Twitter", icon: "🐦", handle: "@tigray_jeganu" },
                { name: "Instagram", icon: "📷", handle: "@tigray_jeganu" },
                { name: "Telegram", icon: "📨", handle: "t.me/tigray_jeganu" },
                {
                  name: "YouTube",
                  icon: "📺",
                  handle: "youtube.com/tigray_jeganu",
                  url: "https://www.youtube.com/@TMMA-1",
                },
                {
                  name: "Facebook",
                  icon: "📱",
                  handle: "facebook.com/tigray_jeganu",
                  url: "https://web.facebook.com/profile.php?id=61577920920979",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:text-gray-300 transition flex items-center"
                >
                  <span className="mr-1">{social.icon}</span>
                  {social.handle}
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-300">
              Get updates at: notime.tigrayleganu.org
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Tigray Leganu Memorial. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
