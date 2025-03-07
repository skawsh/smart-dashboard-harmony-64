
import React from 'react';
import { ClockIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine, Label } from 'recharts';

// EU1-specific Third-Party Timeout data based on the image
const timeoutData = [
  { time: '5:00 AM', hapi: 0 },
  { time: '5:30 AM', hapi: 0 },
  { time: '6:00 AM', hapi: 0 },
  { time: '6:30 AM', hapi: 0 },
  { time: '7:00 AM', hapi: 0 },
  { time: '7:30 AM', hapi: 0 },
  { time: '8:00 AM', hapi: 0 },
  { time: '8:30 AM', hapi: 3, note: 'High traffic period' },
  { time: '9:00 AM', hapi: 0 },
  { time: '9:30 AM', hapi: 0 },
  { time: '10:00 AM', hapi: 2, note: 'API latency spike' },
  { time: '10:30 AM', hapi: 0 },
];

const ThirdPartyTimeoutTrend: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-red-600">
        <ClockIcon size={16} />
        <span className="text-sm font-medium">Third-Party Timeouts</span>
      </div>
      
      <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <AlertTriangleIcon size={14} className="text-red-500" />
          <span>Critical Timeout</span>
        </div>
        <div className="flex items-center gap-1">
          <InfoIcon size={14} className="text-blue-500" />
          <span>Informational</span>
        </div>
      </div>
      
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={timeoutData}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
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
                const entry = props.payload;
                return [
                  <div>
                    <div>HAPI/LOS-CUSTOMER: {value}</div>
                    {entry.note && (
                      <div className="text-xs mt-1 text-amber-600">Note: {entry.note}</div>
                    )}
                  </div>,
                  ''
                ];
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
            
            {/* Annotation for 8:30 AM spike */}
            <ReferenceLine 
              x="8:30 AM" 
              stroke="#FF6B6B" 
              strokeWidth={2} 
              strokeDasharray="3 3"
              ifOverflow="extendDomain"
            >
              <Label 
                value="Peak Timeout" 
                position="top" 
                fill="#FF6B6B" 
                fontSize={10}
                offset={10}
              />
            </ReferenceLine>
            
            {/* Annotation for 10:00 AM spike */}
            <ReferenceLine 
              x="10:00 AM" 
              stroke="#4299E1" 
              strokeWidth={2} 
              strokeDasharray="3 3"
              ifOverflow="extendDomain"
            >
              <Label 
                value="Secondary Spike" 
                position="top" 
                fill="#4299E1" 
                fontSize={10}
                offset={10}
              />
            </ReferenceLine>
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 text-xs text-gray-600 italic">
        <p>Note: Spikes typically indicate increased service latency during high traffic periods.</p>
      </div>
    </div>
  );
};

export default ThirdPartyTimeoutTrend;
