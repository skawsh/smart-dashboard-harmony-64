
import React from 'react';
import { CpuIcon } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Create some dummy data that resembles the CPU utilization chart in the image
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

const CpuUtilization: React.FC = () => {
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
