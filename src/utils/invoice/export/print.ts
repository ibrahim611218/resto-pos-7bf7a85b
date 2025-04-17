
import { Invoice, BusinessSettings } from "@/types";
import { toast } from "@/hooks/use-toast";
import { generateInvoiceTemplate } from "../template";
import { openPrintWindow, setupPrintWindow } from "./print-helpers";

/**
 * Prints an invoice
 */
export const printInvoice = (
  invoice: Invoice,
  businessSettings: BusinessSettings
): void => {
  try {
    console.log("Printing invoice:", invoice.id);
    
    // For printing, use thermal receipt size
    const printContent = generateInvoiceTemplate(invoice, businessSettings, false);
    
    const printWindow = openPrintWindow(printContent, {
      title: `فاتورة ${invoice.number}`,
      printAutomatically: true,
      delay: 2000, // Increased delay for better rendering
    });
    
    if (!printWindow) {
      console.error("Could not open print window");
      return;
    }
    
    // Setup print window with extended delay for QR code rendering
    setupPrintWindow(printWindow, {
      title: `فاتورة ${invoice.number}`,
      delay: 2000,
    });
    
  } catch (error) {
    console.error("Error in print function:", error);
    toast({
      title: "خطأ في الطباعة",
      description: "حدث خطأ أثناء محاولة الطباعة",
      variant: "destructive",
    });
  }
};
