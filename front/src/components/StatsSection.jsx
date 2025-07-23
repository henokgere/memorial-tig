import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import api from "../utils/axios";

function formatNumber(num) {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
}

export default function StatsSection() {
  const [stats, setStats] = useState([]);
  const [counts, setCounts] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats");
        const apiStats = [
          { label: "Users", value: res.data.data.users },
          { label: "Memorials", value: res.data.data.memorials },
          { label: "Books", value: res.data.data.books },
          { label: "Articles", value: res.data.data.articles },
        ];
        setStats(apiStats);
        setCounts(apiStats.map(() => 0));
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (inView && stats.length > 0 && !hasAnimated) {
      const duration = 1500;
      const frameRate = 30;
      const totalFrames = duration / frameRate;

      const intervals = stats.map((stat, i) => {
        const increment = stat.value / totalFrames;
        return setInterval(() => {
          setCounts((prev) => {
            const updated = [...prev];
            if (updated[i] < stat.value) {
              updated[i] = Math.min(updated[i] + increment, stat.value);
            }
            return updated;
          });
        }, frameRate);
      });

      const timeout = setTimeout(() => {
        setCounts(stats.map(s => s.value));
        intervals.forEach(clearInterval);
      }, duration + 100);

      setHasAnimated(true);
    }
  }, [inView, stats, hasAnimated]);

  return (
    <section ref={ref} className="bg-[#f9f9f9] my-20 py-12">
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
