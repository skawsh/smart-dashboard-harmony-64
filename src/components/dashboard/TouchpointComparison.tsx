
import React, { useState, useContext, useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon, Smartphone, RefreshCcw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Cell, LabelList } from 'recharts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RegionContext } from '@/pages/Index';

interface TouchpointData {
  time: string;
  country: string;
  touchpoint: string;
  today: number;
  yesterday: number;
  difference: number;
  percentage: number;
}

// Updated data from the image - All Instances
const touchpointData: TouchpointData[] = [
  { time: '02:00-08:00', country: 'DE', touchpoint: 'IosApp', today: 22927, yesterday: 39098, difference: -16171, percentage: -41.36 },
  { time: '02:00-08:00', country: 'US', touchpoint: 'AndroidApp', today: 8184, yesterday: 12536, difference: -4352, percentage: -34.72 },
  { time: '02:00-08:00', country: 'CA', touchpoint: 'Mobile', today: 7403, yesterday: 8410, difference: -1007, percentage: -11.97 },
  { time: '02:00-08:00', country: 'NL', touchpoint: 'Desktop', today: 2709, yesterday: 3515, difference: -806, percentage: -22.93 },
  { time: '02:00-08:00', country: 'AT', touchpoint: 'Tablet', today: 101, yesterday: 136, difference: -35, percentage: -25.74 },
];

// EU1 region-specific data from the image
const EU1TouchpointData: TouchpointData[] = [
  { time: '02:00-08:00', country: 'FR', touchpoint: 'Mobile', today: 234, yesterday: 248, difference: -14, percentage: -5.65 },
  { time: '02:00-08:00', country: 'FR', touchpoint: 'AndroidApp', today: 156, yesterday: 124, difference: 32, percentage: 25.81 },
  { time: '02:00-08:00', country: 'GB', touchpoint: 'IosApp', today: 142, yesterday: 123, difference: 19, percentage: 15.45 },
  { time: '02:00-08:00', country: 'FR', touchpoint: 'Desktop', today: 80, yesterday: 83, difference: -3, percentage: -3.61 },
  { time: '02:00-08:00', country: 'IE', touchpoint: 'Tablet', today: 24, yesterday: 18, difference: 6, percentage: 33.33 },
];

// Enhanced chart configuration with more distinct, vibrant colors
const chartConfig = {
  IosApp: { color: '#4361EE', label: 'iOS App' },      // Bright blue for iOS
  AndroidApp: { color: '#4CC9F0', label: 'Android App' }, // Cyan for Android
  Mobile: { color: '#F72585', label: 'Mobile' },       // Magenta for Mobile
  Desktop: { color: '#7209B7', label: 'Desktop' },     // Deep purple for Desktop
  Tablet: { color: '#F7B801', label: 'Tablet' },       // Gold for Tablet
};

// Helper function to get a lighter version of a color for the "Yesterday" bars
const getLighterColor = (color: string): string => {
  return `${color}80`; // 80 is the hex for 50% opacity
};

