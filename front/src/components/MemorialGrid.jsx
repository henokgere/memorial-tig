import { useEffect, useState } from 'react';
import MemorialCard from './MemorialCard';
import api from '../utils/axios';


export default function MemorialGrid() {
  const [ memorialData, setMemorialData ] = useState([])

  useEffect(() => {
    const fetchMemorials = async () => {
      try {
        const response = await api.get('/memorials');
        console.log('RAW response.data:', response.data);
  
        const arrayData = response.data.data; 
  
        if (!Array.isArray(arrayData)) {
          throw new Error('Invalid data format received');
        }
  
        setMemorialData(arrayData.slice(1, 4));
      } catch (error) {
        console.error('Failed to fetch memorial data', error);
      }
    };
  
    fetchMemorials();
  }, []);

  return (
    <section className="my-4 py-16 px-4 bg-[#b88608]">
      <div className="max-w-6xl mx-auto">
        {/* <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          We Remember Them
        </h2> */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {memorialData.map((person) => (
            <MemorialCard 
              key={person.id}
              name={person.name}
              years={`${new Date(person.birthDate).getFullYear()} - ${new Date(person.deathDate).getFullYear()}`}
              imageUrl={person.imageUrl}
            />
          ))}
        </div>
        
        {/* Pagination would go here if needed */}
      </div>
    </section>
  );
}