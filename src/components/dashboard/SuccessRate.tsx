
import React from 'react';
import { CheckCircleIcon, ShieldCheckIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Types for our data structure
interface SuccessRateData {
  timeSlot: string;
  adyen: string;
  applepay: string;
  cybersource: string;
  dhl: string;
  klarna: string;
  metro: string;
  paypal: string;
  router: string;
  safc: string;
  safp: string;
  wallet: string;
}

// Real data from the image
const successRateData: SuccessRateData[] = [
  { 
    timeSlot: '07:03 02:00 - 07:03 03:00', 
    adyen: '100.00%', 
    applepay: '99.91%', 
    cybersource: '99.97%', 
    dhl: '100.00%', 
    klarna: '96.66%', 
    metro: '99.88%', 
    paypal: '100.00%', 
    router: '99.46%', 
    safc: '100.00%', 
    safp: '100.00%', 
    wallet: '99.97%'
  },
  { 
    timeSlot: '07:03 03:00 - 07:03 04:00', 
    adyen: '100.00%', 
    applepay: '98.90%', 
    cybersource: '100.00%', 
    dhl: '100.00%', 
    klarna: '96.60%', 
    metro: '99.50%', 
    paypal: '100.00%', 
    router: '99.53%', 
    safc: '100.00%', 
    safp: '100.00%', 
    wallet: '99.99%'
  }
];

// Function to style the percentage cells based on their values
const getPercentageStyle = (percentage: string): string => {
  const value = parseFloat(percentage);
  if (value >= 99.5) return 'bg-success-50 text-success-700';
  if (value >= 97) return 'bg-warning-50 text-warning-700';
  return 'bg-error-50 text-error-700';
};

const SuccessRate: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-green-600">
        <ShieldCheckIcon size={16} />
        <span className="text-sm font-medium">Success Rate - Based on Third Party</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {successRateData.map((row, index) => (
          <div key={index} className="bg-white/80 p-3 rounded-lg shadow-sm">
            <div className="text-xs font-medium mb-2 text-gray-700">{row.timeSlot}</div>
            <div className="grid grid-cols-2 gap-2">
              <ServiceSuccessRate name="Adyen" value={row.adyen} />
              <ServiceSuccessRate name="ApplePay" value={row.applepay} />
              <ServiceSuccessRate name="Cybersource" value={row.cybersource} />
              <ServiceSuccessRate name="DHL" value={row.dhl} />
              <ServiceSuccessRate name="Klarna" value={row.klarna} />
              <ServiceSuccessRate name="Metro" value={row.metro} />
              <ServiceSuccessRate name="PayPal" value={row.paypal} />
              <ServiceSuccessRate name="Router" value={row.router} />
              <ServiceSuccessRate name="SAFC" value={row.safc} />
              <ServiceSuccessRate name="SAFP" value={row.safp} />
              <ServiceSuccessRate name="Wallet" value={row.wallet} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-4 mt-3 text-xs text-gray-600 justify-end">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-success-100 border border-success-500 rounded-full"></div>
          <span>&gt; 99.5%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-warning-100 border border-warning-500 rounded-full"></div>
          <span>97% - 99.5%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-error-100 border border-error-500 rounded-full"></div>
          <span>&lt; 97%</span>
        </div>
      </div>
    </div>
  );
};

const ServiceSuccessRate = ({ name, value }: { name: string, value: string }) => {
  const style = getPercentageStyle(value);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex justify-between items-center p-1.5 rounded text-xs">
            <span className="font-medium">{name}</span>
            <span className={`px-1.5 py-0.5 rounded ${style}`}>{value}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name} Success Rate: {value}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SuccessRate;
