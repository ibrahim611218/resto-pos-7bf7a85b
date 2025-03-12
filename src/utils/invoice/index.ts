import { Invoice, OrderItem } from "@/types";
import { generateInvoiceHTML } from "./template";
import { calculateTotal, calculateDiscountAmount, calculateTaxAmount } from "./calculations";
import { generateQrCode } from "./qrcode";

export const formatCurrency = (amount: number, locale: string = "ar-SA", currency: string = "SAR"): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
};

export const createInvoiceObject = (
  cartItems: OrderItem[],
  subtotal: number,
  taxAmount: number,
  discount: number,
  discountType: "percentage" | "fixed",
  total: number,
  paymentMethod: "cash" | "card",
  customerName?: string,
  customerTaxNumber?: string
): Invoice => {
  const invoiceNumber = Math.floor(Math.random() * 1000000);
  const invoiceDate = new Date();

  const discountAmount = discountType === "percentage"
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;

  return {
    number: invoiceNumber,
    date: invoiceDate,
    items: cartItems,
    subtotal: subtotal,
    tax: taxAmount,
    discount: discountAmount,
    total: total,
    paymentMethod: paymentMethod,
    customerName: customerName,
    customerTaxNumber: customerTaxNumber,
    qrCode: '', // QR code will be generated later
  };
};

export const createInvoicePdf = async (invoice: Invoice): Promise<string> => {
  const invoiceHTML = generateInvoiceHTML(invoice);
  return invoiceHTML;
};

export const printInvoice = (invoice: Invoice): void => {
  const invoiceHTML = generateInvoiceHTML(invoice);
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

export { generateInvoiceHTML, calculateTotal, calculateDiscountAmount, calculateTaxAmount, generateQrCode };
