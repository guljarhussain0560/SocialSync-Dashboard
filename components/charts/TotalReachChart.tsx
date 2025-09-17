'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Helper to format date as 'MMM D'
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
  }>;
};

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="text-xs font-medium text-gray-900">
        {`${payload[0].value.toLocaleString()}`}
      </div>
    );
  }
  return null;
};

export function TotalReachChart() {
  const [data, setData] = useState<{ name: string; reach: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/posts/analytics');
        if (!res.ok) throw new Error('Failed to fetch analytics');
        const posts = await res.json();
        // Aggregate reach by date
        const reachByDate: Record<string, number> = {};
        for (const post of posts) {
          const dateKey = formatDate(post.createdAt);
          reachByDate[dateKey] = (reachByDate[dateKey] || 0) + (post.analytics?.reach || 0);
        }
        // Sort by date (as string)
        const chartData = Object.entries(reachByDate)
          .map(([name, reach]) => ({ name, reach }));
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
      <h3 className="font-semibold text-gray-800">Total Reach</h3>
      <div className="h-72 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line type="monotone" dataKey="reach" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
        {loading && <div className="text-gray-500 text-center mt-4">Loading...</div>}
        {!loading && data.length === 0 && <div className="text-gray-500 text-center mt-4">No data found.</div>}
      </div>
    </div>
  );
}