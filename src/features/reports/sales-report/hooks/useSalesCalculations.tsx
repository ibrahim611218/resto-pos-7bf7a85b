
import { useMemo } from "react";
import { Invoice, SalesByPaymentMethod, SalesByOrderType, PaymentMethod } from "@/types";

interface SalesCalculationsProps {
  filteredInvoices: Invoice[];
  isArabic: boolean;
}

export const useSalesCalculations = ({ filteredInvoices, isArabic }: SalesCalculationsProps) => {
  const totalSales = useMemo(() => {
    return filteredInvoices.reduce((sum, invoice) => {
      // If refunded, negate the amount
      const multiplier = invoice.status === "refunded" ? -1 : 1;
      return sum + (invoice.total * multiplier);
    }, 0);
  }, [filteredInvoices]);

  const salesByPaymentMethod = useMemo(() => {
    const paymentMethodTotals: Record<string, number> = {};

    filteredInvoices.forEach(invoice => {
      const paymentMethod = invoice.paymentMethod;
      const multiplier = invoice.status === "refunded" ? -1 : 1;
      const amount = invoice.total * multiplier;

      if (!paymentMethodTotals[paymentMethod]) {
        paymentMethodTotals[paymentMethod] = 0;
      }
      paymentMethodTotals[paymentMethod] += amount;
    });

    const result: SalesByPaymentMethod[] = Object.entries(paymentMethodTotals)
      .filter(([_, total]) => total > 0)
      .map(([method, total]) => ({
        method,
        total
      }));

    return result;
  }, [filteredInvoices]);

  const salesByOrderType = useMemo(() => {
    const orderTypeTotals: Record<string, number> = {};

    filteredInvoices.forEach(invoice => {
      const orderType = invoice.orderType || 'unknown';
      const multiplier = invoice.status === "refunded" ? -1 : 1;
      const amount = invoice.total * multiplier;

      if (!orderTypeTotals[orderType]) {
        orderTypeTotals[orderType] = 0;
      }
      orderTypeTotals[orderType] += amount;
    });

    const result: SalesByOrderType[] = Object.entries(orderTypeTotals)
      .filter(([_, total]) => total > 0)
      .map(([type, total]) => ({
        type,
        total
      }));

    return result;
  }, [filteredInvoices]);

  return {
    totalSales,
    salesByPaymentMethod,
    salesByOrderType,
  };
};
