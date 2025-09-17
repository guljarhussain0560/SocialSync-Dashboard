'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const platformDisplayNames: Record<string, string> = {
  linkedin: 'LinkedIn',
  'twitter/x': 'Twitter/X',
  instagram: 'Instagram',
  facebook: 'Facebook',
  tayog: 'Tayog',
};

export function TopPlatformsChart() {
  const [data, setData] = useState<{ name: string; reach: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/posts/analytics');
        if (!res.ok) throw new Error('Failed to fetch analytics');
        const posts = await res.json();
        // Aggregate reach by platform
        const reachByPlatform: Record<string, number> = {};
        for (const post of posts) {
          if (Array.isArray(post.platforms)) {
            for (const platform of post.platforms) {
              const key = platform.toLowerCase();
              reachByPlatform[key] = (reachByPlatform[key] || 0) + (post.analytics?.reach || 0);
            }
          }
        }
        const chartData = Object.entries(reachByPlatform).map(([key, reach]) => ({
          name: platformDisplayNames[key] || key,
          reach,
        }));
        setData(chartData);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="font-semibold text-gray-800">Top Performing Platforms</h3>
      <div className="h-72 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0"/>
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12}/>
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip />
            <Bar dataKey="reach" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        {loading && <div className="text-gray-500 text-center mt-4">Loading...</div>}
        {!loading && data.length === 0 && <div className="text-gray-500 text-center mt-4">No data found.</div>}
      </div>
    </div>
  );
}