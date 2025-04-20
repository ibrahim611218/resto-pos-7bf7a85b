
import { Invoice } from "@/types";

/**
 * Generates data for QR code from invoice
 */
export const generateInvoiceQRCodeData = (invoice: Invoice): string => {
  try {
    // Standard format for invoice QR data in Saudi Arabia
    const data = {
      invoiceNumber: invoice.number,
      date: new Date(invoice.date).toISOString(),
      total: invoice.total,
      tax: invoice.taxAmount
    };
    
    return JSON.stringify(data);
  } catch (error) {
    console.error("Error generating QR code data:", error);
    return `Invoice: ${invoice.number}`;
  }
};
