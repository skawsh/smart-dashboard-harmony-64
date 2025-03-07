
import React, { useState } from 'react';
import { ArrowDownIcon, Smartphone, RefreshCcw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Cell, LabelList } from 'recharts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface TouchpointData {
  time: string;
  country: string;
  touchpoint: string;
  today: number;
  yesterday: number;
  difference: number;
  percentage: number;
}

// Updated data from the image
const touchpointData: TouchpointData[] = [
  { time: '02:00-08:00', country: 'DE', touchpoint: 'IosApp', today: 22927, yesterday: 39098, difference: -16171, percentage: -41.36 },
  { time: '02:00-08:00', country: 'US', touchpoint: 'AndroidApp', today: 8184, yesterday: 12536, difference: -4352, percentage: -34.72 },
  { time: '02:00-08:00', country: 'CA', touchpoint: 'Mobile', today: 7403, yesterday: 8410, difference: -1007, percentage: -11.97 },
  { time: '02:00-08:00', country: 'NL', touchpoint: 'Desktop', today: 2709, yesterday: 3515, difference: -806, percentage: -22.93 },
  { time: '02:00-08:00', country: 'AT', touchpoint: 'Tablet', today: 101, yesterday: 136, difference: -35, percentage: -25.74 },
];

// Chart configuration for colors and labels
const chartConfig = {
  IosApp: { color: '#6366f1', label: 'iOS App' },
  AndroidApp: { color: '#10b981', label: 'Android App' },
  Mobile: { color: '#3b82f6', label: 'Mobile' },
  Desktop: { color: '#8b5cf6', label: 'Desktop' },
  Tablet: { color: '#f59e0b', label: 'Tablet' },
};

const getTouchpointIcon = (touchpoint: string): string => {
  switch (touchpoint) {
    case 'Mobile':
      return 'bg-blue-50 text-blue-600';
    case 'AndroidApp':
      return 'bg-green-50 text-green-600';
    case 'Desktop':
      return 'bg-purple-50 text-purple-600';
    case 'Tablet':
      return 'bg-orange-50 text-orange-600';
    case 'IosApp':
      return 'bg-indigo-50 text-indigo-600';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getBarColor = (touchpoint: string): string => {
  return chartConfig[touchpoint as keyof typeof chartConfig]?.color || '#94a3b8';
};

const TouchpointComparison: React.FC = () => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [comparison, setComparison] = useState<'yesterday' | 'difference'>('yesterday');

  // Transform data for the chart
  const chartData = touchpointData.map(item => ({
    touchpoint: item.touchpoint,
    country: item.country,
    today: item.today,
    yesterday: item.yesterday,
    difference: item.difference,
    percentage: item.percentage,
    name: `${item.touchpoint} (${item.country})`,
  }));

  // Function to format values in the chart safely
  const formatValueSafely = (value: number | string | undefined): string => {
    if (typeof value === 'number') {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value?.toString() || '0';
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4 gap-2">
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

      {viewMode === 'chart' ? (
        <ChartContainer
          className="w-full h-[350px]"
          config={chartConfig}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 30, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                tickMargin={15}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => typeof value === 'number' ? `${(value / 1000).toFixed(0)}k` : `${value}`}
              />
              <ChartTooltip
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
              <Legend verticalAlign="top" height={36} />
              
              <Bar 
                dataKey="today" 
                name="Today" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.touchpoint)} />
                ))}
                <LabelList 
                  dataKey="today" 
                  position="top" 
                  formatter={(value: any) => formatValueSafely(value)}
                  style={{ fontSize: 11, fill: '#6b7280' }}
                />
              </Bar>
              
              {comparison === 'yesterday' ? (
                <Bar 
                  dataKey="yesterday" 
                  name="Yesterday" 
                  fill="#94a3b8" 
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-yesterday-${index}`} 
                      fill={`${getBarColor(entry.touchpoint)}80`} 
                    />
                  ))}
                </Bar>
              ) : (
                <Bar 
                  dataKey="difference" 
                  name="Difference" 
                  fill="#ef4444" 
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-difference-${index}`} 
                      fill="#ef4444" 
                    />
                  ))}
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      ) : (
        <div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-medium text-gray-600">Time</th>
                <th className="text-left py-2 font-medium text-gray-600">
                  <div className="flex items-center gap-1">
                    <Smartphone size={14} />
                    <span>Touchpoint</span>
                  </div>
                </th>
                <th className="text-right py-2 font-medium text-gray-600">Today</th>
                <th className="text-right py-2 font-medium text-gray-600">Yesterday</th>
                <th className="text-right py-2 font-medium text-gray-600">Difference</th>
                <th className="text-right py-2 font-medium text-gray-600">Change</th>
              </tr>
            </thead>
            <tbody>
              {touchpointData.map((item, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-2.5">{item.time}</td>
                  <td className="py-2.5">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTouchpointIcon(item.touchpoint)}`}>
                      {item.touchpoint}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">{item.today.toLocaleString()}</td>
                  <td className="py-2.5 text-right">{item.yesterday.toLocaleString()}</td>
                  <td className="py-2.5 text-right">{item.difference.toLocaleString()}</td>
                  <td className="py-2.5 text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="ml-auto flex items-center gap-1 text-error-600">
                          <ArrowDownIcon size={14} />
                          {Math.abs(item.percentage).toFixed(2)}%
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
