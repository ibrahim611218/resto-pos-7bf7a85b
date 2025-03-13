
import { useState, useMemo, useEffect } from "react";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";
import { mockInvoices } from "@/features/invoices/data/mockInvoices";
import { Invoice, SalesByPaymentMethod, SalesByOrderType, TopSellingProduct } from "@/types";
import { formatPaymentMethod, formatOrderType } from "../utils/formatters";

interface SalesDataProps {
  language: string;
}

export const useSalesData = ({ language }: SalesDataProps) => {
  const isArabic = language === "ar";
  const { invoices } = useInvoices();
  const [uniqueUsers, setUniqueUsers] = useState<{id: string, name: string}[]>([]);
  
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);
  const [orderType, setOrderType] = useState<string | undefined>(undefined);
  const [cashier, setCashier] = useState<string | undefined>(undefined);
  const [includeRefunded, setIncludeRefunded] = useState<boolean>(true);
  
  const allInvoices = useMemo(() => {
    return invoices.length > 0 ? invoices : mockInvoices;
  }, [invoices]);
  
  useEffect(() => {
    const users = new Map<string, {id: string, name: string}>();
    
    allInvoices.forEach(invoice => {
      if (invoice.cashierId && invoice.cashierName) {
        users.set(invoice.cashierId, {
          id: invoice.cashierId,
          name: invoice.cashierName
        });
      }
    });
    
    setUniqueUsers(Array.from(users.values()));
  }, [allInvoices]);
  
  const filteredInvoices = useMemo(() => {
    return allInvoices.filter((invoice) => {
      let match = true;
      
      if (startDate) {
        const invoiceDate = new Date(invoice.date);
        match = match && invoiceDate >= startDate;
      }
      
      if (endDate) {
        const invoiceDate = new Date(invoice.date);
        match = match && invoiceDate <= endDate;
      }
      
      if (paymentMethod && paymentMethod !== "all") {
        match = match && invoice.paymentMethod === paymentMethod;
      }
      
      if (orderType && orderType !== "all" && invoice.orderType) {
        match = match && invoice.orderType === orderType;
      }
      
      if (cashier && cashier !== "all") {
        match = match && invoice.cashierId === cashier;
      }
      
      // If includeRefunded is false, exclude invoices with status "refunded"
      if (!includeRefunded && invoice.status === "refunded") {
        match = false;
      }
      
      return match;
    });
  }, [allInvoices, startDate, endDate, paymentMethod, orderType, cashier, includeRefunded]);
  
  const totalSales = useMemo(() => {
    return filteredInvoices.reduce((sum, invoice) => {
      // When calculating total sales, subtract refunded invoice values
      const multiplier = invoice.status === "refunded" ? -1 : 1;
      return sum + (invoice.total * multiplier);
    }, 0);
  }, [filteredInvoices]);
  
  const salesByPaymentMethod: SalesByPaymentMethod[] = useMemo(() => {
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
  
  const salesByOrderType: SalesByOrderType[] = useMemo(() => {
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
  
  const topSellingProducts: TopSellingProduct[] = useMemo(() => {
    const productsMap: Map<string, { name: string, quantity: number, revenue: number }> = new Map();
    
    filteredInvoices.forEach((invoice) => {
      // Calculate multiplier based on invoice status
      const multiplier = invoice.status === "refunded" ? -1 : 1;
      
      invoice.items.forEach((item) => {
        const currentProduct = productsMap.get(item.productId) || { 
          name: item.name, 
          quantity: 0, 
          revenue: 0 
        };
        
        productsMap.set(item.productId, {
          name: item.nameAr && isArabic ? item.nameAr : item.name,
          quantity: currentProduct.quantity + (item.quantity * multiplier),
          revenue: currentProduct.revenue + (item.price * item.quantity * multiplier)
        });
      });
    });
    
    const productsArray: TopSellingProduct[] = [];
    productsMap.forEach((product, productId) => {
      if (product.quantity > 0) { // Only add products with positive quantities
        productsArray.push({
          productId,
          productName: product.name,
          quantity: product.quantity,
          revenue: product.revenue
        });
      }
    });
    
    return productsArray
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [filteredInvoices, isArabic]);
  
  const resetFilters = () => {
    setStartDate(new Date(new Date().setDate(new Date().getDate() - 30)));
    setEndDate(new Date());
    setPaymentMethod(undefined);
    setOrderType(undefined);
    setCashier(undefined);
    setIncludeRefunded(true);
  };
  
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
