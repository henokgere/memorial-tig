import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, MessageSquare, User } from 'lucide-react';

export default function ArticleCard({ article }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {article.image && (
        <img 
          src={article.image||'/article.jpg'} 
          alt={article.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <User className="w-4 h-4 mr-1" />
          <span>{article.author?.name || t('anonymous')}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          <Link to={`/articles/${article.slug}`} className="hover:text-[#383C00]">
            {article.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/articles/${article.slug}`} 
            className="text-[#383C00] hover:underline font-medium"
          >
            {t('read_more')}
          </Link>
          <div className="flex items-center text-gray-500">
            <MessageSquare className="w-4 h-4 mr-1" />
            <span>{article.commentCount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}