
import { useMemo, useState, useCallback } from "react";
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);
  
  // Function to refresh data
  const refreshData = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);
  
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
  }, [invoices, refreshKey]);
  
  // Get unique users from invoices
  const uniqueUsers = useUniqueUsers({ allInvoices });
  
  // Get filtered and searched invoices
  const initialFilteredInvoices = useFilteredInvoices({
    allInvoices,
    startDate,
    endDate,
    paymentMethod,
    orderType,
    cashier,
    includeRefunded
  });
  
  // Apply search filter
  const filteredInvoices = useMemo(() => {
    if (!searchTerm) return initialFilteredInvoices;
    
    const term = searchTerm.toLowerCase();
    return initialFilteredInvoices.filter(invoice => {
      // Search by invoice number
      if (invoice.number.toLowerCase().includes(term)) return true;
      
      // Search by customer name
      if (invoice.customer?.name && invoice.customer.name.toLowerCase().includes(term)) return true;
      
      // Search by cashier name
      if (invoice.cashierName.toLowerCase().includes(term)) return true;
      
      // Search by items
      const hasMatchingItem = invoice.items.some(item => 
        item.name.toLowerCase().includes(term) ||
        (item.nameAr && item.nameAr.toLowerCase().includes(term))
      );
      
      return hasMatchingItem;
    });
  }, [initialFilteredInvoices, searchTerm]);
  
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
    resetFilters,
    searchTerm,
    setSearchTerm,
    refreshData
  };
};
