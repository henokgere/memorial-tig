import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchFilter from "../../components/admin/SearchFilter";
import DynamicTable from "../../components/DynamicTable";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const AdminHeroesPage = () => {
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  const handleAdd = async () => {
    Navigate("/form");
  }

  const fetchHeroes = async () => {
    try {
      const res = await api.get("/memorials");
      const data = res.data.data || res.data;
      setHeroes(data);
      setFilteredHeroes(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch heroes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hero?")) return;

    try {
      await api.delete(`/heroes/${id}`);
      toast.success("Hero deleted successfully");
      setHeroes((prev) => prev.filter((hero) => hero._id !== id));
      setFilteredHeroes((prev) => prev.filter((hero) => hero._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete hero");
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Memorial Heroes</h1>

      {/* ✅ Search Filter */}
      <SearchFilter
        data={heroes}
        onFilter={setFilteredHeroes}
        placeholder="Search heroes by name, bio, or date..."
      />

      {loading ? (
        <p>Loading heroes...</p>
      ) : filteredHeroes.length === 0 ? (
        <p>No heroes found.</p>
      ) : (
        <div>
          <button
              onClick={() => handleAdd()}
              className="text-red-600 hover:text-red-800 transition w-full flex justify-end"
              title="Add Book"
            >
              <p className="flex items-center mb-4"> <AddIcon className="mr-2"/> Add Memorial</p>
            </button>
        <DynamicTable
          data={filteredHeroes}
          columns={Object.keys(filteredHeroes[0] || {}).filter(k => k !== '__v')}
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

export default AdminHeroesPage;
