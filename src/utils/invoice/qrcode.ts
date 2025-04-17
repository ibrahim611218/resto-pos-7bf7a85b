
import { Invoice } from "@/types";

/**
 * Generates data for invoice QR code
 */
export const generateInvoiceQRCodeData = (invoice: Invoice): string => {
  console.log("Generating QR code data for invoice:", invoice.id);
  
  try {
    // Create a structured object with all necessary data
    const data = {
      invoiceNumber: invoice.number,
      total: invoice.total,
      date: invoice.date,
      businessName: "مطعم الذواق",
      taxNumber: "300000000000003",
      // Add more timestamp to prevent caching issues
      timestamp: new Date().getTime(),
      // Add unique identifier to ensure QR codes are always different
      uuid: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)
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
      timestamp: new Date().getTime(),
      uuid: Math.random().toString(36).substring(2, 15)
    });
  }
};
