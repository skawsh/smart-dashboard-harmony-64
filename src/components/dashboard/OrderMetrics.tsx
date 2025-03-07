
import React, { useState, useContext, useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon, BarChart2, List } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell, LabelList } from 'recharts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RegionContext } from '@/pages/Index';

// Types for our data structure
interface OrderData {
  time: string;
  country: string;
  today: number;
  yesterday: number;
  difference: number;
  percentage: number;
}

// All instances data
const orderData: OrderData[] = [
  { time: '02:00-08:00', country: 'DE', today: 35368, yesterday: 63682, difference: -28314, percentage: -44.46 },
  { time: '02:00-08:00', country: 'US', today: 4708, yesterday: 9618, difference: -4910, percentage: -51.05 },
  { time: '02:00-08:00', country: 'NL', today: 2324, yesterday: 4800, difference: -2476, percentage: -51.58 },
  { time: '02:00-08:00', country: 'AT', today: 1273, yesterday: 2197, difference: -924, percentage: -42.06 },
  { time: '02:00-08:00', country: 'CA', today: 503, yesterday: 840, difference: -337, percentage: -40.12 },
];

// EU1 region-specific data based on the image
const EU1OrderData: OrderData[] = [
  { time: '02:00-08:00', country: 'DE', today: 237, yesterday: 237, difference: 0, percentage: 0 },
  { time: '02:00-08:00', country: 'ES', today: 57, yesterday: 57, difference: 0, percentage: 0 },
  { time: '02:00-08:00', country: 'FR', today: 0, yesterday: 0, difference: 0, percentage: 0 },
  { time: '02:00-08:00', country: 'GB', today: 237, yesterday: 245, difference: -8, percentage: -3.27 },
  { time: '02:00-08:00', country: 'IE', today: 0, yesterday: 0, difference: 0, percentage: 0 },
];

// Create a map of country codes to colors
const countryColors: Record<string, string> = {
  'DE': '#4361EE', // Germany
  'US': '#F72585', // United States
  'NL': '#4CC9F0', // Netherlands
  'AT': '#7209B7', // Austria
  'CA': '#F7B801', // Canada
  'ES': '#3FAA73', // Spain
  'GB': '#F94144', // United Kingdom
};

// Default color for any countries not specifically defined
const defaultColor = '#94A3B8';

