
import React from 'react';
import { TimerOffIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine, Label } from 'recharts';

// Create some dummy data that resembles the timeout chart in the image
const timeoutData = [
  { time: '1:00 AM', payment: 0, merchant: 0, date: 'Fri Mar 7 2025' },
  { time: '2:00 AM', payment: 0, merchant: 0, date: 'Fri Mar 7 2025' },
  { time: '3:00 AM', payment: 12, merchant: 0, date: 'Fri Mar 7 2025' },
  { time: '4:00 AM', payment: 0, merchant: 0, date: 'Fri Mar 7 2025' },
  { time: '5:00 AM', payment: 0, merchant: 0, date: 'Fri Mar 7 2025' },
  { time: '6:00 AM', payment: 0, merchant: 0, date: 'Fri Mar 7 2025' },
  { time: '7:00 AM', payment: 0, merchant: 3, date: 'Fri Mar 7 2025' },
  { time: '8:00 AM', payment: 0, merchant: 0, date: 'Fri Mar 7 2025' },
];

// Identify peak points for annotations
const paymentPeaks = timeoutData.filter(point => point.payment > 0);
const merchantPeaks = timeoutData.filter(point => point.merchant > 0);

const ThirdPartyTimeout: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-red-600">
        <TimerOffIcon size={16} />
        <span className="text-sm font-medium">Third-Party Read Timeout/Connection Timeout</span>
      </div>
      
      {/* Chart Legend */}
      <div className="flex flex-wrap items-center mb-2 text-xs gap-4">
        <div className="flex items-center">
          <span className="w-3 h-0.5 bg-purple-500 inline-block mr-1"></span>
          <span>PAYPAL CUSTOMERS</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-0.5 bg-green-500 inline-block mr-1"></span>
          <span>Merchants</span>
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
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10 }} 
            />
            <YAxis 
              tick={{ fontSize: 10 }} 
              domain={[0, 15]} 
            />
            <Tooltip 
              contentStyle={{ fontSize: 12 }}
              formatter={(value, name) => {
                return [`${name}: ${value}`, ''];
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
              dataKey="payment" 
              stroke="#8884d8" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
              name="PAYPAL CUSTOMERS" 
            />
            <Line 
              type="monotone" 
              dataKey="merchant" 
              stroke="#82ca9d" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
              name="Merchants" 
            />
            
            {/* Add annotations for payment peaks */}
            {paymentPeaks.map((point, index) => (
              <ReferenceLine
                key={`payment-${index}`}
                x={point.time}
                stroke="#FF4500"
                strokeDasharray="3 3"
                label={{
                  value: `PayPal: ${point.payment}`,
                  position: 'top',
                  fill: '#FF4500',
                  fontSize: 10,
                }}
              />
            ))}
            
            {/* Add annotations for merchant peaks */}
            {merchantPeaks.map((point, index) => (
              <ReferenceLine
                key={`merchant-${index}`}
                x={point.time}
                stroke="#FF4500"
                strokeDasharray="3 3"
                label={{
                  value: `Merchants: ${point.merchant}`,
                  position: 'insideTopRight',
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
      
      {/* Add explanatory notes below the chart */}
      <div className="mt-2 flex items-start gap-1 text-xs text-gray-600 italic">
        <InfoIcon size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <p>Note: Peaks in the graph indicate timeouts experienced by PayPal customers and merchants. Monitor closely for patterns during peak hours.</p>
      </div>
    </div>
  );
};

export default ThirdPartyTimeout;
