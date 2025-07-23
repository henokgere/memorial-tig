// src/components/StatsSection.jsx
import React, { useEffect, useState } from "react";

const stats = [
  { label: "Users", value: 100 },
  { label: "Memorials", value: 35000 },
  { label: "Books", value: 400 },
  { label: "Articles", value: 1200 },
];

function formatNumber(num) {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
}

export default function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 1500; // ms
    const frameRate = 30; // ms/frame
    const totalFrames = duration / frameRate;

    const intervals = stats.map((stat, i) => {
      const increment = stat.value / totalFrames;
      return setInterval(() => {
        setCounts(prev => {
          const updated = [...prev];
          updated[i] = Math.min(updated[i] + increment, stat.value);
          return updated;
        });
      }, frameRate);
    });

    const timeout = setTimeout(() => {
      setCounts(stats.map(s => s.value));
      intervals.forEach(clearInterval);
    }, duration + 100);

    return () => {
      intervals.forEach(clearInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="bg-[#f9f9f9] my-20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-[#333]">
              <div className="text-4xl font-bold text-[#b88608]">
                {formatNumber(Math.floor(counts[i]))}
              </div>
              <div className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
