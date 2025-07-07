import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchFilter from "../../components/admin/SearchFilter";

const AdminHeroesPage = () => {
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <div className="overflow-x-auto text-gray-700">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">DOB</th>
                <th className="py-3 px-4 border-b">DOD</th>
                <th className="py-3 px-4 border-b">Biography</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHeroes.map((hero) => (
                <tr key={hero._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{hero.name}</td>
                  <td className="py-3 px-4">{hero.dob}</td>
                  <td className="py-3 px-4">{hero.dod}</td>
                  <td className="py-3 px-4 max-w-xs truncate">{hero.bio}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(hero._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete Hero"
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

export default AdminHeroesPage;
