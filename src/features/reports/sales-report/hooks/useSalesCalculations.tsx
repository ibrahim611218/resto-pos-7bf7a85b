
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
      // عند حساب إجمالي المبيعات، نستبعد الفواتير المسترجعة بدلاً من حسابها بقيمة سالبة
      if (invoice.status === "refunded") {
        return sum; // استبعاد الفواتير المسترجعة
      }
      return sum + invoice.total;
    }, 0);
  }, [filteredInvoices]);
  
  // Calculate sales by payment method
  const salesByPaymentMethod = useMemo(() => {
    const methodsMap: Map<string, number> = new Map();
    
    filteredInvoices.forEach((invoice) => {
      // استبعاد الفواتير المسترجعة من حسابات طرق الدفع
      if (invoice.status === "refunded") {
        return;
      }
      
      const method = invoice.paymentMethod;
      const currentAmount = methodsMap.get(method) || 0;
      methodsMap.set(method, currentAmount + invoice.total);
    });
    
    const result: SalesByPaymentMethod[] = [];
    methodsMap.forEach((amount, method) => {
      const methodLabel = formatPaymentMethod(method, isArabic);
      
      result.push({
        paymentMethod: methodLabel,
        amount: amount,
        percentage: totalSales > 0 ? (amount / totalSales) * 100 : 0
      });
    });
    
    return result;
  }, [filteredInvoices, totalSales, isArabic]);
  
  // Calculate sales by order type
  const salesByOrderType = useMemo(() => {
    const typesMap: Map<string, { count: number, total: number }> = new Map();
    
    filteredInvoices.forEach((invoice) => {
      // استبعاد الفواتير المسترجعة من حسابات أنواع الطلبات
      if (invoice.status === "refunded") {
        return;
      }
      
      const type = invoice.orderType || "unknown";
      const current = typesMap.get(type) || { count: 0, total: 0 };
      
      typesMap.set(type, { 
        count: current.count + 1,
        total: current.total + invoice.total
      });
    });
    
    const result: SalesByOrderType[] = [];
    typesMap.forEach(({ count }, type) => {
      const typeLabel = formatOrderType(type, isArabic);
      
      // حساب النسبة المئوية باستخدام عدد الفواتير غير المسترجعة فقط
      const nonRefundedInvoiceCount = filteredInvoices.filter(inv => inv.status !== "refunded").length;
      
      result.push({
        orderType: typeLabel,
        count: count,
        percentage: nonRefundedInvoiceCount > 0 ? (count / nonRefundedInvoiceCount) * 100 : 0
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
