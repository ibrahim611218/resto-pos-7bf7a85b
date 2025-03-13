
import { Invoice, BusinessSettings } from "@/types";
import { calculateDiscountAmount } from "../calculations";

/**
 * Generates HTML for the invoice summary section
 */
export const generateInvoiceSummary = (invoice: Invoice, businessSettings: BusinessSettings): string => {
  // Ensure tax rate is a valid number
  const taxRate = Number(businessSettings.taxRate);
  const effectiveTaxRate = isNaN(taxRate) ? 15 : taxRate;
  
  const discountAmount = calculateDiscountAmount(
    invoice.subtotal,
    invoice.taxAmount,
    invoice.discount || 0,
    invoice.discountType || "percentage"
  );
  
  // Get paid and remaining amounts with fallbacks
  const paidAmount = invoice.paidAmount !== undefined ? invoice.paidAmount : invoice.total;
  const remainingAmount = invoice.remainingAmount !== undefined ? invoice.remainingAmount : 0;
  
  const showRemaining = remainingAmount > 0;
  
  return `
    <div class="invoice-summary">
      <p><strong>المجموع الفرعي:</strong> <span>${invoice.subtotal.toFixed(2)} ر.س</span></p>
      <p><strong>ضريبة القيمة المضافة (${effectiveTaxRate}%):</strong> <span>${invoice.taxAmount.toFixed(2)} ر.س</span></p>
      ${invoice.discount ? `<p><strong>الخصم${invoice.discountType === 'percentage' ? ` (${invoice.discount}%)` : ''}:</strong> <span>${
        discountAmount.toFixed(2)
      } ر.س</span></p>` : ''}
      <p class="total-row"><strong>الإجمالي:</strong> <span>${invoice.total.toFixed(2)} ر.س</span></p>
      <p><strong>المبلغ المدفوع:</strong> <span>${paidAmount.toFixed(2)} ر.س</span></p>
      ${showRemaining ? `<p class="remaining-amount"><strong>المبلغ المتبقي:</strong> <span>${remainingAmount.toFixed(2)} ر.س</span></p>` : ''}
    </div>
  `;
};