const OrderMetrics: React.FC = () => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('table'); // Initially show table for EU1 as per image
  const [comparison, setComparison] = useState<'yesterday' | 'difference'>('yesterday');
  const { selectedRegion } = useContext(RegionContext);

  // Select data based on region
  const dataToUse = selectedRegion === 'EU1' ? EU1OrderData : orderData;

  // Set to table view when EU1 is selected to match image
  useEffect(() => {
    if (selectedRegion === 'EU1') {
      setViewMode('table');
    }
  }, [selectedRegion]);
  
  // Get total orders and calculate overall percentage change
  const totalToday = dataToUse.reduce((sum, item) => sum + item.today, 0);
  const totalYesterday = dataToUse.reduce((sum, item) => sum + item.yesterday, 0);
  const totalDifference = totalToday - totalYesterday;
  const totalPercentage = totalYesterday ? (totalDifference / totalYesterday) * 100 : 0;
  
  // Sort data for the chart
  const sortedData = [...dataToUse].sort((a, b) => b.today - a.today);
  
  // Function to get color based on country code
  const getCountryColor = (country: string): string => {
    return countryColors[country] || defaultColor;
  };
  
  // Format value for chart labels
  const formatValue = (value: number): string => {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();
  };
  
  // Toggle between chart and table view
  const toggleView = () => {
    setViewMode(viewMode === 'chart' ? 'table' : 'chart');
  };
  
  // Toggle between comparison modes
  const toggleComparison = (mode: 'yesterday' | 'difference') => {
    setComparison(mode);
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-4 gap-2">
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium">Total Orders Today:</span> 
          <span className="ml-1 font-bold text-blue-600">
            {totalToday.toLocaleString()}
          </span>
          <span className="ml-3 flex items-center gap-1 text-xs">
            {totalPercentage < 0 ? (
              <span className="flex items-center text-red-600">
                <ArrowDownIcon size={14} />
                {Math.abs(totalPercentage).toFixed(2)}%
              </span>
            ) : totalPercentage > 0 ? (
              <span className="flex items-center text-green-600">
                <ArrowUpIcon size={14} />
                {totalPercentage.toFixed(2)}%
              </span>
            ) : (
              <span className="text-gray-600">No change</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "text-xs px-3 py-1 h-8", 
                comparison === 'yesterday' ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-transparent"
              )}
              onClick={() => toggleComparison('yesterday')}
            >
              Compare with Yesterday
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "text-xs px-3 py-1 h-8", 
                comparison === 'difference' ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-transparent"
              )}
              onClick={() => toggleComparison('difference')}
            >
              Show Difference
            </Button>
          </div>
          <Button
            variant="outline" 
            size="sm"
            className="gap-1 text-xs px-3 py-1 h-8"
            onClick={toggleView}
          >
            {viewMode === 'chart' ? (
              <>
                <List size={14} />
                Table View
              </>
            ) : (
              <>
                <BarChart2 size={14} />
                Chart View
              </>
            )}
          </Button>
        </div>
      </div>
      
      {viewMode === 'chart' ? (
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              barGap={10}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="country" 
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(value) => formatValue(value)}
              />
              <Tooltip
                formatter={(value) => [Number(value).toLocaleString(), '']}
                labelFormatter={(label) => `Country: ${label}`}
                cursor={{ fill: 'rgba(224, 231, 255, 0.2)' }}
              />
              
              <Bar 
                dataKey="today" 
                name="Today" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              >
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-today-${index}`} fill={getCountryColor(entry.country)} />
                ))}
                <LabelList 
                  dataKey="today" 
                  position="top"
                  formatter={(value: any) => formatValue(value)}
                  style={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }}
                />
              </Bar>
              
              {comparison === 'yesterday' ? (
                <Bar 
                  dataKey="yesterday" 
                  name="Yesterday" 
                  fill="#94a3b8"
                  radius={[4, 4, 0, 0]}
                >
                  {sortedData.map((entry, index) => (
                    <Cell key={`cell-yesterday-${index}`} fill={`${getCountryColor(entry.country)}80`} />
                  ))}
                </Bar>
              ) : (
                <Bar 
                  dataKey="difference" 
                  name="Difference" 
                  radius={[4, 4, 0, 0]}
                >
                  {sortedData.map((entry, index) => (
                    <Cell 
                      key={`cell-difference-${index}`} 
                      fill={entry.difference < 0 ? "#ef4444" : entry.difference > 0 ? "#22C55E" : "#94a3b8"}
                    />
                  ))}
                  <LabelList 
                    dataKey="difference" 
                    position="top"
                    formatter={(value: any) => {
                      if (typeof value === 'number') {
                        const formattedValue = Math.abs(value) >= 1000 
                          ? `${(value / 1000).toFixed(1)}k` 
                          : value.toString();
                        return value < 0 ? formattedValue : value > 0 ? `+${formattedValue}` : '0';
                      }
                      return '0';
                    }}
                    style={{ fontSize: 11, fontWeight: 500 }}
                  />
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-2.5 px-3 font-medium text-gray-600">Time</th>
                <th className="text-left py-2.5 px-3 font-medium text-gray-600">Country</th>
                <th className="text-right py-2.5 px-3 font-medium text-gray-600">Today</th>
                <th className="text-right py-2.5 px-3 font-medium text-gray-600">Yesterday</th>
                <th className="text-right py-2.5 px-3 font-medium text-gray-600">Difference</th>
                <th className="text-right py-2.5 px-3 font-medium text-gray-600">Change %</th>
              </tr>
            </thead>
            <tbody>
              {dataToUse.map((item, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-2.5 px-3">{item.time}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {item.country}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-medium">{item.today.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-gray-600">{item.yesterday.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-medium">
                    <span className={
                      item.difference < 0 
                        ? "text-red-600" 
                        : item.difference > 0 
                          ? "text-green-600" 
                          : "text-gray-600"
                    }>
                      {item.difference === 0 
                        ? '0' 
                        : `${item.difference > 0 ? '+' : ''}${item.difference.toLocaleString()}`}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="flex items-center justify-end">
                      {item.percentage < 0 ? (
                        <span className="flex items-center text-red-600">
                          <ArrowDownIcon size={14} />
                          {Math.abs(item.percentage).toFixed(2)}%
                        </span>
                      ) : item.percentage > 0 ? (
                        <span className="flex items-center text-green-600">
                          <ArrowUpIcon size={14} />
                          {item.percentage.toFixed(2)}%
                        </span>
                      ) : (
                        <span className="text-gray-600">0.00%</span>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderMetrics;
