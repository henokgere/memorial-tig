import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

export default function BookForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    image: null,
    bookUrl: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      }

      await api.post('/books', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      navigate('/books');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-[#383C00] text-2xl font-bold mb-4">Add New Book</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="text-[#383C00] space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" className="w-full p-2 border rounded" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" rows="4" required />
        <input name="bookUrl" value={formData.bookUrl} onChange={handleChange} placeholder="Book URL (Amazon, Patreon...)" className="w-full p-2 border rounded" />
        <input name="image" type="file" onChange={handleChange} accept="image/*" className="w-full" />

        <button type="submit" disabled={isSubmitting} className="bg-[#383C00] text-white px-6 py-2 rounded hover:bg-[#2f3200]">
          {isSubmitting ? 'Submitting...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}
