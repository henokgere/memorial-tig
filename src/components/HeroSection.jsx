import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative h-[450px] my-8 flex items-center justify-center bg-memorial-dark text-white overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/1.png')" }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl text-[#202020] font-bold mb-4 animate-fadeIn">
          Honoring the Lives of MIT Students
        </h1>
        <h2 className="text-xl text-[#272727] mb-6 animate-fadeIn delay-100">
          Lost in the Tigray War
        </h2>
        
        <p className="text-[#454545] text-base italic mb-8 max-w-2xl mx-auto animate-fadeIn delay-200">
          A tribute to the bright friends taken too soon—may their legacy inspire future generations.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 animate-fadeIn delay-300">
          <a 
            href="/our-heroes" 
            className="px-6 py-3 bg-red-700 hover:bg-red-500 rounded-lg transition text-white font-semibold"
          >
            View Memorial
          </a>
          <a 
            href="/donate" 
            className="px-6 py-3 bg-[#505050] hover:bg-[#7e7e7e] rounded-lg transition text-white font-semibold"
          >
            Donate Now
          </a>
        </div>
      </div>
    </section>
  );
}