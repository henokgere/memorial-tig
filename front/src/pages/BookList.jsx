import { useState, useEffect } from 'react';
import api from '../utils/axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const { t } = useTranslation();
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        const arrayData = response.data.data;
        console.log(arrayData)
        if (!Array.isArray(arrayData)) throw new Error('Invalid data format');

        setBooks(arrayData);
      } catch (error) {
        console.error('Failed to fetch books:', error.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-10 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-[#383C00] font-bold text-center mb-6">{t("Available Books")}</h2>
        <Link to="/book-form" className="bg-[#383C00] text-white px-4 py-2 rounded">{t("Add Book")}</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-4 rounded shadow">
            <img src={book.image||'/book.jpg'} alt={book.title} className="w-full h-48 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="text-sm">{book.description}</p>
            {book.bookUrl && (
              <a href={book.bookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 inline-block">
                Read or Purchase
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
