
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArticleCard from '../components/ArticleCard';
import CommentSection from '../components/CommentSection';
import api from '../utils/axios';

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!slug) {
          throw new Error('Missing article identifier');
        }

        // Using Axios to make parallel requests
        const [articleResponse, relatedResponse] = await Promise.all([
          api.get(`/articles/${slug}`),
          api.get(`/articles/${slug}/related`)
        ]);
        
        setArticle(articleResponse.data);
        setRelatedArticles(relatedResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || t('error_fetching_article'));
        // Redirect to 404 page if article not found
        if (err.response?.status === 404) {
          navigate('/404', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [slug, t, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1>{error} </h1>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#383C00] text-white rounded hover:bg-[#2c2f00]"
        >
          {t('try_again')}
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1>{t('article_not_found')} </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>
              {new Date(article.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="mx-2">•</span>
            <span>{article.author?.name || t('anonymous')}</span>
          </div>
        </header>

        {article.image && (
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-auto mb-8 rounded-lg object-cover max-h-96"
            loading="lazy"
          />
        )}

        {article.video && (
          <div className="mb-8 aspect-video w-full">
            <video 
              controls 
              className="w-full h-auto rounded-lg"
              poster={article.image}
            >
              <source src={article.video} type="video/mp4" />
              {t('browser_not_support_video')}
            </video>
          </div>
        )}

        <div 
          className="prose max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.tags?.length > 0 && (
          <footer className="mb-12">
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </footer>
        )}

        <CommentSection articleId={article._id} comments={article.comments} />
      </article>

      {relatedArticles.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {t('related_articles')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map(article => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}