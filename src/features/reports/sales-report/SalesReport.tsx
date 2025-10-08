
import React, { useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSalesData } from "./hooks/useSalesData";
import FilterCard from "./components/FilterCard";
import SummaryCards from "./components/SummaryCards";
import ChartsTabs from "./components/ChartsTabs";
import ReportHeader from "./components/ReportHeader";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";
import { SearchIcon, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useReportsSync } from "@/hooks/useReportsSync";

const CHART_COLORS = [
  "#10B981", // Green
  "#3B82F6", // Blue
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
];

const SalesReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const printableAreaRef = useRef<HTMLDivElement>(null);
  const { loadInvoicesFromStorage } = useInvoices();
  
  const {
    uniqueUsers,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    paymentMethod,
    setPaymentMethod,
    orderType,
    setOrderType,
    cashier,
    setCashier,
    includeRefunded,
    setIncludeRefunded,
    filteredInvoices,
    totalSales,
    salesByPaymentMethod,
    salesByOrderType,
    topSellingProducts,
    resetFilters,
    searchTerm,
    setSearchTerm,
    refreshData
  } = useSalesData({ language });
  
  // Sync reports with invoices
  useReportsSync();
  
  // Load invoices data when component mounts
  useEffect(() => {
    loadInvoicesFromStorage();
    refreshData();
  }, [loadInvoicesFromStorage, refreshData]);
  
  // Listen for reports data updates
  useEffect(() => {
    const handleReportsUpdate = () => {
      console.log('Reports data updated, refreshing...');
      loadInvoicesFromStorage();
      refreshData();
    };
    
    window.addEventListener('reports-data-updated', handleReportsUpdate);
    window.addEventListener('invoice-created', handleReportsUpdate);
    window.addEventListener('invoice-updated', handleReportsUpdate);
    
    return () => {
      window.removeEventListener('reports-data-updated', handleReportsUpdate);
      window.removeEventListener('invoice-created', handleReportsUpdate);
      window.removeEventListener('invoice-updated', handleReportsUpdate);
    };
  }, [loadInvoicesFromStorage, refreshData]);
  
  const handleRefresh = () => {
    loadInvoicesFromStorage();
    refreshData();
    toast.success(
      isArabic ? "تم تحديث البيانات بنجاح" : "Data refreshed successfully"
    );
  };

  return (
    <div className="container p-4" dir={isArabic ? "rtl" : "ltr"}>
      <ReportHeader
        title={isArabic ? "تقرير المبيعات" : "Sales Report"}
        filteredInvoices={filteredInvoices}
        totalSales={totalSales}
        startDate={startDate}
        endDate={endDate}
        isArabic={isArabic}
      />
      
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    size={18} />
          <Input
            type="text"
            placeholder={isArabic ? "بحث في الفواتير..." : "Search invoices..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-8 ${isArabic ? 'text-right pr-8 pl-4' : 'text-left'}`}
          />
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleRefresh}
          className="ml-2"
          title={isArabic ? "تحديث البيانات" : "Refresh data"}
        >
          <RefreshCw size={18} />
        </Button>
      </div>
      
      <div id="printable-report" ref={printableAreaRef}>
        <FilterCard
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          orderType={orderType}
          setOrderType={setOrderType}
          cashier={cashier}
          setCashier={setCashier}
          includeRefunded={includeRefunded}
          setIncludeRefunded={setIncludeRefunded}
          resetFilters={resetFilters}
          uniqueUsers={uniqueUsers}
          isArabic={isArabic}
        />
        
        <SummaryCards
          totalSales={totalSales}
          filteredInvoices={filteredInvoices}
          isArabic={isArabic}
        />
        
        <ChartsTabs
          salesByPaymentMethod={salesByPaymentMethod}
          salesByOrderType={salesByOrderType}
          topSellingProducts={topSellingProducts}
          filteredInvoices={filteredInvoices}
          chartColors={CHART_COLORS}
          isArabic={isArabic}
        />
      </div>
      
      <div className="saudi-decoration"></div>
      <div className="saudi-decoration-top"></div>
    </div>
  );
};

export default SalesReport;
