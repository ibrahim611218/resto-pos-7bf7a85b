
import { useMemo } from "react";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";
import { mockInvoices } from "@/features/invoices/data/mockInvoices";
import { useFilterStates } from "./useFilterStates";
import { useFilteredInvoices } from "./useFilteredInvoices";
import { useSalesCalculations } from "./useSalesCalculations";
import { useTopProducts } from "./useTopProducts";
import { useUniqueUsers } from "./useUniqueUsers";

interface SalesDataProps {
  language: string;
}

export const useSalesData = ({ language }: SalesDataProps) => {
  const isArabic = language === "ar";
  const { invoices } = useInvoices();
  
  // Get filter states
  const {
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
    resetFilters
  } = useFilterStates();
  
  // Get all invoices (from API or mock)
  const allInvoices = useMemo(() => {
    return invoices.length > 0 ? invoices : mockInvoices;
  }, [invoices]);
  
  // Get unique users from invoices
  const uniqueUsers = useUniqueUsers({ allInvoices });
  
  // Get filtered invoices based on filter criteria
  const filteredInvoices = useFilteredInvoices({
    allInvoices,
    startDate,
    endDate,
    paymentMethod,
    orderType,
    cashier,
    includeRefunded
  });
  
  // Calculate sales metrics
  const { totalSales, salesByPaymentMethod, salesByOrderType } = useSalesCalculations({
    filteredInvoices,
    isArabic
  });
  
  // Get top selling products
  const topSellingProducts = useTopProducts({
    filteredInvoices,
    isArabic
  });
  
  return {
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
  };
};
