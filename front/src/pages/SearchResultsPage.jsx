import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../utils/axios';
import ArticleCard from '../components/ArticleCard';
import MemorialCard from '../components/MemorialCard';
import {data} from '../assets/staff.json';
import { LoaderIcon } from 'lucide-react';

export default function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [results, setResults] = useState({
    articles: [],
    books: [],
    memorials: [],
    stuff: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');

    if (!query) {
      navigate('/');
      return;
    }

    const fetchResults = async () => {
      try {
        setResults(prev => ({ ...prev, loading: true, error: null }));

        const [articlesRes, booksRes, memorialsRes] = await Promise.all([
          api.get(`/articles/search?q=${query}`),
          api.get(`/books/search?q=${query}`),
          api.get(`/memorials/search?q=${query}`)
        ]);

        const filteredStuff = data.filter(member =>
          member.name.toLowerCase().includes(query.toLowerCase()) ||
          member.role.toLowerCase().includes(query.toLowerCase()) ||
          member.bio.toLowerCase().includes(query.toLowerCase())
        );        

        setResults({
          articles: articlesRes.data?.data || [],
          books: booksRes.data?.data || [],
          memorials: memorialsRes.data?.data || [],
          stuff: filteredStuff,
          loading: false,
          error: null
        });
      } catch (error) {
        setResults({
          articles: [],
          books: [],
          memorials: [],
          loading: false,
          error: error.response?.data?.message || t('search_error')
        });
      }
    };

    fetchResults();
  }, [location.search, navigate, t]);

  if (results.loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <LoaderIcon className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (results.error) {
    return <div className="text-red-500 p-4">{results.error}</div>;
  }

  const totalResults =
    results.articles.length + results.books.length + results.memorials.length + results.stuff.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl text-[#b88608] font-bold mb-6">
        {t('search_results_for')} "{new URLSearchParams(location.search).get('q')}"
      </h1>

      {totalResults === 0 ? (
        <p className="text-gray-700">{t('no_results_found')}</p>
      ) : (
        <div className="space-y-8">
          {/* Articles */}
          {results.articles.length > 0 && (
            <section>
              <h2 className="text-xl text-gray-500 font-semibold mb-4">
                {t('articles')} ({results.articles.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.articles.map(article => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            </section>
          )}

          {/* Books */}
          {results.books.length > 0 && (
            <section>
              <h2 className="text-xl text-gray-500 font-semibold mb-4">
                {t('books')} ({results.books.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.books.map(book => (
                  <div
                    key={book._id}
                    className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={book.coverImage || '/book.jpg'}
                      alt={book.title}
                      className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    {book.description && (
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {book.description}
                      </p>
                    )}
                    {book.bookUrl && (
                      <a
                        href={book.bookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#383C00] hover:underline font-medium"
                      >
                        {t('read_or_purchase')}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Memorials */}
          {results.memorials.length > 0 && (
            <section>
              <h2 className="text-xl text-gray-500 font-semibold mb-4">
                {t('memorials')} ({results.memorials.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.memorials.map(memorial => (
                  <MemorialCard key={memorial._id} 
                    name={memorial.name}
                    years={`${new Date(memorial.birthDate).getFullYear()} - ${new Date(
                      memorial.deathDate
                    ).getFullYear()}`}
                    imageUrl={memorial.imageUrl} 
                  />
                ))}
              </div>
            </section>
          )}

          {/* Stuff (Local Team) */}
          {results.stuff.length > 0 && (
            <section>
              <h2 className="text-xl text-gray-500 font-semibold mb-4">
                {t('staff')} ({results.stuff.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {results.stuff.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-[#f3f4f6]"
                  >
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center text-yellow-500 text-lg font-bold">
                      {member.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </div>
                    <h3 className="font-bold text-gray-400">{member.name}</h3>
                    <p className="text-sm text-[#383C00] mb-2">{member.role}</p>
                    <p className="text-xs text-gray-600">{member.bio}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
}
