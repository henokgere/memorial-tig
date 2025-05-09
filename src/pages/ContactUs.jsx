export default function ContactUs() {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reach out to share stories, ask questions, or learn how to support our memorial efforts.
          </p>
          <div className="w-24 h-1 bg-[#383C00] mx-auto mt-4"></div>
        </div>
  
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-[#383C00]">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#383C00] focus:border-[#383C00]"
                  placeholder="Full Name"
                />
              </div>
  
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#383C00] focus:border-[#383C00]"
                  placeholder="your@email.com"
                />
              </div>
  
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#383C00] focus:border-[#383C00]"
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#383C00] focus:border-[#383C00]"
                  placeholder="Type your message here..."
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
  
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-[#383C00]">Other Ways to Connect</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#383C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Email</h3>
                    <p className="text-sm text-gray-500">contact@mit-tigray-memorial.org</p>
                  </div>
                </div>
  
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#383C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                    <p className="text-sm text-gray-500">+1 (617) 555-0192</p>
                  </div>
                </div>
  
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#383C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Address</h3>
                    <p className="text-sm text-gray-500">
                      MIT Tigray Memorial Foundation<br />
                      77 Massachusetts Ave<br />
                      Cambridge, MA 02139
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Social Media Links */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-[#383C00]">Follow Our Work</h2>
              <div className="flex space-x-4">
                {[
                  { name: 'Twitter', icon: '🐦', handle: '@mit_leganu' },
                  { name: 'Instagram', icon: '📷', handle: '@mit_leganu' },
                  { name: 'Telegram', icon: '📨', handle: 't.me/mit_leganu' }
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="flex items-center space-x-2 text-sm hover:text-[#383C00] transition"
                  >
                    <span className="text-lg">{social.icon}</span>
                    <span>{social.handle}</span>
                  </a>
                ))}
              </div>
            </div>
  
            {/* Office Hours */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-[#383C00]">Office Hours</h2>
              <div className="space-y-2 text-sm">
                <p className="font-medium">Monday-Friday: 9am - 5pm EST</p>
                <p className="text-gray-600">We typically respond to emails within 24-48 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }