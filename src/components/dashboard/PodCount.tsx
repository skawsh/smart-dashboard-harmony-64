
import React from 'react';
import { ServerIcon } from 'lucide-react';

// Types for our data structure
interface RegionPod {
  region: string;
  count: number;
}

// Real data from the image
const podCounts: RegionPod[] = [
  { region: 'AM', count: 70 },
  { region: 'AP', count: 70 },
  { region: 'EU1', count: 70 },
  { region: 'EU2', count: 60 },
  { region: 'EU3', count: 80 },
  { region: 'EU4', count: 80 },
  { region: 'EU5', count: 70 },
];

const getCountColor = (count: number): string => {
  if (count >= 70) return 'text-success-600';
  if (count >= 50) return 'text-warning-600';
  return 'text-error-600';
};

const PodCount: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-blue-600">
        <ServerIcon size={16} />
        <span className="text-sm font-medium">Current Pod Count</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {podCounts.map((pod, index) => (
          <div key={index} className="region-pod animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="text-center">
              <div className="text-gray-600 font-medium mb-1">{pod.region}</div>
              <div className={`region-pod-count ${getCountColor(pod.count)}`}>{pod.count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodCount;
