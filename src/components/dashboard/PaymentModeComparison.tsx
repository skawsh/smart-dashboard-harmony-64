
import React, { useContext } from 'react';
import { ArrowDownIcon, ArrowUpIcon, CreditCardIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RegionContext } from '@/pages/Index';

interface PaymentComparisonData {
  time: string;
  country: string;
  payMode: string;
  today: number;
  yesterday: number;
  difference: number;
  percentage: number;
  impact: 'Medium' | 'Normal';
}

// Updated data from the provided image - All Instances
const paymentModeData: PaymentComparisonData[] = [
  { time: '02:00-08:00', country: 'CA', payMode: 'Adyen', today: 1187, yesterday: 3727, difference: -2540, percentage: -68.15, impact: 'Medium' },
  { time: '02:00-08:00', country: 'US', payMode: 'Adyen', today: 2149, yesterday: 4468, difference: -2319, percentage: -51.9, impact: 'Medium' },
  { time: '02:00-08:00', country: 'NL', payMode: 'Klarna', today: 1286, yesterday: 2976, difference: -1690, percentage: -56.79, impact: 'Medium' },
  { time: '02:00-08:00', country: 'US', payMode: 'Klarna', today: 463, yesterday: 1103, difference: -640, percentage: -58.02, impact: 'Medium' },
  { time: '02:00-08:00', country: 'MX', payMode: 'Adyen', today: 597, yesterday: 1213, difference: -616, percentage: -50.78, impact: 'Medium' },
  { time: '02:00-08:00', country: 'US', payMode: 'PayPal', today: 590, yesterday: 1185, difference: -595, percentage: -50.21, impact: 'Medium' },
  { time: '02:00-08:00', country: 'CA', payMode: 'PayPal', today: 243, yesterday: 674, difference: -431, percentage: -63.95, impact: 'Medium' },
  { time: '02:00-08:00', country: 'DE', payMode: 'GiftCard|pay_later', today: 89, yesterday: 261, difference: -172, percentage: -65.9, impact: 'Medium' },
  { time: '02:00-08:00', country: 'NL', payMode: 'Adyen', today: 81, yesterday: 179, difference: -98, percentage: -54.75, impact: 'Medium' },
  { time: '02:00-08:00', country: 'US', payMode: 'GiftCard', today: 23, yesterday: 69, difference: -46, percentage: -66.67, impact: 'Medium' },
  { time: '02:00-08:00', country: 'DE', payMode: 'Klarna', today: 8815, yesterday: 17288, difference: -8473, percentage: -49.01, impact: 'Normal' },
  { time: '02:00-08:00', country: 'DE', payMode: 'PayPal', today: 3539, yesterday: 6025, difference: -2486, percentage: -41.26, impact: 'Normal' },
  { time: '02:00-08:00', country: 'US', payMode: 'applepay', today: 1370, yesterday: 2722, difference: -1352, percentage: -49.67, impact: 'Normal' },
  { time: '02:00-08:00', country: 'AT', payMode: 'Klarna', today: 1130, yesterday: 1983, difference: -853, percentage: -43.02, impact: 'Normal' },
  { time: '02:00-08:00', country: 'NL', payMode: 'IDEAL2', today: 778, yesterday: 1466, difference: -688, percentage: -46.93, impact: 'Normal' },
];

// EU1 region-specific data extracted from the image
const EU1PaymentModeData: PaymentComparisonData[] = [
  { time: '02:00-08:00', country: 'FR', payMode: 'PayPal', today: 173, yesterday: 195, difference: -22, percentage: -11.28, impact: 'Normal' },
  { time: '02:00-08:00', country: 'FR', payMode: 'Adyen', today: 42, yesterday: 58, difference: -16, percentage: -27.59, impact: 'Medium' },
  { time: '02:00-08:00', country: 'FR', payMode: 'Klarna', today: 4, yesterday: 5, difference: -1, percentage: -20.00, impact: 'Medium' },
  { time: '02:00-08:00', country: 'IE', payMode: 'GiftCard', today: 2, yesterday: 6, difference: -4, percentage: -66.67, impact: 'Medium' },
  { time: '02:00-08:00', country: 'FR', payMode: 'GiftCard', today: 7, yesterday: 7, difference: 0, percentage: 0.00, impact: 'Normal' },
  { time: '02:00-08:00', country: 'GB', payMode: 'Adyen', today: 46, yesterday: 43, difference: 3, percentage: 6.98, impact: 'Normal' },
  { time: '02:00-08:00', country: 'FR', payMode: 'applepay', today: 26, yesterday: 25, difference: 1, percentage: 4.00, impact: 'Normal' },
];

