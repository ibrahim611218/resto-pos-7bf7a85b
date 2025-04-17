import { Invoice, CartItem, Customer, PaymentMethod, BusinessSettings } from "@/types";
import { generateInvoiceTemplate } from "./template";
import { calculateInvoiceAmounts, calculateDiscountAmount, formatCurrency, generateInvoiceNumber } from "./calculations";
import { generateInvoiceQRCodeData } from "./qrcode";
import { handleInvoiceExport } from "./export";

// Export directly from calculations
export { 
  calculateInvoiceAmounts, 
  calculateDiscountAmount, 
  formatCurrency,
  generateInvoiceNumber
};

// Export from qrcode
export { generateInvoiceQRCodeData };

// Export from export module
export { handleInvoiceExport };

export const createInvoiceObject = (
  cartItems: CartItem[],
  subtotal: number,
  taxAmount: number,
  discount: number,
  discountType: "percentage" | "fixed",
  total: number,
  paymentMethod: PaymentMethod,
  customerName?: string,
  customerTaxNumber?: string
): Invoice => {
  const invoiceNumber = generateInvoiceNumber();
  const invoiceDate = new Date();

  const discountAmount = discountType === "percentage"
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;

  // Create customer object if customer details are provided
  let customer: Customer | undefined;
  if (customerName) {
    customer = {
      name: customerName,
      taxNumber: customerTaxNumber
    };
  }

  return {
    id: Math.random().toString(36).substring(2, 9),
    number: invoiceNumber,
    date: invoiceDate,
    items: cartItems,
    subtotal: subtotal,
    taxAmount: taxAmount,
    discount: discountAmount,
    total: total,
    paidAmount: total, // Default the paid amount to the total
    paymentMethod: paymentMethod,
    customer: customer,
    cashierId: "unknown",
    cashierName: "Cashier",
    status: "completed" as const,
  };
};

export const createInvoicePdf = async (invoice: Invoice): Promise<string> => {
  return generateInvoiceTemplate(invoice);
};

export { generateInvoiceTemplate };
