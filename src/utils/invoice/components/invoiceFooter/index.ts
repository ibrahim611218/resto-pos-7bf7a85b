
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
      <p>تم إنشاء هذه الفاتورة بواسطة نظام <img src="/lovable-uploads/b8da0625-ebda-4a08-8f51-5ebf33b24b30.png" alt="RestoPOS" width="50" height="auto" style="vertical-align: middle;"> - أنظمة نقاط البيع للمطاعم</p>
    </div>
  `;
};
