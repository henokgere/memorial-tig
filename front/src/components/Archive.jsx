import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';

export default function Archive() {
  const [archiveData, setArchiveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedYear, setExpandedYear] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const response = await fetch('/api/articles/archive');
        const data = await response.json();
        setArchiveData(data);
      } catch (error) {
        console.error('Error fetching archive:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArchive();
  }, []);

  const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  if (loading) return <div>{t('loading')}...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('archive')}</h3>
      <div className="space-y-2">
        {archiveData.map(({ year, months }) => (
          <div key={year} className="border-b border-gray-200 pb-2 last:border-0">
            <button
              onClick={() => toggleYear(year)}
              className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-700 hover:text-[#383C00]"
            >
              <span>{year}</span>
              {expandedYear === year ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            {expandedYear === year && (
              <div className="ml-4 mt-1 space-y-1">
                {months.map(({ month, count }) => (
                  <Link
                    key={month}
                    to={`/archive/${year}/${month}`}
                    className="flex items-center justify-between py-1 px-2 hover:bg-gray-50 rounded"
                  >
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
                    </span>
                    <span className="text-gray-500 text-sm">{count}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}