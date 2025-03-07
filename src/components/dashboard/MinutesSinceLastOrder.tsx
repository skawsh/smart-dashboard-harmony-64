
import React from 'react';
import { ClockIcon, ArrowUpDownIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Enhanced data model that matches the image
interface RegionData {
  region: string;
  adyen: number | 'NaN';
  cod: number | 'NaN';
  ideal2: number | 'NaN';
  klarna: number | 'NaN';
  paypal: number | 'NaN';
  rupay: number | 'NaN';
  applepay: number | 'NaN';
  razorpay_card: number | 'NaN';
  razorpay_netbanking: number | 'NaN';
  razorpay_upi: number | 'NaN';
}

// Updated data from the image
const regionData: RegionData[] = [
  { region: 'AM1', adyen: 1, cod: 'NaN', ideal2: 'NaN', klarna: 6, paypal: 2, rupay: 'NaN', applepay: 0, razorpay_card: 'NaN', razorpay_netbanking: 'NaN', razorpay_upi: 'NaN' },
  { region: 'AP1', adyen: 2, cod: 2, ideal2: 'NaN', klarna: 8, paypal: 2, rupay: 2, applepay: 'NaN', razorpay_card: 0, razorpay_netbanking: 13, razorpay_upi: 0 },
  { region: 'EU1', adyen: 0, cod: 'NaN', ideal2: 'NaN', klarna: 7, paypal: 3, rupay: 'NaN', applepay: 0, razorpay_card: 'NaN', razorpay_netbanking: 'NaN', razorpay_upi: 'NaN' },
  { region: 'EU2', adyen: 0, cod: 0, ideal2: 'NaN', klarna: 1, paypal: 3, rupay: 'NaN', applepay: 'NaN', razorpay_card: 'NaN', razorpay_netbanking: 'NaN', razorpay_upi: 'NaN' },
  { region: 'EU3', adyen: 0, cod: 'NaN', ideal2: 'NaN', klarna: 0, paypal: 0, rupay: 'NaN', applepay: 0, razorpay_card: 'NaN', razorpay_netbanking: 'NaN', razorpay_upi: 'NaN' },
  { region: 'EU4', adyen: 7, cod: 13, ideal2: 0, klarna: 0, paypal: 3, rupay: 'NaN', applepay: 1, razorpay_card: 'NaN', razorpay_netbanking: 'NaN', razorpay_upi: 'NaN' },
  { region: 'EU5', adyen: 5, cod: 0, ideal2: 'NaN', klarna: 43, paypal: 4, rupay: 'NaN', applepay: 0, razorpay_card: 'NaN', razorpay_netbanking: 'NaN', razorpay_upi: 'NaN' },
];

// Get a color class based on the value (minutes)
const getTimeColor = (value: number | 'NaN'): string => {
  if (value === 'NaN') return '';
  
  if (value <= 5) return 'bg-success-100 text-success-700';
  if (value <= 15) return 'bg-warning-100 text-warning-700';
  return 'bg-error-100 text-error-700';
};

// Format display value
const formatValue = (value: number | 'NaN'): string => {
  if (value === 'NaN') return 'NaN';
  return String(value);
};

const MinutesSinceLastOrder: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-4 text-blue-600">
        <ClockIcon size={16} />
        <span className="text-sm font-medium">Real-time monitoring of time since the last successful order</span>
      </div>
      
      <div className="bg-white/80 rounded-lg shadow-sm overflow-auto">
        <Table className="border border-gray-100">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="whitespace-nowrap font-semibold text-blue-700 py-3">
                Instance <ArrowUpDownIcon size={14} className="inline ml-1" />
              </TableHead>
              <TableHead className="whitespace-nowrap font-semibold text-blue-700">
                Adyen <ArrowUpDownIcon size={14} className="inline ml-1" />
              </TableHead>
              <TableHead className="whitespace-nowrap font-semibold text-blue-700">
                COD <ArrowUpDownIcon size={14} className="inline ml-1" />
              </TableHead>
              <TableHead className="whitespace-nowrap font-semibold text-blue-700">
                IDEAL2 <ArrowUpDownIcon size={14} className="inline ml-1" />
              </TableHead>
              <TableHead className="whitespace-nowrap font-semibold text-blue-700">
                Klarna <ArrowUpDownIcon size={14} className="inline ml-1" />
              </TableHead>
              <TableHead className="whitespace-nowrap font-semibold text-blue-700">
                PayPal <ArrowUpDownIcon size={14} className="inline ml-1" />
              </TableHead>
              <TableHead className="whitespace-nowrap font-semibold text-blue-700">
                Rupay <ArrowUpDownIcon size={14} className="inline ml-1" />
              </TableHead>
              <TableHead className="whitespace-nowrap font-semibold text-blue-700">
                applepay <ArrowUpDownIcon size={14} className="inline ml-1" />
              </TableHead>
              <TableHead className="whitespace-nowrap font-semibold text-blue-700">
                razorpay_card <ArrowUpDownIcon size={14} className="inline ml-1" />
              </TableHead>
              <TableHead className="whitespace-nowrap font-semibold text-blue-700">
                razorpay_netbanking <ArrowUpDownIcon size={14} className="inline ml-1" />
              </TableHead>
              <TableHead className="whitespace-nowrap font-semibold text-blue-700">
                razorpay_upi <ArrowUpDownIcon size={14} className="inline ml-1" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regionData.map((row, index) => (
              <TableRow 
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <TableCell className="font-medium text-blue-600">{row.region}</TableCell>
                <TableCell className={getTimeColor(row.adyen)}>{formatValue(row.adyen)}</TableCell>
                <TableCell className={getTimeColor(row.cod)}>{formatValue(row.cod)}</TableCell>
                <TableCell className={getTimeColor(row.ideal2)}>{formatValue(row.ideal2)}</TableCell>
                <TableCell className={getTimeColor(row.klarna)}>{formatValue(row.klarna)}</TableCell>
                <TableCell className={getTimeColor(row.paypal)}>{formatValue(row.paypal)}</TableCell>
                <TableCell className={getTimeColor(row.rupay)}>{formatValue(row.rupay)}</TableCell>
                <TableCell className={getTimeColor(row.applepay)}>{formatValue(row.applepay)}</TableCell>
                <TableCell className={getTimeColor(row.razorpay_card)}>{formatValue(row.razorpay_card)}</TableCell>
                <TableCell className={getTimeColor(row.razorpay_netbanking)}>{formatValue(row.razorpay_netbanking)}</TableCell>
                <TableCell className={getTimeColor(row.razorpay_upi)}>{formatValue(row.razorpay_upi)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Legend for the colors */}
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

export default MinutesSinceLastOrder;
