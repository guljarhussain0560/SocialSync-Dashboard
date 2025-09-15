'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'LinkedIn', reach: 1020 },
  { name: 'Twitter/X', reach: 850 },
  { name: 'Instagram', reach: 680 },
  { name: 'Facebook', reach: 450 },
  { name: 'Tayog', reach: 910 },
];

export function TopPlatformsChart() {
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
      </div>
    </div>
  );
}