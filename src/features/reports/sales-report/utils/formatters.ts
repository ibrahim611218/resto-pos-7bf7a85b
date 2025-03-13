
// Utility functions for formatting data in the Sales Report

/**
 * Formats a payment method for display based on the selected language
 */
export const formatPaymentMethod = (method: string, isArabic: boolean): string => {
  if (method === "cash") return isArabic ? "نقدي" : "Cash";
  if (method === "card") return isArabic ? "بطاقة" : "Card";
  return method;
};

/**
 * Formats an order type for display based on the selected language
 */
export const formatOrderType = (type: string | undefined, isArabic: boolean): string => {
  if (type === "takeaway") return isArabic ? "سفري" : "Takeaway";
  if (type === "dineIn") return isArabic ? "محلي" : "Dine In";
  return isArabic ? "غير محدد" : "Unknown";
};

/**
 * Formats order status for display based on the selected language
 */
export const formatOrderStatus = (status: string, isArabic: boolean): string => {
  if (status === "refunded") return isArabic ? "مسترجع" : "Refunded";
  return isArabic ? "مكتمل" : "Completed";
};
