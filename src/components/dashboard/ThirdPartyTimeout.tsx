
import React from 'react';
import { TimerOffIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Create some dummy data that resembles the timeout chart in the image
const timeoutData = [
  { time: '1:00 AM', payment: 0, merchant: 0 },
  { time: '2:00 AM', payment: 0, merchant: 0 },
  { time: '3:00 AM', payment: 12, merchant: 0, annotation: 'Payment timeout spike' },
  { time: '4:00 AM', payment: 0, merchant: 0 },
  { time: '5:00 AM', payment: 0, merchant: 0 },
  { time: '6:00 AM', payment: 0, merchant: 0 },
  { time: '7:00 AM', payment: 0, merchant: 3, annotation: 'Merchant timeout' },
  { time: '8:00 AM', payment: 0, merchant: 0 },
];

// Chart configuration
const chartConfig = {
  payment: { 
    label: "PAYPAL CUSTOMERS", 
    color: "#9b87f5" 
  },
  merchant: { 
    label: "Merchants", 
    color: "#82ca9d" 
  }
};

const ThirdPartyTimeout: React.FC = () => {
  // Custom renderer for annotations
  const renderCustomizedLabel = (props: any) => {
    const { x, y, index } = props;
    const data = timeoutData[index];
    
    if (!data.annotation) return null;
    
    // Only render annotations for points with values and annotations
    if ((data.payment > 0 || data.merchant > 0) && data.annotation) {
      const isPayment = data.payment > 0;
      const yValue = isPayment ? data.payment : data.merchant;
      const adjustedY = 300 - (yValue * 17); // Adjusting Y position based on chart scale
      
      return (
        <g>
          <foreignObject x={x - 12} y={adjustedY - 60} width={120} height={50}>
            <div className="flex items-center gap-1 px-2 py-1 bg-white/90 border border-gray-200 rounded shadow-sm text-xs">
              {isPayment ? (
                <AlertTriangleIcon size={12} className="text-purple-500" />
              ) : (
                <InfoIcon size={12} className="text-green-500" />
              )}
              <span className="font-medium">{data.annotation}</span>
            </div>
          </foreignObject>
          <line x1={x} y1={adjustedY} x2={x} y2={adjustedY - 15} stroke={isPayment ? "#9b87f5" : "#82ca9d"} strokeWidth={1} strokeDasharray="3 3" />
        </g>
      );
    }
    
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-red-600">
        <TimerOffIcon size={16} />
        <span className="text-sm font-medium">Third-Party Read Timeout/Connection Timeout</span>
      </div>
      
      <div className="w-full h-56 mb-2">
        <ChartContainer 
          config={chartConfig}
          className="w-full h-full"
        >
          <LineChart
            data={timeoutData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} domain={[0, 15]} />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  formatter={(value, name) => [
                    `${value} timeouts`, 
                    name === "payment" ? "PAYPAL CUSTOMERS" : "Merchants"
                  ]}
                />
              }
            />
            <Line 
              type="monotone" 
              dataKey="payment" 
              stroke="#9b87f5" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
              name="PAYPAL CUSTOMERS" 
              label={renderCustomizedLabel}
            />
            <Line 
              type="monotone" 
              dataKey="merchant" 
              stroke="#82ca9d" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
              name="Merchants" 
              label={renderCustomizedLabel}
            />
          </LineChart>
        </ChartContainer>
      </div>
      
      {/* Legend with explanation */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-xs gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>PAYPAL CUSTOMERS</span>
          </div>
          <div className="flex items-center gap-1 ml-4">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Merchants</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          <span className="flex items-center gap-1">
            <AlertTriangleIcon size={12} className="text-purple-500" />
            <span>Critical timeout events that require immediate attention</span>
          </span>
          <span className="flex items-center gap-1 mt-1">
            <InfoIcon size={12} className="text-green-500" />
            <span>Minor timeout events for monitoring</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyTimeout;
