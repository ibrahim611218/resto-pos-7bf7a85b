import { Invoice, BusinessSettings, Customer, PaymentMethod } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { generateInvoiceHeader, generateInvoiceDetails, generateInvoiceItemsTable, generateInvoiceSummary, generateInvoiceFooter, generateInvoiceQRCode } from './components';

/**
 * Generates a unique invoice number
 */
export const generateInvoiceNumber = (): string => {
  // Generate 6 random digits
  const random = Math.floor(Math.random() * 900000) + 100000; // Between 100000 and 999999
  return random.toString();
};

// Function to calculate discount amount
export const calculateDiscountAmount = (subtotal: number, taxAmount: number, discount: number, discountType: "percentage" | "fixed"): number => {
  let discountAmount = 0;
  if (discountType === "percentage") {
    discountAmount = (subtotal + taxAmount) * (discount / 100);
  } else {
    discountAmount = discount;
  }
  return discountAmount;
};

// Function to format currency
export const formatCurrency = (amount: number, locale = 'en-US', currency = 'USD'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Function to generate QR code data
export const generateInvoiceQRCodeData = (invoice: Invoice): string => {
  const qrData = `Invoice Number: ${invoice.number}\nDate: ${invoice.date}\nTotal Amount: ${invoice.total}`;
  return qrData;
};

// Re-export the mobile-friendly print/PDF/email implementations so all
// callers use the same iframe-based pipeline (avoids PWA closing on print
// and ensures PDF actually downloads on mobile).
export { handleInvoiceExport, printInvoice, exportInvoiceToPDF, emailInvoice } from "./export";

// Fix the Customer object to include the required phone property
export const createCustomerObject = (name: string, phone: string = "", taxNumber?: string): Customer => {
  return {
    name,
    phone, // Add the required phone property
    taxNumber
  };
};

// Fix the date type issue
export const createInvoiceObject = (
  items: any[],
  subtotal: number,
  taxAmount: number,
  discount: number,
  discountType: "percentage" | "fixed",
  total: number,
  paymentMethod: PaymentMethod
): Invoice => {
  // Create a timestamp for date formatting
  const now = new Date();
  const dateStr = now.toISOString(); // Convert date to string
  
  // Generate invoice number
  const invoiceNumber = generateInvoiceNumber();
  
  return {
    id: uuidv4(),
    number: invoiceNumber,
    date: dateStr, // Use string format instead of Date object
    createdAt: dateStr,
    customer: undefined,
    customerName: "Walk-in Customer",
    customerPhone: "",
    items,
    subtotal,
    taxAmount,
    discount,
    discountType,
    total,
    totalAmount: total,
    paymentMethod,
    paidAmount: 0,
    cashierId: "1", // TODO: Replace with actual user ID
    cashierName: "Cashier", // TODO: Replace with actual user name
    status: "completed"
  };
};
