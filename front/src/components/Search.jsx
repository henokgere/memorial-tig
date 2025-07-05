import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Search() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('memorials'); // default search type
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      let route = '';
      switch (type) {
        case 'articles':
          route = '/article';
          break;
        case 'docs':
          route = '/books';
          break;
        default:
          route = '/our-heroes';
      }
      navigate(`${route}?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="relative">
      {/* Toggle Search */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
        aria-label={t('search')}
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      {/* Search Input + Filter */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-120 bg-white rounded-md shadow-lg z-50">
          <form onSubmit={handleSearch} className="flex">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="text-sm px-2 py-2 border-r border-gray-300 bg-gray-400 rounded-l-md focus:outline-none"
            >
              <option value="memorials">{t('Memorials')}</option>
              <option value="docs">{t('Docs')}</option>
              <option value="articles">{t('Articles')}</option>
            </select>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="flex-1 px-4 py-2 text-sm text-gray-700 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 bg-[#383C00] text-white rounded-r-md hover:bg-[#2c2f00] transition-colors duration-200"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
