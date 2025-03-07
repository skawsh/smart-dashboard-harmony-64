
import React, { useContext } from 'react';
import { CpuIcon } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { RegionContext } from '@/pages/Index';

// Standard CPU data for all regions
const cpuData = [
  { time: '1:00 AM', AP: 45, AM: 43, EU1: 47, EU2: 48, EU3: 44, EU4: 41, EU5: 42 },
  { time: '2:00 AM', AP: 45, AM: 43, EU1: 46, EU2: 47, EU3: 44, EU4: 42, EU5: 43 },
  { time: '3:00 AM', AP: 46, AM: 44, EU1: 48, EU2: 50, EU3: 45, EU4: 43, EU5: 44 },
  { time: '4:00 AM', AP: 47, AM: 45, EU1: 49, EU2: 52, EU3: 46, EU4: 45, EU5: 45 },
  { time: '5:00 AM', AP: 49, AM: 46, EU1: 50, EU2: 54, EU3: 48, EU4: 47, EU5: 48 },
  { time: '6:00 AM', AP: 51, AM: 48, EU1: 52, EU2: 56, EU3: 50, EU4: 49, EU5: 51 },
  { time: '7:00 AM', AP: 53, AM: 50, EU1: 54, EU2: 59, EU3: 52, EU4: 52, EU5: 55 },
  { time: '8:00 AM', AP: 55, AM: 51, EU1: 56, EU2: 62, EU3: 54, EU4: 55, EU5: 59 },
];

// EU1 specific CPU trend data that matches the image
const eu1CpuTrendData = [
  { time: '4:00 AM', pod1: 0.5, pod2: 0.6, pod3: 0.5, pod4: 0.7, pod5: 0.4, pod6: 0.6, pod7: 0.5, pod8: 0.5, pod9: 0.6 },
  { time: '4:30 AM', pod1: 0.6, pod2: 0.5, pod3: 0.7, pod4: 0.5, pod5: 0.6, pod6: 0.5, pod7: 0.6, pod8: 0.7, pod9: 0.5 },
  { time: '5:00 AM', pod1: 0.5, pod2: 0.7, pod3: 0.6, pod4: 0.6, pod5: 0.5, pod6: 0.7, pod7: 0.5, pod8: 0.6, pod9: 0.7 },
  { time: '5:30 AM', pod1: 0.7, pod2: 0.6, pod3: 0.5, pod4: 0.7, pod5: 0.8, pod6: 0.6, pod7: 0.7, pod8: 0.5, pod9: 0.6 },
  { time: '6:00 AM', pod1: 0.8, pod2: 0.7, pod3: 0.9, pod4: 0.6, pod5: 0.7, pod6: 0.8, pod7: 0.6, pod8: 0.7, pod9: 0.8 },
  { time: '6:30 AM', pod1: 0.7, pod2: 0.8, pod3: 0.7, pod4: 0.9, pod5: 0.7, pod6: 0.6, pod7: 0.8, pod8: 0.7, pod9: 0.6 },
  { time: '7:00 AM', pod1: 0.9, pod2: 0.7, pod3: 0.8, pod4: 0.7, pod5: 0.9, pod6: 0.8, pod7: 0.7, pod8: 0.9, pod9: 0.7 },
  { time: '7:30 AM', pod1: 0.8, pod2: 1.0, pod3: 0.9, pod4: 0.8, pod5: 0.7, pod6: 0.9, pod7: 1.0, pod8: 0.8, pod9: 0.9 },
  { time: '8:00 AM', pod1: 1.1, pod2: 0.9, pod3: 1.0, pod4: 1.2, pod5: 0.9, pod6: 1.1, pod7: 0.9, pod8: 1.0, pod9: 1.1 },
  { time: '8:30 AM', pod1: 1.2, pod2: 1.1, pod3: 1.3, pod4: 1.0, pod5: 1.2, pod6: 1.1, pod7: 1.3, pod8: 1.2, pod9: 1.0 },
  { time: '9:00 AM', pod1: 1.3, pod2: 1.5, pod3: 1.2, pod4: 1.4, pod5: 1.3, pod6: 1.5, pod7: 1.2, pod8: 1.4, pod9: 1.3 },
  { time: '9:30 AM', pod1: 1.5, pod2: 1.3, pod3: 1.6, pod4: 1.5, pod5: 1.4, pod6: 1.3, pod7: 1.6, pod8: 1.5, pod9: 1.4 },
  { time: '10:00 AM', pod1: 1.7, pod2: 1.6, pod3: 1.5, pod4: 1.8, pod5: 1.7, pod6: 1.6, pod7: 1.8, pod8: 1.7, pod9: 1.9 },
  { time: '10:30 AM', pod1: 1.9, pod2: 2.0, pod3: 1.8, pod4: 1.7, pod5: 2.1, pod6: 1.9, pod7: 2.0, pod8: 1.8, pod9: 2.2 },
];

