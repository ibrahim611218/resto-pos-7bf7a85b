
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Printer, FileText } from "lucide-react";
import { useSalesData } from "./hooks/useSalesData";
import { exportSalesReportPDF } from "./utils/export-utils";
import FilterCard from "./components/FilterCard";
import SummaryCards from "./components/SummaryCards";
import ChartsTabs from "./components/ChartsTabs";

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
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleExportPDF = () => {
    exportSalesReportPDF({
      filteredInvoices,
      totalSales,
      startDate,
      endDate,
      isArabic
    });
  };
  
  return (
    <div className="container p-4" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isArabic ? "تقرير المبيعات" : "Sales Report"}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            {isArabic ? "طباعة" : "Print"}
          </Button>
          <Button onClick={handleExportPDF}>
            <FileText className="h-4 w-4 mr-2" />
            {isArabic ? "تصدير PDF" : "Export PDF"}
          </Button>
        </div>
      </div>
      
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
      
      <div className="saudi-decoration"></div>
      <div className="saudi-decoration-top"></div>
    </div>
  );
};

export default SalesReport;
