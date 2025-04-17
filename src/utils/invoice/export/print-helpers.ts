
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
  printButton.style.position = 'fixed';
  printButton.style.top = '10px';
  printButton.style.right = '10px';
  printButton.style.backgroundColor = '#0f766e';
  printButton.style.color = 'white';
  printButton.style.border = 'none';
  printButton.style.padding = '10px 15px';
  printButton.style.borderRadius = '4px';
  printButton.style.cursor = 'pointer';
  printButton.style.fontSize = '14px';
  printButton.style.zIndex = '9999';
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
      console.log("Print window loaded");
      
      // Set the document title for the PDF file name
      if (options.title) {
        printWindow.document.title = options.title;
      }
      
      // Add media print styles to hide buttons when printing
      const style = printWindow.document.createElement('style');
      style.innerHTML = `
        @media print {
          .no-print { display: none !important; }
          body { margin: 0 !important; padding: 0 !important; }
          @page { size: 80mm auto !important; margin: 0 !important; }
          
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
          
          .qr-code-img, .amount-code-img {
            display: block !important;
            visibility: visible !important;
            margin: 0 auto !important;
          }
        }
      `;
      printWindow.document.head.appendChild(style);
      
      // Add PDF mode class to container if needed
      const container = printWindow.document.querySelector('.invoice-container');
      if (container && options.isPdf) {
        container.classList.add('pdf-mode');
      }
      
      // Add print button
      addPrintButton(printWindow);
      
      // Force QR code visibility before printing
      setTimeout(() => {
        const qrImages = printWindow.document.querySelectorAll('.qr-code-img, .amount-code-img');
        qrImages.forEach((img: any) => {
          img.style.display = 'block';
          img.style.visibility = 'visible';
          console.log("QR image fixed:", img);
        });
        
        // Ensure container has finished rendering
        printWindow.document.querySelector('.delayed-content')?.classList.add('content-loaded');
        
        // Print automatically after a delay if requested
        if (options.printAutomatically !== false) {
          console.log("Auto printing in", options.delay || 1500, "ms");
          setTimeout(() => {
            printWindow.focus();
            printWindow.print();
          }, options.delay || 1500);
        }
      }, 500);
      
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