const getTouchpointIcon = (touchpoint: string): string => {
  switch (touchpoint) {
    case 'Mobile':
      return 'bg-pink-50 text-pink-600';
    case 'AndroidApp':
      return 'bg-cyan-50 text-cyan-600';
    case 'Desktop':
      return 'bg-purple-50 text-purple-600';
    case 'Tablet':
      return 'bg-amber-50 text-amber-600';
    case 'IosApp':
      return 'bg-blue-50 text-blue-600';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getBarColor = (touchpoint: string): string => {
  return chartConfig[touchpoint as keyof typeof chartConfig]?.color || '#94a3b8';
};

const TouchpointComparison: React.FC = () => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('table'); // Initially show table for EU1 as per image
  const [comparison, setComparison] = useState<'yesterday' | 'difference'>('yesterday');
  const { selectedRegion } = useContext(RegionContext);

  // Select data based on region
  const dataToUse = selectedRegion === 'EU1' ? EU1TouchpointData : touchpointData;

  // Set to table view when EU1 is selected to match image
  useEffect(() => {
    if (selectedRegion === 'EU1') {
      setViewMode('table');
    }
  }, [selectedRegion]);

  // Transform data for the chart
  const chartData = dataToUse.map(item => ({
    touchpoint: item.touchpoint,
    country: item.country,
    today: item.today,
    yesterday: item.yesterday,
    difference: item.difference,
    percentage: item.percentage,
    name: `${chartConfig[item.touchpoint as keyof typeof chartConfig]?.label || item.touchpoint} (${item.country})`,
  }));

  // Function to format values in the chart safely
  const formatValueSafely = (value: number | string | undefined): string => {
    if (typeof value === 'number') {
      return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();
    }
    return value?.toString() || '0';
  };

  // Sort data by today's values for better visualization
  const sortedChartData = [...chartData].sort((a, b) => b.today - a.today);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4 gap-2">
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium">Total Orders Today:</span> 
          <span className="ml-1 font-bold text-blue-600">
            {sortedChartData.reduce((sum, item) => sum + item.today, 0).toLocaleString()}
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
              onClick={() => setComparison('yesterday')}
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
              onClick={() => setComparison('difference')}
            >
              Show Difference
            </Button>
          </div>
          <Button
            variant="outline" 
            size="sm"
            className="gap-1 text-xs px-3 py-1 h-8"
            onClick={() => setViewMode(viewMode === 'chart' ? 'table' : 'chart')}
          >
            <RefreshCcw size={14} />
            {viewMode === 'chart' ? 'Table View' : 'Chart View'}
          </Button>
        </div>
      </div>

      {viewMode === 'chart' ? (
        <ChartContainer
          className="w-full h-[400px]"
          config={chartConfig}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedChartData}
              margin={{ top: 20, right: 30, left: 35, bottom: 70 }}
              barCategoryGap={10}
              barGap={4}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12, fill: "#64748b" }}
                angle={-45}
                textAnchor="end"
                tickMargin={15}
                axisLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(value) => typeof value === 'number' ? formatValueSafely(value) : `${value}`}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={{ stroke: "#e2e8f0" }}
              />
              <ChartTooltip
                cursor={{ fill: 'rgba(224, 231, 255, 0.2)' }}
                content={
                  <ChartTooltipContent
                    labelKey="touchpoint"
                    formatter={(value, name) => {
                      if (name === 'percentage') return [`${typeof value === 'number' ? value.toFixed(2) : value}%`, 'Change'];
                      return [value ? value.toLocaleString() : '0', name];
                    }}
                  />
                }
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-xs font-medium">{value}</span>}
              />
              
              <Bar 
                dataKey="today" 
                name="Today" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              >
                {sortedChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.touchpoint)} />
                ))}
                <LabelList 
                  dataKey="today" 
                  position="top" 
                  formatter={(value: any) => formatValueSafely(value)}
                  style={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }}
                />
              </Bar>
              
              {comparison === 'yesterday' ? (
                <Bar 
                  dataKey="yesterday" 
                  name="Yesterday" 
                  fill="#94a3b8" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                >
                  {sortedChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-yesterday-${index}`} 
                      fill={getLighterColor(getBarColor(entry.touchpoint))}
                    />
                  ))}
                </Bar>
              ) : (
                <Bar 
                  dataKey="difference" 
                  name="Difference" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                >
                  {sortedChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-difference-${index}`} 
                      fill={entry.difference < 0 ? "#ef4444" : "#22C55E"}
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
                        return value < 0 ? formattedValue : `+${formattedValue}`;
                      }
                      return value?.toString() || '0';
                    }}
                    style={{ fontSize: 11, fontWeight: 500 }}
                  />
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      ) : (
        <div className="rounded-lg border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-2.5 px-3 font-medium text-gray-600">Time</th>
                <th className="text-left py-2.5 px-3 font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    <Smartphone size={14} />
                    <span>Touchpoint</span>
                  </div>
                </th>
                <th className="text-right py-2.5 px-3 font-medium text-gray-600">Today</th>
                <th className="text-right py-2.5 px-3 font-medium text-gray-600">Yesterday</th>
                <th className="text-right py-2.5 px-3 font-medium text-gray-600">Difference</th>
                <th className="text-right py-2.5 px-3 font-medium text-gray-600">Change</th>
              </tr>
            </thead>
            <tbody>
              {[...dataToUse].sort((a, b) => b.today - a.today).map((item, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-2.5 px-3">{item.time}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTouchpointIcon(item.touchpoint)}`}>
                      {chartConfig[item.touchpoint as keyof typeof chartConfig]?.label || item.touchpoint}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-medium">{item.today.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-gray-600">{item.yesterday.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-medium">
                    <span className={item.difference < 0 ? "text-red-600" : "text-green-600"}>
                      {item.difference < 0 ? "" : "+"}
                      {item.difference.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="ml-auto flex items-center gap-1">
                          {item.percentage < 0 ? (
                            <span className="flex items-center text-red-600">
                              <ArrowDownIcon size={14} />
                              {Math.abs(item.percentage).toFixed(2)}%
                            </span>
                          ) : (
                            <span className="flex items-center text-green-600">
                              <ArrowUpIcon size={14} />
                              {item.percentage.toFixed(2)}%
                            </span>
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Yesterday: {item.yesterday.toLocaleString()}</p>
                          <p>Difference: {item.difference.toLocaleString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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

export default TouchpointComparison;
