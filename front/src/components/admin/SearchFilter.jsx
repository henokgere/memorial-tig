import React, { useState, useEffect } from 'react';

const SearchFilter = ({ data, onFilter, placeholder = 'Search...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm) {
      onFilter(data);
    } else {
      const filtered = data.filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      onFilter(filtered);
    }
  }, [searchTerm, data, onFilter]);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-black"
      />
    </div>
  );
};

export default SearchFilter;
