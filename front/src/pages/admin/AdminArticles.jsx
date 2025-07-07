import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const res = await api.get("/articles"); // Adjust the endpoint if needed
      setArticles(res.data.data || res.data);
    } catch (err) {
        console.log(err);
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

      {loading ? (
        <p>Loading articles...</p>
      ) : articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="overflow-x-auto text-gray-700">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b">Title</th>
                <th className="py-3 px-4 border-b">Author</th>
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Excerpt</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{article.title}</td>
                  <td className="py-3 px-4">{article.author || "N/A"}</td>
                  <td className="py-3 px-4">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate">
                    {article.content?.slice(0, 100) || "No content"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete Article"
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

export default AdminArticlesPage;
