
import React from 'react';
import { AlertCircleIcon, AlertTriangleIcon, ArrowTrendingUpIcon, BadgeCheckIcon, BellIcon, CreditCardIcon, DollarSignIcon, GaugeIcon, ShieldAlertIcon } from 'lucide-react';

interface AlertItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
}

// Sample alerts based on the image data
const alerts: AlertItem[] = [
  {
    icon: <BadgeCheckIcon className="text-success-500" size={18} />,
    title: "Payment Success Rate",
    description: "Stable at 98% across all regions",
    severity: "info"
  },
  {
    icon: <AlertTriangleIcon className="text-warning-500" size={18} />,
    title: "US Order Drop",
    description: "51% decrease compared to yesterday",
    severity: "warning"
  },
  {
    icon: <CreditCardIcon className="text-error-500" size={18} />,
    title: "PayPal Issues",
    description: "Connection timeouts detected at 3:00 AM",
    severity: "critical"
  },
  {
    icon: <GaugeIcon className="text-info-500" size={18} />,
    title: "EU2 Pod Performance",
    description: "Running with lower count than optimal",
    severity: "warning"
  },
  {
    icon: <ShieldAlertIcon className="text-warning-500" size={18} />,
    title: "Klarna Success Rate",
    description: "Below threshold at 96.6%",
    severity: "warning"
  }
];

const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'info':
      return 'border-l-4 border-blue-500';
    case 'warning':
      return 'border-l-4 border-warning-500';
    case 'critical':
      return 'border-l-4 border-error-500';
    default:
      return '';
  }
};

const AlertsInsights: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-3 text-blue-600">
        <BellIcon size={16} />
        <span className="text-sm font-medium">Alerts & Insights</span>
      </div>
      
      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
        {alerts.map((alert, index) => (
          <div 
            key={index} 
            className={`alert-item ${getSeverityColor(alert.severity)} animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex-shrink-0">
              {alert.icon}
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-sm">{alert.title}</h3>
              <p className="text-xs text-gray-600">{alert.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 border border-blue-200 rounded-md bg-blue-50/70">
        <h3 className="font-medium text-sm mb-2 text-blue-700">Recommended Actions</h3>
        <ul className="text-xs text-gray-700 space-y-2">
          <li className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5">
              <AlertCircleIcon size={14} className="text-error-600" />
            </div>
            <span>Investigate PayPal connection failures at 3:00 AM</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5">
              <AlertCircleIcon size={14} className="text-warning-600" />
            </div>
            <span>Review EU2 region pod allocation and scaling policies</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5">
              <AlertCircleIcon size={14} className="text-blue-600" />
            </div>
            <span>Optimize US mobile app checkout flow to reduce drop rate</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AlertsInsights;
