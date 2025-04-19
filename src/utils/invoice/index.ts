import { Invoice, BusinessSettings, Customer, PaymentMethod } from "@/types";
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a unique invoice number
 */
export const generateInvoiceNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000); // Add a random number
  return `INV-${year}${month}${day}-${hours}${minutes}${seconds}-${random.toString().padStart(3, '0')}`;
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

// Function to handle invoice export (print, pdf, email)
export const handleInvoiceExport = (type: "print" | "pdf" | "email", invoice: Invoice, settings: BusinessSettings | undefined) => {
  if (type === "print") {
    printInvoice(invoice, settings);
  } else if (type === "pdf") {
    // Handle PDF export
    console.log("Exporting PDF...");
  } else if (type === "email") {
    // Handle email
    console.log("Sending email...");
  }
};

// Function to print invoice
export const printInvoice = (invoice: Invoice, businessSettings: BusinessSettings | undefined) => {
  const { generateInvoiceHeader, generateInvoiceDetails, generateInvoiceItemsTable, generateInvoiceSummary, generateInvoiceFooter, generateInvoiceQRCode } = require('./components');
  
  const headerHTML = generateInvoiceHeader(businessSettings);
  const detailsHTML = generateInvoiceDetails(invoice);
  const itemsHTML = generateInvoiceItemsTable(invoice);
  const summaryHTML = generateInvoiceSummary(invoice, businessSettings);
  const footerHTML = generateInvoiceFooter(businessSettings);
  const qrCodeHTML = generateInvoiceQRCode(invoice, businessSettings);
  
  const printableContent = `
    <html>
      <head>
        <title>فاتورة رقم ${invoice.number}</title>
        <style>
          body { font-family: Arial, sans-serif; direction: rtl; }
          .invoice-header { text-align: center; margin-bottom: 20px; }
          .invoice-details { margin-bottom: 20px; }
          .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: right; }
          .invoice-summary { text-align: right; }
          .total-row { font-weight: bold; }
          .invoice-footer { margin-top: 30px; text-align: center; font-size: small; color: #777; }
          .invoice-empty-items { text-align: center; font-style: italic; color: #777; }
        </style>
      </head>
      <body>
        ${headerHTML}
        ${detailsHTML}
        ${itemsHTML}
        ${summaryHTML}
        ${qrCodeHTML}
        ${footerHTML}
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(printableContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  } else {
    console.error('يجب السماح بفتح النوافذ المنبثقة لطباعة الفاتورة.');
  }
};

// Fix the Customer object to include the required phone property
export const createCustomerObject = (name: string, taxNumber?: string): Customer => {
  return {
    name,
    phone: "", // Add the required phone property with an empty string as default
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
