
import { BusinessSettings } from "@/types";

/**
 * Generates HTML for the invoice footer section
 */
export const generateInvoiceFooter = (settings: BusinessSettings): string => {
  return `
    <div class="invoice-footer">
      <p>${settings.invoiceNotesAr || settings.invoiceNotes || ''}</p>
      <p>شكراً لزيارتكم</p>
    </div>

    <div class="software-info">
      <p>تم إنشاء هذه الفاتورة بواسطة نظام RestoPOS - أنظمة نقاط البيع للمطاعم</p>
    </div>
  `;
};
