import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ArticleCard from "../components/ArticleCard";
import api from "../utils/axios";

export default function ArchivePage() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [archiveTitle, setArchiveTitle] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [availableYears, setAvailableYears] = useState([]);

  const months = [
    { value: 1, name: t("january") },
    { value: 2, name: t("february") },
    { value: 3, name: t("march") },
    { value: 4, name: t("april") },
    { value: 5, name: t("may") },
    { value: 6, name: t("june") },
    { value: 7, name: t("july") },
    { value: 8, name: t("august") },
    { value: 9, name: t("september") },
    { value: 10, name: t("october") },
    { value: 11, name: t("november") },
    { value: 12, name: t("december") },
  ];

  useEffect(() => {
    // fetch available years for dropdown
    const fetchYears = async () => {
      try {
        const res = await api.get("/articles/archive");
        const archiveData = res.data.data || [];
        const years = archiveData
          .map((item) => item.year)
          .sort((a, b) => b - a);
        setAvailableYears(years);
      } catch (err) {
        console.error("Failed to fetch years:", err);
      }
    };
    fetchYears();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = "/articles";

      if (selectedYear && selectedMonth) {
        url = `/articles/archive/${selectedYear}/${selectedMonth}`;
        const monthName = new Date(0, selectedMonth - 1).toLocaleString(
          "default",
          { month: "long" }
        );
        setArchiveTitle(`${monthName} ${selectedYear}`);
      } else if (selectedYear) {
        url = `/articles/archive/${selectedYear}`;
        setArchiveTitle(`${selectedYear}`);
      } else {
        setArchiveTitle("");
      }

      const response = await api.get(url);

      // Handle different response structures
      let articlesData = [];
      if (response.data && response.data.data) {
        // Archive endpoint returns { success: true, count: X, data: [...] }
        articlesData = response.data.data;
      } else if (Array.isArray(response.data)) {
        // Direct array response
        articlesData = response.data;
      } else if (response.data && response.data.articles) {
        // Alternative structure
        articlesData = response.data.articles;
      }

      setArticles(articlesData);
    } catch (err) {
      console.error("Error fetching archive articles:", err);
      setError(err.response?.data?.message || t("error_fetching_articles"));
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{t("archive")}</h1>

      {/* Filter Controls */}
      <form onSubmit={handleFilter} className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border text-gray-500 border-gray-300 rounded px-3 py-2"
        >
          <option value="">{t("select_year")}</option>
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border text-gray-500 border-gray-300 rounded px-3 py-2"
        >
          <option value="">{t("select_month")}</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-[#383C00] text-white px-4 py-2 rounded hover:bg-[#2c2f00]"
        >
          {t("filter")}
        </button>
      </form>

      {/* Title */}
      {archiveTitle && (
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {archiveTitle}
        </h2>
      )}

      {/* Loading/Error */}
      {loading && <p>{t("loading")}...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Articles */}
      {articles.length === 0 && !loading ? (
        <p className="text-gray-500">{t("no_articles_found")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
