
import { Invoice } from "@/types";

/**
 * Generates data for invoice QR code
 */
export const generateInvoiceQRCodeData = (invoice: Invoice): string => {
  console.log("Generating QR code data for invoice:", invoice.id);
  
  try {
    const data = {
      invoiceNumber: invoice.number,
      total: invoice.total,
      date: invoice.date,
      businessName: "مطعم الذواق",
      taxNumber: "300000000000003",
    };
    return JSON.stringify(data);
  } catch (error) {
    console.error("Error generating QR code data:", error);
    return JSON.stringify({
      invoiceNumber: "ERROR",
      total: 0,
      date: new Date().toISOString(),
      businessName: "مطعم الذواق",
      taxNumber: "300000000000003",
    });
  }
};

