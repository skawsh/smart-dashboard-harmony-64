
import React, { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, BarChart3Icon, LayoutListIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Cell, LabelList } from 'recharts';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';

interface OrderComparisonData {
  country: string;
  today: number;
  yesterday: number;
  difference: number;
  percentage: number;
}

// Updated data from the image
const orderData: OrderComparisonData[] = [
  { country: 'DE', today: 13155, yesterday: 24790, difference: -11635, percentage: -46.93 },
  { country: 'US', today: 4661, yesterday: 9709, difference: -5048, percentage: -51.99 },
  { country: 'CA', today: 1473, yesterday: 4539, difference: -3066, percentage: -67.55 },
  { country: 'NL', today: 2156, yesterday: 4668, difference: -2512, percentage: -53.81 },
  { country: 'AT', today: 1618, yesterday: 2763, difference: -1145, percentage: -41.44 },
];

// Chart colors configuration
const chartConfig = {
  DE: { color: '#4361EE', label: 'Germany' },
  US: { color: '#F72585', label: 'United States' },
  CA: { color: '#7209B7', label: 'Canada' },
  NL: { color: '#4CC9F0', label: 'Netherlands' },
  AT: { color: '#F7B801', label: 'Austria' },
};

// Helper function to get a lighter version of a color for the "Yesterday" bars
const getLighterColor = (color: string): string => {
  return `${color}80`; // 80 is the hex for 50% opacity
};

const OrderMetrics: React.FC = () => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [comparison, setComparison] = useState<'yesterday' | 'difference'>('yesterday');

  // Transform and sort data for the chart
  const chartData = [...orderData]
    .sort((a, b) => b.today - a.today)
    .map(item => ({
      ...item,
      countryName: chartConfig[item.country as keyof typeof chartConfig]?.label || item.country,
      displayName: `${item.country} (${chartConfig[item.country as keyof typeof chartConfig]?.label || item.country})`,
    }));

  // Function to format values in the chart safely
  const formatValueSafely = (value: number | string | undefined): string => {
    if (typeof value === 'number') {
      return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();
    }
    return value?.toString() || '0';
  };

  // Get bar color based on country code
  const getBarColor = (country: string): string => {
    return chartConfig[country as keyof typeof chartConfig]?.color || '#94a3b8';
  };

  // Calculate the total numbers for the chart
  const totalToday = chartData.reduce((sum, item) => sum + item.today, 0);
  const totalYesterday = chartData.reduce((sum, item) => sum + item.yesterday, 0);
  const totalDifference = totalToday - totalYesterday;
  const totalPercentage = (totalDifference / totalYesterday) * 100;

  return (
    <div className="w-full">
      <div className="mb-3 flex justify-between items-center">
        <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
          <BarChart3Icon size={12} />
          <span>02:00 - 08:00 CET</span>
        </div>
        <div className="flex items-center gap-3">
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
            {viewMode === 'chart' ? <LayoutListIcon size={14} /> : <BarChart3Icon size={14} />}
            {viewMode === 'chart' ? 'Table View' : 'Chart View'}
          </Button>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium">Total Orders Today:</span> 
          <span className="ml-1 font-bold text-blue-600">
            {totalToday.toLocaleString()}
          </span>
          <span className="mx-2 text-gray-400">vs</span>
          <span className="font-medium">Yesterday:</span>
          <span className="ml-1 font-medium text-gray-600">
            {totalYesterday.toLocaleString()}
          </span>
          <span className="ml-2 flex items-center gap-0.5 text-red-600 font-medium">
            <ArrowDownIcon size={14} />
            {Math.abs(totalPercentage).toFixed(2)}%
          </span>
        </div>
      </div>
      
      {viewMode === 'chart' ? (
        <ChartContainer
          className="w-full h-[350px]"
          config={chartConfig}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 35, bottom: 40 }}
              barCategoryGap={15}
              barGap={comparison === 'difference' ? 0 : 4}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="country"
                tick={{ fontSize: 13, fill: "#64748b", fontWeight: 500 }}
                axisLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(value) => typeof value === 'number' ? `${(value / 1000).toFixed(0)}k` : `${value}`}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={{ stroke: "#e2e8f0" }}
              />
              <ChartTooltip
                cursor={{ fill: 'rgba(224, 231, 255, 0.2)' }}
                content={
                  <ChartTooltipContent
                    labelKey="country"
                    formatter={(value, name) => {
                      if (name === 'percentage') return [`${typeof value === 'number' ? value.toFixed(2) : value}%`, 'Change'];
                      if (name === 'countryName') return [value, 'Country'];
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
                radius={[4, 4, 0, 0]}
                maxBarSize={45}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.country)} />
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
                  radius={[4, 4, 0, 0]}
                  maxBarSize={45}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-yesterday-${index}`} 
                      fill={getLighterColor(getBarColor(entry.country))}
                    />
                  ))}
                </Bar>
              ) : (
                <Bar 
                  dataKey="difference" 
                  name="Difference" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={45}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-difference-${index}`} 
                      fill="#ef4444"
                    />
                  ))}
                  <LabelList 
                    dataKey="difference" 
                    position="top"
                    formatter={(value: any) => {
                      if (typeof value === 'number') {
                        const formattedValue = Math.abs(value) >= 1000 
                          ? `-${(Math.abs(value) / 1000).toFixed(1)}k` 
                          : `-${Math.abs(value)}`;
                        return formattedValue;
                      }
                      return value?.toString() || '0';
                    }}
                    style={{ fontSize: 11, fontWeight: 500, fill: '#ef4444' }}
                  />
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      ) : (
        <div>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100">
                <TableHead className="font-medium text-gray-600">Country</TableHead>
                <TableHead className="text-right font-medium text-gray-600">Today</TableHead>
                <TableHead className="text-right font-medium text-gray-600">Yesterday</TableHead>
                <TableHead className="text-right font-medium text-gray-600">Difference</TableHead>
                <TableHead className="text-right font-medium text-gray-600">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chartData.map((item, index) => (
                <TableRow 
                  key={index} 
                  className={`border-b border-gray-50 hover:bg-gray-50/50 ${item.country === 'CA' ? 'bg-red-50' : ''}`}
                >
                  <TableCell className="font-medium">
                    <span 
                      className="flex items-center gap-2"
                      style={{ color: getBarColor(item.country) }}
                    >
                      <span 
                        className="inline-block w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getBarColor(item.country) }}
                      ></span>
                      {item.country} <span className="text-xs text-gray-500">({chartConfig[item.country as keyof typeof chartConfig]?.label})</span>
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{item.today.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{item.yesterday.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium text-red-600">{item.difference.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className={`ml-auto flex items-center gap-1 ${item.country === 'CA' ? 'text-red-600 font-semibold' : 'text-error-600'}`}>
                          <ArrowDownIcon size={14} />
                          {Math.abs(item.percentage).toFixed(2)}%
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Order decrease of {Math.abs(item.percentage).toFixed(2)}% compared to yesterday</p>
                          <p className="text-xs text-gray-400">Difference: {item.difference.toLocaleString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default OrderMetrics;
