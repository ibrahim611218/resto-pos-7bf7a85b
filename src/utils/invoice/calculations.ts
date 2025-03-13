
import { CartItem } from "@/types";

/**
 * Generates a numeric invoice number
 */
export const generateInvoiceNumber = (): string => {
  // Get existing invoices from localStorage to find the highest invoice number
  let nextInvoiceNumber = 1;
  try {
    const storedInvoices = localStorage.getItem('invoices');
    if (storedInvoices) {
      const invoices = JSON.parse(storedInvoices);
      // Find the highest invoice number
      const highestNumber = invoices.reduce((max: number, invoice: any) => {
        const invoiceNum = parseInt(invoice.number);
        return isNaN(invoiceNum) ? max : Math.max(max, invoiceNum);
      }, 0);
      nextInvoiceNumber = highestNumber + 1;
    }
  } catch (error) {
    console.error("Error getting next invoice number:", error);
    // Default to 1 if there's an error
    nextInvoiceNumber = 1;
  }
  
  return nextInvoiceNumber.toString();
};

/**
 * Calculates invoice subtotal, tax and total amounts based on cart items
 */
export const calculateInvoiceAmounts = (
  items: CartItem[],
  taxRate: number = 15, // Default to 15% if taxRate is invalid
  discount: number = 0,
  discountType: "percentage" | "fixed" = "percentage",
  taxIncluded: boolean = false
): { subtotal: number; taxAmount: number; total: number } => {
  // Ensure taxRate is a valid number
  const validTaxRate = Number(taxRate);
  const effectiveTaxRate = isNaN(validTaxRate) ? 15 : validTaxRate;
  
  // إذا كانت الضريبة مضمنة في السعر، نحتاج إلى استخراج قيمة الضريبة من السعر
  if (taxIncluded) {
    // حساب المجموع الإجمالي شامل الضريبة
    const totalWithTax = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    
    // استخراج القيمة الضريبية من المجموع
    const taxAmount = +(totalWithTax - (totalWithTax / (1 + effectiveTaxRate / 100))).toFixed(2);
    
    // حساب المجموع بدون ضريبة
    const subtotal = +(totalWithTax - taxAmount).toFixed(2);
    
    // حساب قيمة الخصم
    const discountAmount = discountType === "percentage" 
      ? totalWithTax * (discount / 100)
      : discount;
    
    // حساب المجموع النهائي بعد الخصم ويتم تقريبه للرقم الصحيح
    const totalBeforeRounding = Math.max(0, totalWithTax - discountAmount);
    const total = Math.round(totalBeforeRounding);
    
    return {
      subtotal,
      taxAmount,
      total,
    };
  } else {
    // الطريقة الأصلية لحساب الفاتورة عندما تكون الضريبة غير مضمنة في السعر
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    
    const taxableSubtotal = items
      .filter((item) => item.taxable)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const taxAmount = +(taxableSubtotal * (effectiveTaxRate / 100)).toFixed(2);
    
    const discountAmount = discountType === "percentage" 
      ? (subtotal + taxAmount) * (discount / 100)
      : discount;
    
    const totalBeforeRounding = Math.max(0, subtotal + taxAmount - discountAmount);
    const total = Math.round(totalBeforeRounding);
    
    return {
      subtotal: +subtotal.toFixed(2),
      taxAmount: +taxAmount.toFixed(2),
      total,
    };
  }
};

/**
 * Formats a number as currency
 */
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

/**
 * Calculates the discount amount
 */
export const calculateDiscountAmount = (
  subtotal: number,
  taxAmount: number,
  discount: number,
  discountType: "percentage" | "fixed"
): number => {
  return discountType === "percentage"
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;
};
