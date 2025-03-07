
import React from 'react';
import { CheckCircleIcon, ShieldCheckIcon } from 'lucide-react';

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
      
      <div className="overflow-x-auto">
        <table className="data-table text-center text-xs">
          <thead>
            <tr>
              <th className="rounded-tl-lg text-left">Time Slot</th>
              <th>Adyen</th>
              <th>Apple Pay</th>
              <th>Cybersource</th>
              <th>DHL</th>
              <th>Klarna</th>
              <th>Metro</th>
              <th>PayPal</th>
              <th>Router</th>
              <th>SAFC</th>
              <th>SAFP</th>
              <th className="rounded-tr-lg">Wallet</th>
            </tr>
          </thead>
          <tbody>
            {successRateData.map((row, index) => (
              <tr key={index}>
                <td className="font-medium text-left">{row.timeSlot}</td>
                <td className={getPercentageStyle(row.adyen)}>{row.adyen}</td>
                <td className={getPercentageStyle(row.applepay)}>{row.applepay}</td>
                <td className={getPercentageStyle(row.cybersource)}>{row.cybersource}</td>
                <td className={getPercentageStyle(row.dhl)}>{row.dhl}</td>
                <td className={getPercentageStyle(row.klarna)}>{row.klarna}</td>
                <td className={getPercentageStyle(row.metro)}>{row.metro}</td>
                <td className={getPercentageStyle(row.paypal)}>{row.paypal}</td>
                <td className={getPercentageStyle(row.router)}>{row.router}</td>
                <td className={getPercentageStyle(row.safc)}>{row.safc}</td>
                <td className={getPercentageStyle(row.safp)}>{row.safp}</td>
                <td className={getPercentageStyle(row.wallet)}>{row.wallet}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default SuccessRate;
