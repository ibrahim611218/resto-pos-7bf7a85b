
import { CartItem } from "@/types";

/**
 * Generates a unique invoice number with a prefix, timestamp and random digits
 */
export const generateInvoiceNumber = (): string => {
  const prefix = "INV";
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Calculates invoice subtotal, tax and total amounts based on cart items
 */
export const calculateInvoiceAmounts = (
  items: CartItem[],
  taxRate: number,
  discount: number = 0,
  discountType: "percentage" | "fixed" = "percentage"
): { subtotal: number; taxAmount: number; total: number } => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const taxableSubtotal = items
    .filter((item) => item.taxable)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const taxAmount = +(taxableSubtotal * (taxRate / 100)).toFixed(2);
  
  const discountAmount = discountType === "percentage" 
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;
  
  const total = +Math.max(0, subtotal + taxAmount - discountAmount).toFixed(2);
  
  return {
    subtotal: +subtotal.toFixed(2),
    taxAmount: +taxAmount.toFixed(2),
    total,
  };
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
