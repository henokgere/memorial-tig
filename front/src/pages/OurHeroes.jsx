import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MemorialCard from '../components/MemorialCard';
import api from '../utils/axios';
import { Search as SearchIcon } from 'lucide-react';

export default function OurHeroes() {
  const [memorialData, setMemorialData] = useState([]);
  const [filteredMemorials, setFilteredMemorials] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get('q')?.toLowerCase() || '';

  useEffect(() => {
    const fetchMemorials = async () => {
      try {
        const response = await api.get('/memorials');
        const arrayData = response.data.data;
        if (!Array.isArray(arrayData)) throw new Error('Invalid data format received');

        setMemorialData(arrayData);
      } catch (error) {
        console.error('Failed to fetch memorial data', error);
      }
    };

    fetchMemorials();
  }, []);

  useEffect(() => {
    const keyword = searchInput || query;
    if (keyword) {
      const results = memorialData.filter((person) =>
        [
          person.name,
          person.fatherName,
          person.grandfatherName,
          person.placeOfBirth,
          person.placeOfDeath,
          person.burialLocation,
        ]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(keyword.toLowerCase()))
      );
      setFilteredMemorials(results);
    } else {
      setFilteredMemorials(memorialData);
    }
  }, [query, searchInput, memorialData]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/our-heroes?q=${encodeURIComponent(searchInput)}`);
    } else {
      navigate(`/our-heroes`);
    }
  };

  return (
    <section className="py-16 px-4 bg-[#4E4E4E] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
          We Remember Them
        </h2>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex justify-center mb-10">
          <div className="flex w-full max-w-md">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name, place, etc."
              className="w-full bg-gray-50 px-4 py-2 rounded-l-md text-sm text-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 bg-[#b88608] text-white rounded-r-md hover:bg-[#2c2f00] flex items-center"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </form>

        {searchInput || query ? (
          <p className="text-gray-200 mb-6 text-center">
            Showing results for: <span className="font-semibold">{searchInput || query}</span>
          </p>
        ) : null}

        {filteredMemorials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemorials.map((person) => (
              <div key={person._id} className="flex flex-col items-center">
                <MemorialCard
                  name={person.name}
                  years={`${new Date(person.birthDate).getFullYear()} - ${new Date(
                    person.deathDate
                  ).getFullYear()}`}
                  imageUrl={person.imageUrl}
                />
                <Link
                  to={`/memorial/${person._id}`}
                  state={{ person }}
                  className="mt-2 text-sm font-semibold text-[#242424] hover:underline"
                >
                  View Detail
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300 mt-10">No matching memorials found.</p>
        )}
      </div>
    </section>
  );
}
