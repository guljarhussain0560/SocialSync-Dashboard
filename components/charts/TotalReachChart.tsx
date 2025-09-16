'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sep 9', reach: 890 },
  { name: 'Sep 10', reach: 1050 },
  { name: 'Sep 11', reach: 1200 },
  { name: 'Sep 12', reach: 1350 },
  { name: 'Sep 13', reach: 1280 },
  { name: 'Sep 14', reach: 1550 },
  { name: 'Sep 15', reach: 1820 },
];

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
      </div>
    </div>
  );
}