const podNames = [
  'hybris-ecm-web-6475dbd4d-2c66q',
  'hybris-ecm-web-6475dbd4d-2jh45',
  'hybris-ecm-web-6475dbd4d-474tl',
  'hybris-ecm-web-6475dbd4d-49d5x',
  'hybris-ecm-web-6475dbd4d-4lzbz',
  'hybris-ecm-web-6475dbd4d-59rw9',
  'hybris-ecm-web-6475dbd4d-5fs9h',
  'hybris-ecm-web-6475dbd4d-5gfc2',
  'hybris-ecm-web-6475dbd4d-5vxtr',
];

const CpuUtilization: React.FC = () => {
  const { selectedRegion } = useContext(RegionContext);
  const isEU1Selected = selectedRegion === "EU1";

  // Define pod colors for the EU1 specific view
  const podColors = [
    '#6D28D9', // purple
    '#00BCD4', // cyan
    '#4CAF50', // green
    '#FF9800', // orange
    '#E91E63', // pink
    '#607D8B', // blue-grey
    '#8E24AA', // deep purple
    '#0288D1', // light blue
    '#004D40', // teal
  ];

  if (isEU1Selected) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-1 mb-3 text-purple-600">
          <CpuIcon size={16} />
          <span className="text-sm font-medium">Hybris CPU Trend</span>
        </div>
        
        <div className="w-full h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={eu1CpuTrendData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 4]} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Legend layout="vertical" verticalAlign="top" align="right" wrapperStyle={{ fontSize: 9, paddingLeft: 10 }} />
              
              {podNames.map((pod, index) => (
                <Line 
                  key={index}
                  type="monotone" 
                  dataKey={`pod${index + 1}`} 
                  stroke={podColors[index]} 
                  name={pod}
                  dot={false}
                  strokeWidth={1}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-purple-600">
        <CpuIcon size={16} />
        <span className="text-sm font-medium">Hybris CPU Utilization</span>
      </div>
      
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={cpuData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAP" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAM" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEU1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEU2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff8042" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ff8042" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEU3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0088fe" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0088fe" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEU4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00C49F" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEU5" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFBB28" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FFBB28" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Area type="monotone" dataKey="AP" stroke="#8884d8" fillOpacity={1} fill="url(#colorAP)" />
            <Area type="monotone" dataKey="AM" stroke="#82ca9d" fillOpacity={1} fill="url(#colorAM)" />
            <Area type="monotone" dataKey="EU1" stroke="#ffc658" fillOpacity={1} fill="url(#colorEU1)" />
            <Area type="monotone" dataKey="EU2" stroke="#ff8042" fillOpacity={1} fill="url(#colorEU2)" />
            <Area type="monotone" dataKey="EU3" stroke="#0088fe" fillOpacity={1} fill="url(#colorEU3)" />
            <Area type="monotone" dataKey="EU4" stroke="#00C49F" fillOpacity={1} fill="url(#colorEU4)" />
            <Area type="monotone" dataKey="EU5" stroke="#FFBB28" fillOpacity={1} fill="url(#colorEU5)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CpuUtilization;
