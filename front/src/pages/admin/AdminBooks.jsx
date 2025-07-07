import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchFilter from "../../components/admin/SearchFilter";

const AdminBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      const data = res.data.data || res.data;
      setBooks(data);
      setFilteredBooks(data);
    } catch {
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this book?");
    if (!confirm) return;

    try {
      await api.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((book) => book._id !== id));
      setFilteredBooks((prev) => prev.filter((book) => book._id !== id));
      toast.success("Book deleted successfully");
    } catch {
      toast.error("Failed to delete book");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-700">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Books</h1>

      {/* ✅ Search Filter */}
      <SearchFilter
        data={books}
        onFilter={setFilteredBooks}
        placeholder="Search by title, author, description..."
      />

      {loading ? (
        <p>Loading books...</p>
      ) : filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b">Title</th>
                <th className="py-3 px-4 border-b">Author</th>
                <th className="py-3 px-4 border-b">Published</th>
                <th className="py-3 px-4 border-b">Description</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{book.title}</td>
                  <td className="py-3 px-4">{book.author || "N/A"}</td>
                  <td className="py-3 px-4">
                    {book.publishedDate
                      ? new Date(book.publishedDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate">
                    {book.description?.slice(0, 100) || "No description"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete Book"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBooksPage;
