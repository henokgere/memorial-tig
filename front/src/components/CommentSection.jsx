import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserCircle2 } from 'lucide-react';

export default function CommentSection({ articleId, comments: initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');
  const { t } = useTranslation();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content: newComment })
      });

      if (response.ok) {
        const data = await response.json();
        setComments([data, ...comments]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        {t('comments')} ({comments.length})
      </h3>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={t('write_comment')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#383C00] focus:border-transparent"
            rows="3"
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-[#383C00] text-white rounded-md hover:bg-[#2c2f00] transition-colors"
          >
            {t('post_comment')}
          </button>
        </form>
      ) : (
        <div className="mb-6 text-gray-600">
          <Link to="/login" className="text-[#383C00] hover:underline">
            {t('login_to_comment')}
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500">{t('no_comments')}</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="border-b border-gray-200 pb-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {comment.user?.avatar ? (
                    <img 
                      src={comment.user.avatar} 
                      alt={comment.user.name} 
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <UserCircle2 className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-800">
                      {comment.user?.name || t('anonymous')}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}