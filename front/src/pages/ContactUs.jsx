import { useTranslation } from "react-i18next";
import api from "../utils/axios";
import { useState } from "react";

export default function ContactUs() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/contactus", formData); // ✅ send only the data

    if (res.status === 201) {
      setStatus({ type: "success", message: res.data.message });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus({
        type: "error",
        message: res.data.error || "Something went wrong.",
      });
    }
  } catch (error) {
      setStatus({
        type: "error",
        message: "Server error. Please try again later.",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-gray-700 text-3xl md:text-4xl font-bold mb-4">
          {t("Connect & Support")}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t(
            "Reach out to share stories, ask questions, or support our memorial efforts."
          )}
        </p>
        <div className="w-24 h-1 bg-[#383C00] mx-auto mt-4"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Fundraising Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#383C00]">
              {t("Support Our Cause")}
            </h2>
            <div className="space-y-4">
              <a
                href="https://gofundme.com/tigray-memorial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
              >
                <div className="bg-white p-2 rounded-md mr-4">
                  <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M18 12.5a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5Zm-3.5-1.5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Zm-5 0a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Zm-3.5 1.5a1.5 1.5 0 1 0-1.5-1.5 1.5 1.5 0 0 0 1.5 1.5ZM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">"{t("GoFundMe Campaign")}</h3>
                  <p className="text-sm text-gray-600">
                    {t("Help us expand the memorial and support families")}
                  </p>
                </div>
              </a>

              <a
                href="https://paypal.com/donate?hosted_button_id=XYZ123"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
              >
                <div className="bg-white p-2 rounded-md mr-4">
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M10 13l2 5 2-5h4l-4-8-4 8h4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">{t("PayPal Donations")}</h3>
                  <p className="text-sm text-gray-600">
                    {t("Direct financial support")}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-[#383C00]">
              Send Us a Message
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {status && (
                <div
                  className={`p-2 rounded text-sm ${
                    status.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="story">Share a Memorial Story</option>
                  <option value="volunteer">Volunteer Inquiry</option>
                  <option value="donation">Donation Question</option>
                  <option value="media">Media/Press Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-[#383C00] text-white rounded-md hover:bg-[#2a2d00] transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#383C00]">
              Other Ways to Connect
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-[#383C00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Email</h3>
                  <p className="text-sm text-gray-500">
                    contact@tigray-memorial.org
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-[#383C00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                  <p className="text-sm text-gray-500">+1 (617) 555-0192</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-[#383C00]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Address</h3>
                  <p className="text-sm text-gray-500">
                    Tigray Memorial Foundation
                    <br />
                    77 Massachusetts Ave
                    <br />
                    Cambridge, MA 02139
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#383C00]">
              Follow Our Work
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "Twitter/X",
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  ),
                  handle: "@tigray_leganu",
                  url: "https://twitter.com/tigray_jeganu",
                },
                {
                  name: "Instagram",
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  ),
                  handle: "@tigray_leganu",
                  url: "https://instagram.com/tigray_jeganu",
                },
                {
                  name: "Telegram",
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22.02-.31-.05-.1-.19-.13-.39-.08-1.39.53-3.98 1.88-5.26 2.25-.49.15-.94.23-1.36.22-.45-.01-1.32-.25-1.97-.46-.79-.26-1.42-.4-1.36-.84.03-.22.32-.45.89-.68 3.47-1.49 5.78-2.51 8.56-3.71 1.56-.67 3.07-.71 4.19-.73.38 0 1.22.06 1.5.28.2.16.2.2.5.2.58-.02.88-.88 1.91-1.74 2.86-2.62.27-.25.52-.37.56-.36.12.03.23.11.15.35-.09.26-.5.8-.98 1.3-.85.9-1.29 1.36-2.1 2.17-.15.15-.31.3-.45.45-.39.4-.68.69.02 1.16.33.22.6.45.9.66.77.53 1.37 1.04 2.2 1.02.37 0 1.17-.24 1.28-.47.13-.23.13-.52.06-.81z" />
                    </svg>
                  ),
                  handle: "t.me/tigray_leganu",
                  url: "https://t.me/tigray_jeganu",
                },
                {
                  name: "YouTube",
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.12C19.454 3.5 12 3.5 12 3.5s-7.454 0-9.386.566a2.994 2.994 0 0 0-2.112 2.12C0 8.13 0 12 0 12s0 3.87.502 5.814a2.994 2.994 0 0 0 2.112 2.12C4.546 20.5 12 20.5 12 20.5s7.454 0 9.386-.566a2.994 2.994 0 0 0 2.112-2.12C24 15.87 24 12 24 12s0-3.87-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ),
                  handle: "youtube.com/tigray_jeganu",
                  url: "https://www.youtube.com/@TMMA-1",
                },
                {
                  name: "Facebook",
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  ),
                  handle: "fb.com/tigray_jeganu",
                  url: "https://web.facebook.com/profile.php?id=61577920920979",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="mr-3 text-[#383C00]">{social.icon}</span>
                  <div>
                    <p className="font-medium">{social.name}</p>
                    <p className="text-sm text-gray-600">{social.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Office Hours */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#383C00]">
              Office Hours
            </h2>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Monday-Friday: 9am - 5pm EST</p>
              <p className="text-gray-600">
                We typically respond to emails within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
