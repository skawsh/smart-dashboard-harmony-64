
import React from 'react';
import { ClockIcon, AlertTriangleIcon } from 'lucide-react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine, Label } from 'recharts';

// EU1-specific Third-Party Timeout data based on the image
const timeoutData = [
  { time: '5:00 AM', hapi: 0, date: 'Fri Mar 7 2025' },
  { time: '5:30 AM', hapi: 0, date: 'Fri Mar 7 2025' },
  { time: '6:00 AM', hapi: 0, date: 'Fri Mar 7 2025' },
  { time: '6:30 AM', hapi: 0, date: 'Fri Mar 7 2025' },
  { time: '7:00 AM', hapi: 0, date: 'Fri Mar 7 2025' },
  { time: '7:30 AM', hapi: 0, date: 'Fri Mar 7 2025' },
  { time: '8:00 AM', hapi: 0, date: 'Fri Mar 7 2025' },
  { time: '8:30 AM', hapi: 3, date: 'Fri Mar 7 2025' },
  { time: '9:00 AM', hapi: 0, date: 'Fri Mar 7 2025' },
  { time: '9:30 AM', hapi: 0, date: 'Fri Mar 7 2025' },
  { time: '10:00 AM', hapi: 2, date: 'Fri Mar 7 2025' },
  { time: '10:30 AM', hapi: 0, date: 'Fri Mar 7 2025' },
];

// Identify peak points for annotations
const peakPoints = timeoutData.filter(point => point.hapi > 0);

const ThirdPartyTimeoutTrend: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-red-600">
        <ClockIcon size={16} />
        <span className="text-sm font-medium">Third-Party Timeouts</span>
      </div>
      
      {/* Chart Legend */}
      <div className="flex items-center mb-2 text-xs">
        <div className="flex items-center mr-4">
          <span className="w-3 h-0.5 bg-purple-600 inline-block mr-1"></span>
          <span>HAPI/LOS-CUSTOMER</span>
        </div>
        <div className="flex items-center text-red-500">
          <AlertTriangleIcon size={12} className="mr-1" />
          <span>Timeout Peak</span>
        </div>
      </div>
      
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={timeoutData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10 }} 
            />
            <YAxis 
              domain={[0, 4]} 
              tick={{ fontSize: 10 }} 
              label={{ 
                value: 'HAPI/LOS-CUSTOMER', 
                angle: -90, 
                position: 'insideLeft', 
                style: { fontSize: 10, textAnchor: 'middle' }, 
                dx: -10 
              }} 
            />
            <Tooltip 
              contentStyle={{ fontSize: 12 }}
              formatter={(value, name, props) => {
                return [`HAPI/LOS-CUSTOMER: ${value}`, ''];
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload.length > 0) {
                  return `${label} - ${payload[0].payload.date}`;
                }
                return label;
              }}
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
            
            {/* Add annotations for peak points */}
            {peakPoints.map((point, index) => (
              <ReferenceLine
                key={index}
                x={point.time}
                stroke="#FF4500"
                strokeDasharray="3 3"
                label={{
                  value: `Timeout: ${point.hapi}`,
                  position: 'top',
                  fill: '#FF4500',
                  fontSize: 10,
                }}
              />
            ))}
            
            {/* Add time reference line at the bottom */}
            <ReferenceLine y={0} stroke="#000" strokeWidth={1}>
              <Label value="_time" position="right" offset={0} fontSize={10} />
            </ReferenceLine>
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Add note below the chart */}
      <div className="mt-2 text-xs text-gray-600 italic">
        <p>Note: Peaks indicate connection timeout issues with the HAPI/LOS-CUSTOMER service. Monitor closely during peak hours.</p>
      </div>
    </div>
  );
};

export default ThirdPartyTimeoutTrend;
