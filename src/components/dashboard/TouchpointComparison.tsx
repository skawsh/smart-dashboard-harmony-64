
import React from 'react';
import { ArrowDownIcon, Smartphone } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TouchpointData {
  time: string;
  country: string; 
  touchpoint: string;
  today: number;
  yesterday: number;
  difference: number;
  percentage: number;
}

// Real data from the image
const touchpointData: TouchpointData[] = [
  { time: '02:00-08:00', country: 'DE', touchpoint: 'Mobile', today: 22927, yesterday: 33056, difference: -10129, percentage: -30.64, },
  { time: '02:00-08:00', country: 'US', touchpoint: 'AndroidApp', today: 6184, yesterday: 12536, difference: -6352, percentage: -50.67, },
  { time: '02:00-08:00', country: 'CA', touchpoint: 'Mobile', today: 7403, yesterday: 8410, difference: -1007, percentage: -11.97, },
  { time: '02:00-08:00', country: 'NL', touchpoint: 'Desktop', today: 2709, yesterday: 3515, difference: -806, percentage: -22.93, },
  { time: '02:00-08:00', country: 'AT', touchpoint: 'Tablet', today: 105, yesterday: 211, difference: -106, percentage: -50.24, },
];

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
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const TouchpointComparison: React.FC = () => {
  return (
    <div className="w-full">
      <div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-medium text-gray-600">Country</th>
              <th className="text-left py-2 font-medium text-gray-600">
                <div className="flex items-center gap-1">
                  <Smartphone size={14} />
                  <span>Touchpoint</span>
                </div>
              </th>
              <th className="text-right py-2 font-medium text-gray-600">Today</th>
              <th className="text-right py-2 font-medium text-gray-600">Change</th>
            </tr>
          </thead>
          <tbody>
            {touchpointData.map((item, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="py-2.5 font-medium">{item.country}</td>
                <td className="py-2.5">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTouchpointIcon(item.touchpoint)}`}>
                    {item.touchpoint}
                  </span>
                </td>
                <td className="py-2.5 text-right">{item.today.toLocaleString()}</td>
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
    </div>
  );
};

export default TouchpointComparison;
