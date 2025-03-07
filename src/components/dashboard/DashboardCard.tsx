
import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  animation?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  children, 
  className,
  animation = "animate-fade-in" 
}) => {
  return (
    <div className={cn("dashboard-card", animation, className)}>
      <h2 className="text-sm font-medium text-gray-700 mb-3">{title}</h2>
      <div className="h-full">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
