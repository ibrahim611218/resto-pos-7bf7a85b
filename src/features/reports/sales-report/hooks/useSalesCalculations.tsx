
import { useMemo } from "react";
import { Invoice, SalesByPaymentMethod, SalesByOrderType, TopSellingProduct } from "@/types";
import { formatPaymentMethod, formatOrderType } from "../utils/formatters";

interface SalesCalculationsProps {
  filteredInvoices: Invoice[];
  isArabic: boolean;
}

export const useSalesCalculations = ({ filteredInvoices, isArabic }: SalesCalculationsProps) => {
  // Calculate total sales
  const totalSales = useMemo(() => {
    return filteredInvoices.reduce((sum, invoice) => {
      // When calculating total sales, subtract refunded invoice values
      const multiplier = invoice.status === "refunded" ? -1 : 1;
      return sum + (invoice.total * multiplier);
    }, 0);
  }, [filteredInvoices]);
  
  // Calculate sales by payment method
  const salesByPaymentMethod = useMemo(() => {
    const methodsMap: Map<string, number> = new Map();
    
    filteredInvoices.forEach((invoice) => {
      const method = invoice.paymentMethod;
      const currentAmount = methodsMap.get(method) || 0;
      
      // When calculating sales by payment method, subtract refunded invoice values
      const multiplier = invoice.status === "refunded" ? -1 : 1;
      methodsMap.set(method, currentAmount + (invoice.total * multiplier));
    });
    
    const result: SalesByPaymentMethod[] = [];
    methodsMap.forEach((amount, method) => {
      const methodLabel = formatPaymentMethod(method, isArabic);
      
      result.push({
        paymentMethod: methodLabel,
        amount: Math.abs(amount), // Use absolute value for the chart
        percentage: totalSales > 0 ? (Math.abs(amount) / Math.abs(totalSales)) * 100 : 0
      });
    });
    
    return result;
  }, [filteredInvoices, totalSales, isArabic]);
  
  // Calculate sales by order type
  const salesByOrderType = useMemo(() => {
    const typesMap: Map<string, { count: number, total: number }> = new Map();
    
    filteredInvoices.forEach((invoice) => {
      const type = invoice.orderType || "unknown";
      const current = typesMap.get(type) || { count: 0, total: 0 };
      
      // When calculating order count by type, count refunded invoices as negative orders
      const countMultiplier = invoice.status === "refunded" ? -1 : 1;
      const totalMultiplier = invoice.status === "refunded" ? -1 : 1;
      
      typesMap.set(type, { 
        count: current.count + countMultiplier,
        total: current.total + (invoice.total * totalMultiplier)
      });
    });
    
    const result: SalesByOrderType[] = [];
    typesMap.forEach(({ count }, type) => {
      const typeLabel = formatOrderType(type, isArabic);
      
      result.push({
        orderType: typeLabel,
        count: Math.abs(count),
        percentage: filteredInvoices.length > 0 ? (Math.abs(count) / filteredInvoices.length) * 100 : 0
      });
    });
    
    return result;
  }, [filteredInvoices, isArabic]);
  
  return {
    totalSales,
    salesByPaymentMethod,
    salesByOrderType
  };
};
