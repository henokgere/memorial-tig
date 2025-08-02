import { useEffect, useState } from 'react';
import api from '../../utils/axios';
import DynamicTable from '../../components/DynamicTable';

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get('/contactus');
        setMessages(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 text-gray-700">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
      {messages.length === 0 ? (
        <p>No messages submitted yet.</p>
      ) : (
        <DynamicTable
          data={messages}
          columns={Object.keys(messages[0] || {}).filter(k => k !== '__v')}
          actions={(article) => (
            <button
              onClick={() => handleDelete(article._id)}
              className="text-red-600 hover:text-red-800 transition"
              title="Delete Article"
            >
              <DeleteIcon />
            </button>
          )}
        />
      )}
    </div>
  );
}
