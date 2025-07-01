
import { useState, useEffect } from 'react';
import MemorialCard from '../components/MemorialCard';
import api from '../utils/axios';
import { Link } from 'react-router-dom';

export default function OurHeroes() {
  const [memorialData, setMemorialData] = useState([]);

 useEffect(() => {
  const fetchMemorials = async () => {
    try {
      const response = await api.get('/memorials');
      console.log('RAW response.data:', response.data);

      const arrayData = response.data.data; 

      if (!Array.isArray(arrayData)) {
        throw new Error('Invalid data format received');
      }

      setMemorialData(arrayData);
      console.log('Memorial data fetched successfully:', arrayData);
    } catch (error) {
      console.error('Failed to fetch memorial data', error);
    }
  };

  fetchMemorials();
}, []);



  return (
    <section className="py-16 px-4 bg-[#4E4E4E]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          We Remember Them
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {memorialData.map((person) => (
            <div key={person._id} className="flex flex-col items-center">
              <MemorialCard
                name={person.name}
                years={`${new Date(person.birthDate).getFullYear()} - ${new Date(person.deathDate).getFullYear()}`}
                imageUrl={person.imageUrl}
              />
              <Link
                to={`/memorial/${person._id}`}
                state={{ person }}
                className="mt-2 text-sm font-semibold text-gray-400 hover:underline"
              >
                View Detail
              </Link>
            </div>
          ))}
        </div>
        
        {/* Pagination would go here if needed */}
      </div>
    </section>
  );
}