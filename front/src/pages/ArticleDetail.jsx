import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../utils/axios';
import CommentSection from '../components/CommentSection';

export default function ArticleDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await api.get(`/articles/${slug}`);
        setArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(t('article_not_found'));
      }
    };

    fetchArticle();
  }, [slug, t]);

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!article) {
    return <div className="p-8">{t('loading')}...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">{article.title}</h1>

      <div className="text-gray-500 text-sm mb-4">
        <span>{new Date(article.createdAt).toLocaleDateString()}</span> •{' '}
        <span>{article.author?.name || t('anonymous')}</span>
      </div>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-auto rounded-lg mb-6"
        />
      )}

      {article.video && (
        <video controls className="w-full h-auto rounded-lg mb-6">
          <source src={article.video} type="video/mp4" />
          {t('browser_not_support_video')}
        </video>
      )}

      <div
        className="prose text-gray-600 max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <CommentSection articleId={article._id} comments={article.comments} />
    </div>
  );
}
