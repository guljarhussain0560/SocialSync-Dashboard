'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Likes', value: 400 },
  { name: 'Comments', value: 150 },
  { name: 'Shares', value: 100 },
];

const COLORS = ['#3b82f6', '#10b981', '#f97316']; // Likes, Comments, Shares

export function EngagementDonutChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="font-semibold text-gray-800">Engagement Breakdown</h3>
      <div className="h-72 mt-4 flex flex-col items-center justify-center">
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
         <div className="flex justify-center gap-4 -mt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#10b981]"></div>Comments</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#3b82f6]"></div>Likes</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#f97316]"></div>Shares</div>
        </div>
      </div>
    </div>
  );
}