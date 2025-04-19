
import { BusinessSettings } from "@/types";

/**
 * Generates HTML for the invoice footer section
 */
export const generateInvoiceFooter = (settings: BusinessSettings): string => {
  // Get notes or use default
  const notes = settings.invoiceNotesAr || "شكراً لزيارتكم";
  
  return `
    <div class="invoice-footer">
      <p>${notes}</p>
      ${settings.addressAr ? `<p>${settings.addressAr}</p>` : ''}
      ${settings.phone ? `<p>هاتف: ${settings.phone}</p>` : ''}
    </div>
    <div class="software-info">
      <p>تم إنشاؤها بواسطة نظام RestoPOS</p>
    </div>
  `;
};
