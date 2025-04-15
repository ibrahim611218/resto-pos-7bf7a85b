
import { Invoice, CartItem, Customer, PaymentMethod } from "@/types";
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

export const printInvoice = (invoice: Invoice): void => {
  const invoiceHTML = generateInvoiceTemplate(invoice);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  } else {
    console.error("Failed to open print window!");
  }
};

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
      console.log("Generating PDF for invoice:", invoice.number);
      // Remove async/await here since we're just writing to a new window
      const pdfContent = generateInvoiceTemplate(invoice);
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
      break;
  }
};

// Export the template function
export { generateInvoiceTemplate };
