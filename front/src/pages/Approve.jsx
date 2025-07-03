import { useEffect, useState } from "react";
import api from "../utils/axios";

export default function Approve() {
  const [pending, setPending] = useState({
    memorials: [],
    articles: [],
    books: [],
  });

  const fetchPending = async () => {
    try {
      const [memorialsRes, articlesRes, booksRes] = await Promise.all([
        api.get("/memorials?state=0"),
        api.get("/articles?state=0"),
        api.get("/books?state=0"),
      ]);
      setPending({
        memorials: memorialsRes.data,
        articles: articlesRes.data,
        books: booksRes.data,
      });
    } catch (err) {
      console.error("Error fetching pending items:", err);
    }
  };

  const handleApprove = async (type, id) => {
    try {
      await api.patch(`/${type}/${id}/approve`);
      setPending((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item._id !== id),
      }));
    } catch (err) {
      console.error(`Failed to approve ${type} with id ${id}`, err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const renderList = (items, label, type) => (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{label}</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">No pending {label.toLowerCase()}.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold text-black">
                {item.title || item.name}
              </h3>
              <p className="text-gray-700 mb-2">
                {(item.excerpt || item.shortStory || item.description || "").slice(0, 100)}...
              </p>
              <button
                onClick={() => handleApprove(type, item._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-[#383C00]">Approval Dashboard</h1>

      {renderList(pending.memorials, "Memorials", "memorials")}
      {renderList(pending.articles, "Articles", "articles")}
      {renderList(pending.books, "Books", "books")}
    </div>
  );
}
