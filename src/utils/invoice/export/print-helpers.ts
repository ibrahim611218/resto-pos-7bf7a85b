
import { toast } from "@/hooks/use-toast";
import { fixQRCodeRendering, addQRRenderingScript } from "./qr-helpers";
import { PrintWindowOptions } from "./types";

/**
 * Opens a print window with the given HTML content
 */
export const openPrintWindow = (
  htmlContent: string,
  options: PrintWindowOptions = {}
): Window | null => {
  try {
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      toast({
        title: "تنبيه",
        description: "يرجى السماح بالنوافذ المنبثقة للطباعة",
        variant: "destructive",
      });
      return null;
    }
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    return printWindow;
  } catch (error) {
    console.error("Error opening print window:", error);
    return null;
  }
};

/**
 * Adds a print button to the print window
 */
export const addPrintButton = (printWindow: Window): void => {
  const printButton = printWindow.document.createElement('button');
  printButton.innerHTML = 'طباعة الفاتورة';
  printButton.className = 'print-button no-print';
  printButton.onclick = function() {
    printWindow.print();
  };
  printWindow.document.body.appendChild(printButton);
};

/**
 * Sets up print window styling and printing behavior
 */
export const setupPrintWindow = (
  printWindow: Window,
  options: PrintWindowOptions = {}
): void => {
  printWindow.onload = function() {
    try {
      // Set the document title for the PDF file name
      if (options.title) {
        printWindow.document.title = options.title;
      }
      
      // Add media print styles to hide buttons when printing
      const style = printWindow.document.createElement('style');
      style.innerHTML = `
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; padding: 0; }
          @page { size: 210mm 297mm; margin: 10mm; }
          
          /* Critical QR code print fixes */
          .qr-code-container {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            margin: 20px auto !important;
            width: 100% !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            visibility: visible !important;
          }
          
          .qr-code, .amount-barcode {
            display: block !important;
            visibility: visible !important;
            background-color: white !important;
          }
          
          .qr-code svg, .amount-barcode svg {
            display: block !important;
            visibility: visible !important;
          }
        }
        
        .print-button {
          background-color: #0f766e;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          margin: 10px;
          position: fixed;
          top: 10px;
          right: 10px;
        }
        .print-button:hover {
          background-color: #115e59;
        }
      `;
      printWindow.document.head.appendChild(style);
      
      // Add PDF mode class to container
      const container = printWindow.document.querySelector('.invoice-container');
      if (container) {
        container.classList.add('pdf-mode');
      }
      
      // Add print button
      addPrintButton(printWindow);
      
      // Force QR code rendering before printing
      fixQRCodeRendering(printWindow);
      
      // Print automatically after a delay if requested
      if (options.printAutomatically !== false) {
        setTimeout(() => {
          printWindow.print();
        }, options.delay || 1500);
      }
    } catch (error) {
      console.error("Error setting up print window:", error);
      printWindow.close();
      
      toast({
        title: "خطأ في تصدير الفاتورة",
        description: "حدث خطأ أثناء تصدير الفاتورة",
        variant: "destructive",
      });
    }
  };
};