// Define fixed colors for each payment method
const PAYMENT_COLORS: Record<string, { bg: string, text: string }> = {
  'Adyen': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'PayPal': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Klarna': { bg: 'bg-pink-100', text: 'text-pink-700' },
  'IDEAL2': { bg: 'bg-teal-100', text: 'text-teal-700' },
  'GiftCard': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'GiftCard|pay_later': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'applepay': { bg: 'bg-slate-100', text: 'text-slate-700' },
};

const getPaymentColor = (payMode: string): string => {
  // Extract the base payment type for hybrid types (e.g., GiftCard|pay_later => GiftCard)
  const basePayMode = payMode.split('|')[0];
  
  // Return colors for the payment method or default if not found
  return `${PAYMENT_COLORS[basePayMode]?.bg || 'bg-gray-100'} ${PAYMENT_COLORS[basePayMode]?.text || 'text-gray-700'}`;
};

const PaymentModeComparison: React.FC = () => {
  const { selectedRegion } = useContext(RegionContext);
  
  // Select data based on region
  const dataToDisplay = selectedRegion === 'EU1' ? EU1PaymentModeData : paymentModeData;
  
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="h-[500px]">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="font-medium text-gray-600 w-[60px]">Country</TableHead>
              <TableHead className="font-medium text-gray-600 w-[110px]">
                <div className="flex items-center gap-1">
                  <CreditCardIcon size={14} />
                  <span>Payment</span>
                </div>
              </TableHead>
              <TableHead className="text-right font-medium text-gray-600 w-[90px]">Today</TableHead>
              <TableHead className="text-right font-medium text-gray-600 w-[90px]">Yesterday</TableHead>
              <TableHead className="text-right font-medium text-gray-600 w-[70px]">Diff</TableHead>
              <TableHead className="text-right font-medium text-gray-600 w-[90px]">Change</TableHead>
              <TableHead className="text-center font-medium text-gray-600 w-[70px]">Impact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataToDisplay.map((item, index) => (
              <TableRow key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                <TableCell className="font-medium py-1.5">{item.country}</TableCell>
                <TableCell className="py-1.5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(item.payMode)}`}>
                          {item.payMode.length > 10 ? `${item.payMode.substring(0, 8)}...` : item.payMode}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.payMode}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-right py-1.5">{item.today.toLocaleString()}</TableCell>
                <TableCell className="text-right py-1.5">{item.yesterday.toLocaleString()}</TableCell>
                <TableCell className="text-right py-1.5">
                  <span className={
                    item.difference < 0 
                      ? "text-error-600" 
                      : item.difference > 0 
                        ? "text-green-600" 
                        : "text-gray-600"
                  }>
                    {item.difference === 0 
                      ? '0' 
                      : `${item.difference > 0 ? '+' : ''}${item.difference.toLocaleString()}`}
                  </span>
                </TableCell>
                <TableCell className="text-right py-1.5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="ml-auto flex items-center gap-1">
                        {item.percentage < 0 ? (
                          <span className="flex items-center text-error-600">
                            <ArrowDownIcon size={14} />
                            {Math.abs(item.percentage).toFixed(1)}%
                          </span>
                        ) : item.percentage > 0 ? (
                          <span className="flex items-center text-green-600">
                            <ArrowUpIcon size={14} />
                            {item.percentage.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-gray-600">0.00%</span>
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {item.percentage < 0 
                            ? `Order decrease of ${Math.abs(item.percentage).toFixed(2)}% compared to yesterday`
                            : item.percentage > 0
                              ? `Order increase of ${item.percentage.toFixed(2)}% compared to yesterday`
                              : 'No change compared to yesterday'
                          }
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-center py-1.5">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.impact === 'Medium' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.impact}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default PaymentModeComparison;
