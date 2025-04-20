
/**
 * Calculate discount amount based on type and value
 */
export const calculateDiscountAmount = (
  subtotal: number, 
  taxAmount: number, 
  discount: number, 
  discountType: "percentage" | "fixed"
): number => {
  if (discountType === "percentage") {
    return (subtotal + taxAmount) * (discount / 100);
  } else {
    return discount;
  }
};
