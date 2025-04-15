
import { Invoice } from "@/types";

/**
 * Calculate the discount amount based on subtotal, tax, discount value and discount type
 */
export const calculateDiscountAmount = (
  subtotal: number,
  taxAmount: number,
  discount: number,
  discountType: "percentage" | "fixed"
): number => {
  if (discount <= 0) return 0;
  
  if (discountType === "percentage") {
    return (subtotal + taxAmount) * (discount / 100);
  } else {
    return discount;
  }
};

/**
 * Format currency with proper locale and currency code
 */
export const formatCurrency = (
  amount: number,
  locale: string = "ar-SA",
  currency: string = "SAR"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Generate a unique invoice number
 */
export const generateInvoiceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  
  return `INV-${year}${month}${day}-${randomDigits}`;
};

/**
 * Calculate invoice amounts (subtotal, taxAmount, total)
 */
export const calculateInvoiceAmounts = (
  items: { price: number; quantity: number }[],
  taxRate: number,
  taxIncluded: boolean,
  discount: number,
  discountType: "percentage" | "fixed"
): {
  subtotal: number;
  taxAmount: number;
  total: number;
} => {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Calculate tax
  let taxAmount = 0;
  if (taxIncluded) {
    // If tax is included, extract it from subtotal
    taxAmount = subtotal - subtotal / (1 + taxRate / 100);
  } else {
    // If tax is not included, add it to subtotal
    taxAmount = subtotal * (taxRate / 100);
  }
  
  // Calculate total before discount
  const totalBeforeDiscount = taxIncluded ? subtotal : subtotal + taxAmount;
  
  // Calculate discount
  let discountAmount = 0;
  if (discountType === "percentage") {
    discountAmount = totalBeforeDiscount * (discount / 100);
  } else {
    discountAmount = Math.min(discount, totalBeforeDiscount); // Cannot discount more than total
  }
  
  // Calculate final total
  const total = totalBeforeDiscount - discountAmount;
  
  return {
    subtotal,
    taxAmount,
    total
  };
};
