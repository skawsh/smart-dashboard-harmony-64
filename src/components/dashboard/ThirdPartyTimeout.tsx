
import React from 'react';
import { TimerOffIcon } from 'lucide-react';
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Create some dummy data that resembles the timeout chart in the image
const timeoutData = [
  { time: '1:00 AM', payment: 0, merchant: 0 },
  { time: '2:00 AM', payment: 0, merchant: 0 },
  { time: '3:00 AM', payment: 12, merchant: 0 },
  { time: '4:00 AM', payment: 0, merchant: 0 },
  { time: '5:00 AM', payment: 0, merchant: 0 },
  { time: '6:00 AM', payment: 0, merchant: 0 },
  { time: '7:00 AM', payment: 0, merchant: 3 },
  { time: '8:00 AM', payment: 0, merchant: 0 },
];

const ThirdPartyTimeout: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-error-600">
        <TimerOffIcon size={16} />
        <span className="text-sm font-medium">Third-Party Read Timeout/Connection Timeout</span>
      </div>
      
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={timeoutData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Line type="monotone" dataKey="payment" stroke="#8884d8" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} name="PAYPAL CUSTOMERS" />
            <Line type="monotone" dataKey="merchant" stroke="#82ca9d" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} name="Merchants" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThirdPartyTimeout;
