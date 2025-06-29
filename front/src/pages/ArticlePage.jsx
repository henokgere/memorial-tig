import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArticleCard from '../components/ArticleCard';
import CommentSection from '../components/CommentSection';

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const [articleRes, relatedRes] = await Promise.all([
          fetch(`/api/articles/${slug}`),
          fetch(`/api/articles/${slug}/related`)
        ]);

        if (!articleRes.ok) throw new Error('Article not found');
        
        const articleData = await articleRes.json();
        const relatedData = await relatedRes.json();
        
        setArticle(articleData);
        setRelatedArticles(relatedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <div className="container mx-auto px-4 py-8">{t('loading')}...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-500">...!{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{article.author?.name || t('anonymous')}</span>
          </div>
        </header>

        {article.image && (
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-auto mb-8 rounded-lg"
          />
        )}

        <div 
          className="prose max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <footer className="mb-12">
          <div className="flex flex-wrap gap-2">
            {article.tags?.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>

        <CommentSection articleId={article._id} comments={article.comments} />
      </article>

      {relatedArticles.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t('related_articles')}</h2>
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