export default function MemorialCard({ name, years }) {
    return (
      <div className="bg-memorial-primary rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-memorial-light">{years}</p>
          
          {/* Decorative divider */}
          <div className="my-4 h-px bg-memorial-light opacity-30 w-3/4 mx-auto"></div>
          
          {/* Candle icon */}
          <div className="mt-2 flex justify-center">
            <svg 
              className="w-6 h-6 text-memorial-light"
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M10 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6H8a1 1 0 010-2h1V3a1 1 0 011-1zm-3 7a3 3 0 016 0v5a1 1 0 01-1 1H8a1 1 0 01-1-1V9z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }