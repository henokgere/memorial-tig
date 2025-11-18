import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchFilter from "../../components/admin/SearchFilter";
import DynamicTable from "../../components/DynamicTable";
import { useNavigate } from "react-router-dom";

const AdminBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

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

  const handleAdd = async () => {
    Navigate("/book-form");
  }

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
        <div>
          <button
              onClick={() => handleAdd()}
              className="text-red-600 hover:text-red-800 transition w-full flex justify-end"
              title="Add Book"
            >
              <p className="flex items-center mb-4"> <AddIcon className="mr-2"/> Add New Book</p>
            </button>
          <DynamicTable
            data={filteredBooks}
            columns={Object.keys(filteredBooks[0]).filter(k => k !== "__v")}
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
        </div>
        )}
    </div>
  );
};

export default AdminBooksPage;
