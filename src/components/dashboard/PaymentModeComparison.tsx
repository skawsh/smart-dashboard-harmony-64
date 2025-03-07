
import React from 'react';
import { ArrowDownIcon, CreditCardIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

// Real data from the image
const paymentModeData: PaymentComparisonData[] = [
  { time: '02:00-08:00', country: 'CA', payMode: 'Adyen', today: 1187, yesterday: 3727, difference: -2540, percentage: -68.15, impact: 'Medium' },
  { time: '02:00-08:00', country: 'US', payMode: 'Adyen', today: 2349, yesterday: 4846, difference: -2497, percentage: -51.53, impact: 'Medium' },
  { time: '02:00-08:00', country: 'NL', payMode: 'Klarna', today: 1286, yesterday: 2076, difference: -790, percentage: -38.05, impact: 'Medium' },
  { time: '02:00-08:00', country: 'US', payMode: 'Klarna', today: 463, yesterday: 702, difference: -239, percentage: -34.05, impact: 'Medium' },
  { time: '02:00-08:00', country: 'MX', payMode: 'Adyen', today: 357, yesterday: 1213, difference: -856, percentage: -70.57, impact: 'Medium' },
  { time: '02:00-08:00', country: 'US', payMode: 'PayPal', today: 560, yesterday: 1136, difference: -576, percentage: -50.70, impact: 'Medium' },
  { time: '02:00-08:00', country: 'CA', payMode: 'PayPal', today: 243, yesterday: 674, difference: -431, percentage: -63.95, impact: 'Medium' },
  { time: '02:00-08:00', country: 'DE', payMode: 'GiftCard_idw', today: 89, yesterday: 241, difference: -152, percentage: -63.07, impact: 'Medium' },
  { time: '02:00-08:00', country: 'NL', payMode: 'Adyen', today: 81, yesterday: 175, difference: -94, percentage: -53.71, impact: 'Medium' },
  { time: '02:00-08:00', country: 'US', payMode: 'GiftCard', today: 23, yesterday: 69, difference: -46, percentage: -66.67, impact: 'Medium' },
];

const getPaymentColor = (payMode: string): string => {
  const colors: Record<string, string> = {
    'Adyen': 'bg-dashboard-adyen/10 text-dashboard-adyen',
    'PayPal': 'bg-dashboard-paypal/10 text-dashboard-paypal',
    'Klarna': 'bg-dashboard-klarna/10 text-dashboard-klarna',
    'IDEAL': 'bg-dashboard-ideal/10 text-dashboard-ideal',
    'GiftCard': 'bg-dashboard-giftcard/10 text-dashboard-giftcard',
    'GiftCard_idw': 'bg-dashboard-giftcard/10 text-dashboard-giftcard',
    'ApplePay': 'bg-dashboard-apple/10 text-dashboard-apple',
  };
  
  return colors[payMode] || 'bg-gray-100 text-gray-700';
};

const PaymentModeComparison: React.FC = () => {
  return (
    <div className="w-full">
      <div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-medium text-gray-600">Country</th>
              <th className="text-left py-2 font-medium text-gray-600">
                <div className="flex items-center gap-1">
                  <CreditCardIcon size={14} />
                  <span>Payment</span>
                </div>
              </th>
              <th className="text-right py-2 font-medium text-gray-600">Today</th>
              <th className="text-right py-2 font-medium text-gray-600">Change</th>
              <th className="text-center py-2 font-medium text-gray-600">Impact</th>
            </tr>
          </thead>
          <tbody>
            {paymentModeData.map((item, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="py-2.5 font-medium">{item.country}</td>
                <td className="py-2.5">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(item.payMode)}`}>
                    {item.payMode}
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
                <td className="py-2.5 text-center">
                  <span className={`impact-tag-${item.impact === 'Medium' ? 'medium' : 'normal'}`}>
                    {item.impact}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentModeComparison;
