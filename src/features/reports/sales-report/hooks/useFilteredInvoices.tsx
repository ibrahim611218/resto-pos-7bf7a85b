
import { useMemo } from "react";
import { Invoice } from "@/types";

interface FilteredInvoicesProps {
  allInvoices: Invoice[];
  startDate?: Date;
  endDate?: Date;
  paymentMethod?: string;
  orderType?: string;
  cashier?: string;
  includeRefunded: boolean;
}

export const useFilteredInvoices = ({
  allInvoices,
  startDate,
  endDate,
  paymentMethod,
  orderType,
  cashier,
  includeRefunded
}: FilteredInvoicesProps) => {
  return useMemo(() => {
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
};
