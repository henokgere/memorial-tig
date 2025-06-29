import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProtectedRoute from '../layouts/ProtectedRoutes';

function ArticleForm() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('excerpt', excerpt);
      formData.append('content', content);
      formData.append('tags', tags);
      if (image) formData.append('image', image);

      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      navigate(`/articles/${data.slug}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">{t('create_article')}</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              {t('title')}
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#383C00] focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="excerpt" className="block text-gray-700 font-medium mb-2">
              {t('excerpt')}
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#383C00] focus:border-transparent"
              rows="3"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
              {t('content')}
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#383C00] focus:border-transparent"
              rows="10"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
              {t('tags')} ({t('comma_separated')})
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#383C00] focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              {t('featured_image')}
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#383C00] focus:border-transparent"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#383C00] text-white rounded-lg hover:bg-[#2c2f00] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? t('publishing') : t('publish_article')}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}

export default ArticleForm;