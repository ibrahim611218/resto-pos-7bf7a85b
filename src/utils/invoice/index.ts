
import { Invoice, CartItem } from "@/types";
import { generateInvoiceTemplate } from "./template";
import { calculateInvoiceAmounts, calculateDiscountAmount, formatCurrency, generateInvoiceNumber } from "./calculations";
import { generateInvoiceQRCodeData } from "./qrcode";

// Export directly from calculations
export { 
  calculateInvoiceAmounts, 
  calculateDiscountAmount, 
  formatCurrency,
  generateInvoiceNumber
};

// Export from qrcode
export { generateInvoiceQRCodeData };

export const createInvoiceObject = (
  cartItems: CartItem[],
  subtotal: number,
  taxAmount: number,
  discount: number,
  discountType: "percentage" | "fixed",
  total: number,
  paymentMethod: "cash" | "card",
  customerName?: string,
  customerTaxNumber?: string
): Invoice => {
  const invoiceNumber = generateInvoiceNumber();
  const invoiceDate = new Date();

  const discountAmount = discountType === "percentage"
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;

  return {
    id: Math.random().toString(36).substring(2, 9), // Generate a random ID as string
    number: invoiceNumber,
    date: invoiceDate,
    items: cartItems,
    subtotal: subtotal,
    taxAmount: taxAmount,
    discount: discountAmount,
    total: total,
    paymentMethod: paymentMethod,
    customerName: customerName,
    customerTaxNumber: customerTaxNumber,
    cashierId: "unknown",
    cashierName: "Cashier",
    status: "completed" as const,
  };
};

export const createInvoicePdf = async (invoice: Invoice): Promise<string> => {
  const invoiceHTML = generateInvoiceTemplate(invoice);
  return invoiceHTML;
};

export const printInvoice = (invoice: Invoice): void => {
  const invoiceHTML = generateInvoiceTemplate(invoice);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    printWindow.focus(); // Required for IE
    printWindow.print();
    printWindow.close();
  } else {
    console.error("Failed to open print window!");
  }
};

// Create a handleInvoiceExport function that was missing
export const handleInvoiceExport = (
  type: "print" | "pdf" | "email", 
  invoice: Invoice, 
  settings: any, 
  email?: string
): void => {
  switch (type) {
    case "print":
      printInvoice(invoice);
      break;
    case "pdf":
      // In a real app, this would generate and download a PDF
      console.log("Generating PDF for invoice:", invoice.number);
      const pdfContent = createInvoicePdf(invoice);
      // Simulate download by opening in new window
      const pdfWindow = window.open('', '_blank');
      if (pdfWindow) {
        pdfWindow.document.write(pdfContent);
        pdfWindow.document.close();
      }
      break;
    case "email":
      if (!email) {
        console.error("Email is required for sending invoice");
        return;
      }
      console.log(`Sending invoice ${invoice.number} to ${email}`);
      // In a real app, this would send the invoice via email
      break;
  }
};

// Export the template function
export { generateInvoiceTemplate };
