
import React, { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSalesData } from "./hooks/useSalesData";
import FilterCard from "./components/FilterCard";
import SummaryCards from "./components/SummaryCards";
import ChartsTabs from "./components/ChartsTabs";
import ReportHeader from "./components/ReportHeader";

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
    resetFilters
  } = useSalesData({ language });
  
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
