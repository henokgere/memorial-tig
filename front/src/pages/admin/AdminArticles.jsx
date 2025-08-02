import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchFilter from "../../components/admin/SearchFilter";
import DynamicTable from "../../components/DynamicTable";

const AdminArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const res = await api.get("/articles"); // Update endpoint if necessary
      const data = res.data.data || res.data;
      console.log(data)
      setArticles(data);
      setFilteredArticles(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      await api.delete(`/articles/${id}`);
      toast.success("Article deleted successfully");
      setArticles((prev) => prev.filter((article) => article._id !== id));
      setFilteredArticles((prev) => prev.filter((article) => article._id !== id));
    } catch {
      toast.error("Failed to delete article");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-700">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Articles</h1>
      <SearchFilter
        data={articles}
        onFilter={setFilteredArticles}
        placeholder="Search by title, author, or content..."
      />
      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <DynamicTable
          data={filteredArticles}
          columns={["title", "author", "createdAt", "content"]}
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
};

export default AdminArticlesPage;
