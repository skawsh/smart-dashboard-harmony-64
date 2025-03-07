
import React from 'react';
import { TimerOffIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine, Label, Legend } from 'recharts';

// Create some dummy data that resembles the timeout chart in the image
const timeoutData = [
  { time: '1:00 AM', payment: 0, merchant: 0 },
  { time: '2:00 AM', payment: 0, merchant: 0 },
  { time: '3:00 AM', payment: 12, merchant: 0, note: 'Payment processor timeout spike' },
  { time: '4:00 AM', payment: 0, merchant: 0 },
  { time: '5:00 AM', payment: 0, merchant: 0 },
  { time: '6:00 AM', payment: 0, merchant: 0 },
  { time: '7:00 AM', payment: 0, merchant: 3, note: 'Merchant API timeout' },
  { time: '8:00 AM', payment: 0, merchant: 0 },
];

const ThirdPartyTimeout: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-red-600">
        <TimerOffIcon size={16} />
        <span className="text-sm font-medium">Third-Party Read Timeout/Connection Timeout</span>
      </div>
      
      <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <AlertTriangleIcon size={14} className="text-purple-500" />
          <span>Payment Customer Timeouts</span>
        </div>
        <div className="flex items-center gap-1">
          <InfoIcon size={14} className="text-green-500" />
          <span>Merchant Timeouts</span>
        </div>
      </div>
      
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={timeoutData}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} domain={[0, 15]} label={{ value: 'Timeout Count', angle: -90, position: 'insideLeft', style: { fontSize: 10 }, dx: -10 }} />
            <Tooltip 
              contentStyle={{ fontSize: 12 }}
              formatter={(value, name, props) => {
                const entry = props.payload;
                return [
                  <div>
                    <div>{name === 'payment' ? 'PAYPAL CUSTOMERS' : 'Merchants'}: {value}</div>
                    {entry.note && (
                      <div className="text-xs mt-1 text-amber-600">Note: {entry.note}</div>
                    )}
                  </div>,
                  name === 'payment' ? 'PAYPAL CUSTOMERS' : 'Merchants'
                ];
              }}
              labelFormatter={(label) => `${label}`}
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
            
            {/* Annotation for 3:00 AM payment processor spike */}
            <ReferenceLine 
              x="3:00 AM" 
              stroke="#8884d8" 
              strokeWidth={2} 
              strokeDasharray="3 3" 
              ifOverflow="extendDomain"
            >
              <Label 
                value="Major Timeout Event" 
                position="top" 
                fill="#8884d8" 
                fontSize={10}
                offset={10}
              />
            </ReferenceLine>
            
            {/* Annotation for 7:00 AM merchant spike */}
            <ReferenceLine 
              x="7:00 AM" 
              stroke="#82ca9d" 
              strokeWidth={2} 
              strokeDasharray="3 3"
              ifOverflow="extendDomain"
            >
              <Label 
                value="Merchant API Issue" 
                position="top" 
                fill="#82ca9d" 
                fontSize={10}
                offset={10}
              />
            </ReferenceLine>
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 text-xs text-gray-600 italic">
        <p>Note: Payment processor timeouts at 3:00 AM indicate potential integration issues. Merchant timeouts at 7:00 AM may require API investigation.</p>
      </div>
    </div>
  );
};

export default ThirdPartyTimeout;
