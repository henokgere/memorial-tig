import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Search() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="relative">
      {/* Search Button (Mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
          aria-label={t('search')}
        >
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input - Always visible on desktop, conditionally on mobile */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block absolute md:relative right-0 mt-2 md:mt-0 w-72 bg-white rounded-md shadow-lg md:shadow-none z-50`}>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            className="flex-1 px-4 py-2 text-sm text-gray-700 focus:outline-none rounded-l-md"
            autoFocus={isOpen}
          />
          <button
            type="submit"
            className="px-3 bg-[#383C00] text-white rounded-r-md hover:bg-[#2c2f00] transition-colors duration-200"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}