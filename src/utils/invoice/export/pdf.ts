
import { Invoice, BusinessSettings } from "@/types";
import { toast } from "@/hooks/use-toast";
import { generateInvoiceTemplate } from "../template";
import { openPrintWindow, setupPrintWindow } from "./print-helpers";

/**
 * Exports invoice to PDF using browser's print functionality
 */
export const exportInvoiceToPDF = (
  invoice: Invoice,
  businessSettings: BusinessSettings
): void => {
  try {
    console.log("Exporting invoice to PDF:", invoice.id, invoice.number);
    
    // For PDF export, we'll use A4 size
    const printContent = generateInvoiceTemplate(invoice, businessSettings, true);
    
    const printWindow = openPrintWindow(printContent);
    
    if (!printWindow) {
      return;
    }
    
    setupPrintWindow(printWindow, {
      title: `invoice-${invoice.number}.pdf`,
      printAutomatically: true,
      isPdf: true,
      delay: 1500
    });
    
    toast({
      title: "تم تصدير الفاتورة",
      description: `تم تصدير الفاتورة رقم ${invoice.number} بنجاح`,
    });
  } catch (error) {
    console.error("Error in exportInvoiceToPDF:", error);
    toast({
      title: "خطأ في تصدير الفاتورة",
      description: "حدث خطأ أثناء تصدير الفاتورة إلى PDF",
      variant: "destructive",
    });
  }
};
