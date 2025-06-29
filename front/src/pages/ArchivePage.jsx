import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArticleCard from '../components/ArticleCard';
import api from '../utils/axios';

export default function ArchivePage() {
  const { year, month } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [archiveTitle, setArchiveTitle] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let url = '/articles';
        if (year && month) {
          url = `/articles/archive/${year}/${month}`;
          setArchiveTitle(
            `${new Date(0, month - 1).toLocaleString('default', { month: 'long' })} ${year}`
          );
        } else if (year) {
          url = `/articles/archive/${year}`;
          setArchiveTitle(year);
        }

        const response = await api.get(url);
        
        // Ensure we're working with an array
        const articlesData = Array.isArray(response.data) 
          ? response.data 
          : response.data.articles || [];
        
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching archive articles:', error);
        setError(error.response?.data?.message || t('error_fetching_articles'));
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [year, month, t]);
  if (loading) return <div>{t('loading')}...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {archiveTitle || t('archive')}
      </h1>

      {articles.length === 0 ? (
        <p className="text-gray-500">{t('no_articles_found')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}