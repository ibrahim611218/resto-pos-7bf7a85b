
import { Invoice, BusinessSettings, CartItem } from "@/types";

export const generateInvoiceNumber = (): string => {
  const prefix = "INV";
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
};

export const calculateInvoiceAmounts = (
  items: CartItem[],
  taxRate: number
): { subtotal: number; taxAmount: number; total: number } => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const taxableSubtotal = items
    .filter((item) => item.taxable)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const taxAmount = +(taxableSubtotal * (taxRate / 100)).toFixed(2);
  const total = +(subtotal + taxAmount).toFixed(2);
  
  return {
    subtotal: +subtotal.toFixed(2),
    taxAmount,
    total,
  };
};

export const formatCurrency = (
  amount: number,
  locale: string = "en-US",
  currency: string = "SAR"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

export const exportInvoiceToPDF = (
  invoice: Invoice,
  businessSettings: BusinessSettings
): void => {
  // This would integrate with a PDF generation library
  console.log("Export to PDF", invoice, businessSettings);
  // Implementation would use libraries like jspdf or pdfmake
};

export const emailInvoice = async (
  invoice: Invoice,
  email: string,
  businessSettings: BusinessSettings
): Promise<boolean> => {
  // This would integrate with an email service
  console.log("Email invoice", invoice, email, businessSettings);
  return true; // Successful email sending
};
