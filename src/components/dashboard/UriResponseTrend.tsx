
import React from 'react';
import { ActivityIcon } from 'lucide-react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// EU1-specific URI Response Time data based on the image
const uriResponseData = [
  { time: '5:00 AM', cart: 1.9, productpage: 1.7, productContent: 1.6, v1carts: 1.5, v1favorites: 1.4, checkoutPrepare: 1.3, checkoutProceed: 1.6 },
  { time: '5:30 AM', cart: 2.0, productpage: 1.7, productContent: 1.6, v1carts: 1.5, v1favorites: 1.4, checkoutPrepare: 1.3, checkoutProceed: 1.7 },
  { time: '6:00 AM', cart: 2.1, productpage: 1.7, productContent: 1.6, v1carts: 1.5, v1favorites: 1.4, checkoutPrepare: 1.3, checkoutProceed: 1.8 },
  { time: '6:30 AM', cart: 2.0, productpage: 1.7, productContent: 1.6, v1carts: 1.5, v1favorites: 1.4, checkoutPrepare: 1.3, checkoutProceed: 1.9 },
  { time: '7:00 AM', cart: 2.1, productpage: 1.7, productContent: 1.6, v1carts: 1.5, v1favorites: 1.4, checkoutPrepare: 1.3, checkoutProceed: 2.0 },
  { time: '7:30 AM', cart: 2.0, productpage: 1.7, productContent: 1.6, v1carts: 1.5, v1favorites: 1.4, checkoutPrepare: 1.3, checkoutProceed: 1.9 },
  { time: '8:00 AM', cart: 2.1, productpage: 1.7, productContent: 1.6, v1carts: 1.5, v1favorites: 1.4, checkoutPrepare: 1.3, checkoutProceed: 2.0 },
  { time: '8:30 AM', cart: 2.0, productpage: 1.7, productContent: 1.6, v1carts: 1.5, v1favorites: 1.4, checkoutPrepare: 1.3, checkoutProceed: 1.9 },
  { time: '9:00 AM', cart: 2.1, productpage: 1.7, productContent: 1.6, v1carts: 1.5, v1favorites: 1.4, checkoutPrepare: 1.3, checkoutProceed: 2.0 },
  { time: '9:30 AM', cart: 2.0, productpage: 1.7, productContent: 1.6, v1carts: 1.5, v1favorites: 1.4, checkoutPrepare: 1.3, checkoutProceed: 1.9 },
  { time: '10:00 AM', cart: 2.1, productpage: 1.7, productContent: 1.6, v1carts: 1.5, v1favorites: 1.4, checkoutPrepare: 1.3, checkoutProceed: 2.0 },
  { time: '10:30 AM', cart: 2.0, productpage: 1.7, productContent: 1.6, v1carts: 1.5, v1favorites: 1.4, checkoutPrepare: 1.3, checkoutProceed: 2.1 },
];

const UriResponseTrend: React.FC = () => {
  // Define colors for each URI
  const uriColors = {
    cart: '#6D28D9',          // purple
    productpage: '#00BCD4',   // cyan
    productContent: '#4CAF50', // green
    v1carts: '#FF9800',       // orange
    v1favorites: '#E91E63',   // pink
    checkoutPrepare: '#FF1493', // deep pink
    checkoutProceed: '#9C27B0', // purple
  };

  const uriLabels = {
    cart: 'cart/add',
    productpage: 'productpage',
    productContent: 'productpage/_jcr_content/product',
    v1carts: 'v1/carts',
    v1favorites: 'v1/favourites',
    checkoutPrepare: 'v2/checkout/prepare',
    checkoutProceed: 'v2/checkout/proceed',
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-blue-600">
        <ActivityIcon size={16} />
        <span className="text-sm font-medium">URI Response Trend</span>
      </div>
      
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={uriResponseData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Legend layout="vertical" verticalAlign="top" align="left" wrapperStyle={{ fontSize: 9, paddingLeft: 10 }} />
            
            {Object.entries(uriLabels).map(([key, label]) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={uriColors[key as keyof typeof uriColors]} 
                name={label}
                dot={false}
                strokeWidth={1.5}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UriResponseTrend;
