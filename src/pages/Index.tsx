
import React, { useState } from 'react';
import { ChevronDownIcon, LayoutDashboardIcon, LightbulbIcon, RefreshCcwIcon } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import OrderMetrics from '@/components/dashboard/OrderMetrics';
import PaymentModeComparison from '@/components/dashboard/PaymentModeComparison';
import TouchpointComparison from '@/components/dashboard/TouchpointComparison';
import MinutesSinceLastOrder from '@/components/dashboard/MinutesSinceLastOrder';
import SuccessRate from '@/components/dashboard/SuccessRate';
import PodCount, { podRegions } from '@/components/dashboard/PodCount';
import CpuUtilization from '@/components/dashboard/CpuUtilization';
import ResponseTime from '@/components/dashboard/ResponseTime';
import ThirdPartyTimeout from '@/components/dashboard/ThirdPartyTimeout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Index = () => {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedRegion, setSelectedRegion] = useState<string>("All Instances");
  
  const handleRefresh = () => {
    setLastUpdated(new Date());
    toast.success('Dashboard refreshed successfully');
  };
  
  // Create array of all regions including "All Instances" at the beginning
  const allRegions = ["All Instances", ...podRegions.map(pod => pod.region)];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutDashboardIcon className="text-blue-600" />
              <h1 className="text-xl font-semibold">
                <span className="text-blue-600">Smart</span>Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                onClick={handleRefresh}
              >
                <RefreshCcwIcon size={14} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-6">
        {/* Region Selection Tabs */}
        <div className="mb-6">
          <Tabs defaultValue="All Instances" onValueChange={setSelectedRegion} value={selectedRegion}>
            <TabsList className="w-full justify-start border border-gray-200 bg-gray-50 p-0 h-auto rounded-md">
              {allRegions.map((region) => (
                <TabsTrigger
                  key={region}
                  value={region}
                  className={`py-2 px-5 rounded-none border-b-2 ${
                    selectedRegion === region
                      ? 'border-blue-500 text-blue-700 font-medium'
                      : 'border-transparent'
                  } data-[state=active]:bg-white data-[state=active]:shadow-none`}
                >
                  {region}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Order Stats Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Hm.Com Order Count Metrics</h1>
            <p className="text-sm text-gray-600">
              <span className="text-blue-600 font-medium">02:00 - 08:00 CET</span> • Note: Order count may vary based on sale campaigns.
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="text-sm gap-1">
              Time Range
              <ChevronDownIcon size={14} />
            </Button>
            <Button variant="outline" size="sm" className="text-sm gap-1">
              Region
              <ChevronDownIcon size={14} />
            </Button>
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Payment Mode Comparison at the top, full width */}
          <DashboardCard title="Payment Mode Wise Orders Comparison" animation="animate-fade-in" className="h-[600px]">
            <PaymentModeComparison />
          </DashboardCard>
          
          {/* First row - 2 columns layout with Order Comparison and Touchpoint Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DashboardCard title="Order Comparison (Today vs Yesterday)" animation="animate-fade-in" className="h-full">
              <OrderMetrics />
            </DashboardCard>
            
            <DashboardCard title="Touchpoint Wise Orders Comparison" animation="animate-fade-in-delay-1" className="h-full">
              <TouchpointComparison />
            </DashboardCard>
          </div>
          
          {/* Minutes since last order below the first row */}
          <DashboardCard title="Minutes since last order (Payment mode wise)" animation="animate-fade-in-delay-2">
            <MinutesSinceLastOrder />
          </DashboardCard>
          
          {/* Success Rate and Pod Count in a row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DashboardCard title="Success Rate - Based on Third Party" animation="animate-fade-in-delay-2">
              <SuccessRate />
            </DashboardCard>
            
            <DashboardCard title="Current Pod Count" animation="animate-fade-in-delay-2">
              <PodCount />
            </DashboardCard>
          </div>
          
          {/* CPU and Response Time in a row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DashboardCard title="Hybris CPU Utilization" animation="animate-fade-in-delay-3">
              <CpuUtilization />
            </DashboardCard>
            
            <DashboardCard title="URI Response Time" animation="animate-fade-in-delay-3">
              <ResponseTime />
            </DashboardCard>
          </div>
          
          {/* Third-Party Timeout - full width */}
          <DashboardCard title="Third-Party Read Timeout/Connection Timeout" animation="animate-fade-in-delay-4">
            <ThirdPartyTimeout />
          </DashboardCard>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              &copy; 2023 Smart Dashboard
            </div>
            <div className="flex items-center gap-1 text-blue-600 text-sm">
              <LightbulbIcon size={14} />
              <span>Smart monitoring for business growth</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
