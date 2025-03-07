
import React from 'react';
import { ArrowDownIcon, BarChart3Icon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface OrderComparisonData {
  country: string;
  today: number;
  yesterday: number;
  difference: number;
  percentage: number;
}

const orderData: OrderComparisonData[] = [
  { country: 'DE', today: 5165, yesterday: 24050, difference: -18885, percentage: -78.53 },
  { country: 'US', today: 4661, yesterday: 9709, difference: -5048, percentage: -51.99 },
  { country: 'CA', today: 1373, yesterday: 4339, difference: -2966, percentage: -68.36 },
  { country: 'NL', today: 2166, yesterday: 4668, difference: -2502, percentage: -53.61 },
  { country: 'AT', today: 1616, yesterday: 2762, difference: -1146, percentage: -41.49 },
];

const OrderMetrics: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-3">
        <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full mb-2">
          <BarChart3Icon size={12} />
          <span>02:00 - 08:00 CET</span>
        </div>
      </div>
      
      <div>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="font-medium text-gray-600">Country</TableHead>
              <TableHead className="text-right font-medium text-gray-600">Today</TableHead>
              <TableHead className="text-right font-medium text-gray-600">Yesterday</TableHead>
              <TableHead className="text-right font-medium text-gray-600">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData.map((item, index) => (
              <TableRow key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                <TableCell className="font-medium">{item.country}</TableCell>
                <TableCell className="text-right">{item.today.toLocaleString()}</TableCell>
                <TableCell className="text-right">{item.yesterday.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="ml-auto flex items-center gap-1 text-error-600">
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
    </div>
  );
};

export default OrderMetrics;
