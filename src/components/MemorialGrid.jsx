import MemorialCard from './MemorialCard';

const memorialData = [
  { id: 1, name: "Full Name", years: "1990 - 2015" },
  { id: 2, name: "Full Name", years: "1990 - 2015" },
  { id: 3, name: "Full Name", years: "1990 - 2015" },
  // Add more entries as needed
];

export default function MemorialGrid() {
  return (
    <section className="py-16 px-4 bg-[#4E4E4E]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          We Remember Them
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {memorialData.map((person) => (
            <MemorialCard 
              key={person.id}
              name={person.name}
              years={person.years}
            />
          ))}
        </div>
        
        {/* Pagination would go here if needed */}
      </div>
    </section>
  );
}