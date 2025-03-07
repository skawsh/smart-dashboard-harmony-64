
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
  { time: '02:00-08:00', country: 'DE', payMode: 'Klarna', today: 1835, yesterday: 17284, difference: -15449, percentage: -89.38, impact: 'Normal' },
  { time: '02:00-08:00', country: 'DE', payMode: 'PayPal', today: 3539, yesterday: 6225, difference: -2686, percentage: -43.15, impact: 'Normal' },
  { time: '02:00-08:00', country: 'US', payMode: 'ApplePay', today: 1270, yesterday: 2722, difference: -1452, percentage: -53.34, impact: 'Normal' },
  { time: '02:00-08:00', country: 'AT', payMode: 'Klarna', today: 1520, yesterday: 2683, difference: -1163, percentage: -43.35, impact: 'Normal' },
  { time: '02:00-08:00', country: 'NL', payMode: 'IDEAL', today: 778, yesterday: 1466, difference: -688, percentage: -46.93, impact: 'Normal' },
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
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="rounded-tl-lg">Country</th>
              <th>
                <div className="flex items-center gap-1">
                  <CreditCardIcon size={14} />
                  <span>Payment Mode</span>
                </div>
              </th>
              <th>Today</th>
              <th>Yesterday</th>
              <th>Difference</th>
              <th>% Change</th>
              <th className="rounded-tr-lg">Impact</th>
            </tr>
          </thead>
          <tbody>
            {paymentModeData.map((item, index) => (
              <tr key={index}>
                <td className="font-medium">{item.country}</td>
                <td>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(item.payMode)}`}>
                    {item.payMode}
                  </span>
                </td>
                <td>{item.today.toLocaleString()}</td>
                <td>{item.yesterday.toLocaleString()}</td>
                <td className="text-error-600">{item.difference.toLocaleString()}</td>
                <td>
                  <div className="flex items-center gap-1 text-error-600">
                    <ArrowDownIcon size={14} />
                    {Math.abs(item.percentage).toFixed(2)}%
                  </div>
                </td>
                <td>
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
