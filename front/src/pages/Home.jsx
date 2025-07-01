import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArticleCard from '../components/ArticleCard';
import HeroSection from '../components/HeroSection';
import HomeVideoPreview from '../components/HomeVideoPreview';
import MemorialGrid from '../components/MemorialGrid';
import MemorialTribute from '../components/MemorialTribute';
import api from '../utils/axios';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/articles');
        setArticles(data.data);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="bg-memorial-dark">
      <HeroSection />
      <MemorialTribute />
      {!loading && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-[#383C00] mb-8 text-center">
            {t('latest_articles')}
          </h2>
          
          {loading ? 
            <p className="text-gray-400 text-center">
              {t('Loading articles...')}
            </p>:
            articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map(article => (
                  <ArticleCard 
                    key={article._id} 
                    article={article} 
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">
                {t('no_articles_found')}
              </p>
            )
          }
        </section>
      )}
      <HomeVideoPreview />
      <MemorialGrid />
    </div>
  );
}