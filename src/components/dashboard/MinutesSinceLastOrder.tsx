
import React from 'react';
import { ClockIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Types for our data structure
interface RegionData {
  region: string;
  adyen: string | number;
  cod: string | number;
  ideal2: string | number;
  klarna: string | number;
  paypal: string | number;
  runway: string | number;
  applepay: string | number;
  giftcard_idw: string | number;
  giftcard_dp: string | number;
  giftcard_sat: string | number;
}

// Real data from the image
const regionData: RegionData[] = [
  { region: 'AM', adyen: 'null', cod: 'null', ideal2: 6, klarna: 2, paypal: 'null', runway: 'null', applepay: 'null', giftcard_idw: 'null', giftcard_dp: 16, giftcard_sat: 'null' },
  { region: 'AP1', adyen: 2, cod: 'null', ideal2: 5, klarna: 2, paypal: 2, runway: 'null', applepay: 0, giftcard_idw: 'null', giftcard_dp: 0, giftcard_sat: 'null' },
  { region: 'EU1', adyen: 0, cod: 'null', ideal2: 7, klarna: 3, paypal: 'null', runway: 0, applepay: 'null', giftcard_idw: 'null', giftcard_dp: 'null', giftcard_sat: 'null' },
  { region: 'EU2', adyen: 0, cod: 'null', ideal2: 1, klarna: 3, paypal: 'null', runway: 0, applepay: 'null', giftcard_idw: 'null', giftcard_dp: 'null', giftcard_sat: 'null' },
  { region: 'EU3', adyen: 0, cod: 'null', ideal2: 0, klarna: 0, paypal: 'null', runway: 0, applepay: 'null', giftcard_idw: 'null', giftcard_dp: 'null', giftcard_sat: 'null' },
  { region: 'EU4', adyen: 7, cod: 13, ideal2: 0, klarna: 0, paypal: 3, runway: 1, applepay: 'null', giftcard_idw: 'null', giftcard_dp: 'null', giftcard_sat: 'null' },
  { region: 'EU5', adyen: 5, cod: 0, ideal2: 43, klarna: 4, paypal: 'null', runway: 0, applepay: 'null', giftcard_idw: 'null', giftcard_dp: 'null', giftcard_sat: 'null' },
];

// Get a color class based on the value (minutes)
const getTimeColor = (value: string | number): string => {
  if (value === 'null' || value === null) return 'text-gray-400';
  const minutes = Number(value);
  if (isNaN(minutes)) return 'text-gray-400';
  
  if (minutes <= 5) return 'bg-success-100 text-success-700';
  if (minutes <= 15) return 'bg-warning-100 text-warning-700';
  return 'bg-error-100 text-error-700';
};

const formatValue = (value: string | number): string => {
  if (value === 'null' || value === null) return '-';
  return String(value);
};

const MinutesSinceLastOrder: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-blue-600">
        <ClockIcon size={16} />
        <span className="text-sm font-medium">Minutes since last order (Payment mode wise)</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regionData.map((row, index) => (
          <div key={index} className="bg-white/80 p-3 rounded-lg shadow-sm">
            <div className="text-sm font-medium mb-2 flex items-center justify-center bg-blue-50 text-blue-700 py-1 rounded">
              Region: {row.region}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <PaymentTime label="Adyen" value={row.adyen} />
              <PaymentTime label="COD" value={row.cod} />
              <PaymentTime label="IDEAL2" value={row.ideal2} />
              <PaymentTime label="Klarna" value={row.klarna} />
              <PaymentTime label="PayPal" value={row.paypal} />
              <PaymentTime label="Runway" value={row.runway} />
              <PaymentTime label="ApplePay" value={row.applepay} />
              <PaymentTime label="GC_idw" value={row.giftcard_idw} />
              <PaymentTime label="GC_dp" value={row.giftcard_dp} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-4 mt-3 text-xs text-gray-600 justify-end">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-success-500 rounded-full"></div>
          <span>&lt; 5 min</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
          <span>5-15 min</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-error-500 rounded-full"></div>
          <span>&gt; 15 min</span>
        </div>
      </div>
    </div>
  );
};

const PaymentTime = ({ label, value }: { label: string, value: string | number }) => {
  const colorClass = getTimeColor(value);
  const formattedValue = formatValue(value);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex justify-between items-center p-1.5 rounded border border-gray-100 hover:border-gray-200">
            <span className="text-xs font-medium">{label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${colorClass}`}>{formattedValue}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}: {formattedValue} minutes since last order</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MinutesSinceLastOrder;
