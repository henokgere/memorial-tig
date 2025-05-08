export default function MemorialCard({ name, years, imageUrl }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col items-center pt-18 pb-16 px-2">
      {/* Circular image container with centered background */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-inner mb-5">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${imageUrl || '/default-memorial-image.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="text-center w-full">
        <h3 className="text-xl font-medium text-gray-900 mb-1.5">{name}</h3>
        <p className="text-sm text-gray-600 mb-4">{years}</p>
        
        <div className="border-t border-gray-200 w-3/4 mx-auto my-3"></div>
        
        <div className="flex justify-center">
          <svg 
            className="w-5 h-5 text-gray-700"
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