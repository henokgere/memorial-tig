import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#434343] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex flex-col space-y-2">
              <span className="text-sm">@mit_leganu</span>
              <span className="text-sm">@mit_leganu</span>
              <span className="text-sm">@mit_leganu</span>
              <span className="text-sm">Get/notime.milleganul8</span>
              <span className="text-sm">mit_leganu@locationok.com</span>
            </div>
          </div>
          
          <div>
            <a 
              href="/donate" 
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md transition text-white font-medium text-sm"
            >
              Donate now
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-6 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} MIT Leganu Memorial. All rights reserved.
        </div>
      </div>
    </footer>
  );
}