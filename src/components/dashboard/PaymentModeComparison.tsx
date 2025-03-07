
import React, { useState } from 'react';
import { ArrowDownIcon, CreditCardIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

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

// Updated data from the provided image
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

const getPaymentColor = (payMode: string): string => {
  const colors: Record<string, string> = {
    'Adyen': 'bg-dashboard-adyen/10 text-dashboard-adyen',
    'PayPal': 'bg-dashboard-paypal/10 text-dashboard-paypal',
    'Klarna': 'bg-dashboard-klarna/10 text-dashboard-klarna',
    'IDEAL2': 'bg-dashboard-ideal/10 text-dashboard-ideal',
    'GiftCard': 'bg-dashboard-giftcard/10 text-dashboard-giftcard',
    'GiftCard|pay_later': 'bg-dashboard-giftcard/10 text-dashboard-giftcard',
    'applepay': 'bg-dashboard-apple/10 text-dashboard-apple',
  };
  
  return colors[payMode] || 'bg-gray-100 text-gray-700';
};

const ITEMS_PER_PAGE = 7;

const PaymentModeComparison: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(paymentModeData.length / ITEMS_PER_PAGE);
  const paginatedData = paymentModeData.slice(
    currentPage * ITEMS_PER_PAGE, 
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const nextPage = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="font-medium text-gray-600 w-[60px]">Country</TableHead>
              <TableHead className="font-medium text-gray-600 w-[90px]">
                <div className="flex items-center gap-1">
                  <CreditCardIcon size={14} />
                  <span>Payment</span>
                </div>
              </TableHead>
              <TableHead className="text-right font-medium text-gray-600 w-[70px]">Today</TableHead>
              <TableHead className="text-right font-medium text-gray-600 w-[80px]">Yesterday</TableHead>
              <TableHead className="text-right font-medium text-gray-600 w-[70px]">Diff</TableHead>
              <TableHead className="text-right font-medium text-gray-600 w-[70px]">Change</TableHead>
              <TableHead className="text-center font-medium text-gray-600 w-[70px]">Impact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
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
                <TableCell className="text-right py-1.5 text-error-600">{item.difference.toLocaleString()}</TableCell>
                <TableCell className="text-right py-1.5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="ml-auto flex items-center gap-1 text-error-600">
                        <ArrowDownIcon size={14} />
                        {Math.abs(item.percentage).toFixed(1)}%
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Order decrease of {Math.abs(item.percentage).toFixed(2)}% compared to yesterday</p>
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
      </div>
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-2 px-1">
          <div className="text-xs text-gray-500">
            Page {currentPage + 1} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 w-7 p-0" 
              onClick={prevPage}
            >
              <ChevronLeftIcon size={14} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 w-7 p-0" 
              onClick={nextPage}
            >
              <ChevronRightIcon size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentModeComparison;
