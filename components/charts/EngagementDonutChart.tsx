'use client';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f97316']; // Likes, Comments, Shares

export function EngagementDonutChart() {
  const [data, setData] = useState([
    { name: 'Likes', value: 10 },
    { name: 'Comments', value: 20 },
    { name: 'Shares', value: 30 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/analytics');
        if (!res.ok) throw new Error('Failed to fetch analytics');
        const analytics = await res.json();
        // Sum up all analytics for the user
        let likes = 0, comments = 0, shares = 0;
        for (const a of analytics) {
          likes += a.likes || 0;
          comments += a.comments || 0;
          shares += a.shares || 0;
        }
        setData([
          { name: 'Likes', value: likes },
          { name: 'Comments', value: comments },
          { name: 'Shares', value: shares },
        ]);
      } catch {
        setData([
          { name: 'Likes', value: 0 },
          { name: 'Comments', value: 0 },
          { name: 'Shares', value: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="font-semibold text-gray-800">Engagement Breakdown</h3>
      <div className="h-72 mt-4 flex flex-col items-center justify-center">
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
        <div className="flex justify-center gap-4 -mt-8 text-sm text-gray-600">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#10b981]"></div>Comments</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#3b82f6]"></div>Likes</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#f97316]"></div>Shares</div>
        </div>
      </div>
    </div>
  );
}