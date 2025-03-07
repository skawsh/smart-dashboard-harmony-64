
import React from 'react';
import { ClockIcon } from 'lucide-react';

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
  
  if (minutes <= 5) return 'text-success-600 font-medium';
  if (minutes <= 15) return 'text-warning-600 font-medium';
  return 'text-error-600 font-medium';
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
      
      <div className="overflow-x-auto">
        <table className="data-table text-center">
          <thead>
            <tr>
              <th className="rounded-tl-lg text-center">Instance</th>
              <th>Adyen</th>
              <th>COD</th>
              <th>IDEAL2</th>
              <th>Klarna</th>
              <th>PayPal</th>
              <th>Runway</th>
              <th>ApplePay</th>
              <th>GiftCard_idw</th>
              <th className="rounded-tr-lg">GiftCard_dp</th>
            </tr>
          </thead>
          <tbody>
            {regionData.map((row, index) => (
              <tr key={index}>
                <td className="font-medium text-center">{row.region}</td>
                <td className={getTimeColor(row.adyen)}>{formatValue(row.adyen)}</td>
                <td className={getTimeColor(row.cod)}>{formatValue(row.cod)}</td>
                <td className={getTimeColor(row.ideal2)}>{formatValue(row.ideal2)}</td>
                <td className={getTimeColor(row.klarna)}>{formatValue(row.klarna)}</td>
                <td className={getTimeColor(row.paypal)}>{formatValue(row.paypal)}</td>
                <td className={getTimeColor(row.runway)}>{formatValue(row.runway)}</td>
                <td className={getTimeColor(row.applepay)}>{formatValue(row.applepay)}</td>
                <td className={getTimeColor(row.giftcard_idw)}>{formatValue(row.giftcard_idw)}</td>
                <td className={getTimeColor(row.giftcard_dp)}>{formatValue(row.giftcard_dp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default MinutesSinceLastOrder;
