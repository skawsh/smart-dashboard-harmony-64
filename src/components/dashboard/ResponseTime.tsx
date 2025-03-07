
import React from 'react';
import { ActivityIcon } from 'lucide-react';
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Create some dummy data that resembles the response time chart in the image
const responseTimeData = [
  { time: '1:00 AM', cart: 0.5, checkout: 0.8, payment: 1.2, address: 0.4, product: 0.3, orders: 0.6 },
  { time: '2:00 AM', cart: 0.5, checkout: 0.8, payment: 1.3, address: 0.4, product: 0.3, orders: 0.6 },
  { time: '3:00 AM', cart: 0.5, checkout: 2.5, payment: 1.3, address: 0.4, product: 0.3, orders: 0.6 },
  { time: '4:00 AM', cart: 0.5, checkout: 1.0, payment: 1.2, address: 0.4, product: 0.3, orders: 0.6 },
  { time: '5:00 AM', cart: 0.5, checkout: 0.8, payment: 1.2, address: 0.4, product: 0.3, orders: 0.6 },
  { time: '6:00 AM', cart: 0.5, checkout: 0.9, payment: 1.2, address: 0.6, product: 0.4, orders: 0.7 },
  { time: '7:00 AM', cart: 0.5, checkout: 0.8, payment: 1.2, address: 0.4, product: 0.3, orders: 0.6 },
  { time: '8:00 AM', cart: 0.5, checkout: 0.8, payment: 1.1, address: 0.4, product: 0.3, orders: 0.6 },
];

const ResponseTime: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-teal-600">
        <ActivityIcon size={16} />
        <span className="text-sm font-medium">URI Response Time</span>
      </div>
      
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={responseTimeData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Line type="monotone" dataKey="cart" stroke="#1e88e5" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} name="Cart Service" />
            <Line type="monotone" dataKey="checkout" stroke="#43a047" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} name="Checkout Flow" />
            <Line type="monotone" dataKey="payment" stroke="#fb8c00" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} name="Payment Service" />
            <Line type="monotone" dataKey="address" stroke="#9c27b0" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} name="Address API" />
            <Line type="monotone" dataKey="product" stroke="#e53935" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} name="Product Data" />
            <Line type="monotone" dataKey="orders" stroke="#607d8b" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} name="Orders API" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResponseTime;
