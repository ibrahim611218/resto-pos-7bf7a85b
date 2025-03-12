
import { Invoice } from "@/types";

/**
 * Generates data for invoice QR code
 */
export const generateInvoiceQRCodeData = (invoice: Invoice): string => {
  const data = {
    invoiceNumber: invoice.number,
    total: invoice.total,
    date: invoice.date,
    businessName: "مطعم الذواق",
    taxNumber: "300000000000003",
  };
  return JSON.stringify(data);
};
