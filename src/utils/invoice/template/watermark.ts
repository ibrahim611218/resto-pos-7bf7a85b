
import { Invoice } from "@/types";

/**
 * Generate watermark for refunded invoices
 */
export const generateRefundedWatermark = (invoice: Invoice): string => {
  if (invoice.status === "refunded") {
    return `
      <div class="watermark">
        مسترجعة
      </div>
    `;
  }
  return '';
};
