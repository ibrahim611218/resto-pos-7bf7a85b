
import { Invoice, BusinessSettings } from "@/types";
import { toast } from "@/hooks/use-toast";
import { generateInvoiceTemplate } from "../template";
import { openPrintWindow, setupPrintWindow } from "./print-helpers";
import { addQRRenderingScript } from "./qr-helpers";

/**
 * Prints an invoice
 */
export const printInvoice = (
  invoice: Invoice,
  businessSettings: BusinessSettings
): void => {
  try {
    console.log("Printing invoice:", JSON.stringify(invoice));
    // For printing, use thermal receipt size
    const printContent = generateInvoiceTemplate(invoice, businessSettings, false);
    console.log("Generated print content length:", printContent.length);
    
    const printWindow = openPrintWindow(printContent);
    
    if (!printWindow) {
      return;
    }
    
    // Pre-load fonts and images with a sufficient delay
    printWindow.onload = function() {
      console.log("Print window loaded successfully");
      printWindow.focus();
      
      // Force layout recalculation to ensure QR code renders
      printWindow.document.body.offsetHeight;
      
      // Force QR code rendering before printing
      fixQRCodeRendering(printWindow);
      
      // Add additional script to ensure QR codes are rendered
      addQRRenderingScript(printWindow);
      
      setTimeout(() => {
        console.log("Triggering print");
        printWindow.print();
      }, 2000); // Increased delay to 2 seconds for better rendering
    };
  } catch (error) {
    console.error("Error in print function:", error);
    toast({
      title: "خطأ في الطباعة",
      description: "حدث خطأ أثناء محاولة الطباعة",
      variant: "destructive",
    });
  }
};

/**
 * Fix QR code rendering in the print window
 */
function fixQRCodeRendering(printWindow: Window): void {
  const qrElements = printWindow.document.querySelectorAll('.qr-code, .amount-barcode');
  qrElements.forEach(function(el) {
    // Force redraw of QR code elements by casting to HTMLElement
    const htmlEl = el as HTMLElement;
    htmlEl.style.display = 'block';
    htmlEl.style.visibility = 'visible';
    htmlEl.style.opacity = '0.99';
    setTimeout(function() {
      htmlEl.style.opacity = '1';
    }, 50);
  });
}
