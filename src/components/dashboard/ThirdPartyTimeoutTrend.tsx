
import React from 'react';
import { ClockIcon } from 'lucide-react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// EU1-specific Third-Party Timeout data based on the image
const timeoutData = [
  { time: '5:00 AM', hapi: 0 },
  { time: '5:30 AM', hapi: 0 },
  { time: '6:00 AM', hapi: 0 },
  { time: '6:30 AM', hapi: 0 },
  { time: '7:00 AM', hapi: 0 },
  { time: '7:30 AM', hapi: 0 },
  { time: '8:00 AM', hapi: 0 },
  { time: '8:30 AM', hapi: 3 },
  { time: '9:00 AM', hapi: 0 },
  { time: '9:30 AM', hapi: 0 },
  { time: '10:00 AM', hapi: 2 },
  { time: '10:30 AM', hapi: 0 },
];

const ThirdPartyTimeoutTrend: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-red-600">
        <ClockIcon size={16} />
        <span className="text-sm font-medium">Third-Party Timeouts</span>
      </div>
      
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={timeoutData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 4]} tick={{ fontSize: 10 }} label={{ value: 'HAPI/LOS-CUSTOMER', angle: -90, position: 'insideLeft', style: { fontSize: 10, textAnchor: 'middle' }, dx: -10 }} />
            <Tooltip 
              contentStyle={{ fontSize: 12 }}
              formatter={(value, name) => {
                return [`HAPI/LOS-CUSTOMER : ${value}`, ''];
              }}
              labelFormatter={(label) => `${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="hapi" 
              stroke="#6D28D9" 
              name="HAPI/LOS-CUSTOMER"
              strokeWidth={2}
              dot={{ r: 5, fill: '#6D28D9', stroke: '#6D28D9' }}
              activeDot={{ r: 8, fill: '#6D28D9', stroke: '#6D28D9' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThirdPartyTimeoutTrend;
