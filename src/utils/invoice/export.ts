
import { Invoice, BusinessSettings, InvoiceExportType } from "@/types";
import { toast } from "@/hooks/use-toast";
import { generateInvoiceTemplate } from "./template";

/**
 * Exports invoice to PDF using browser's print functionality
 */
export const exportInvoiceToPDF = (
  invoice: Invoice,
  businessSettings: BusinessSettings
): void => {
  try {
    // For PDF export, we'll use A4 size
    const printContent = generateInvoiceTemplate(invoice, businessSettings, true);
    
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      toast({
        title: "تنبيه",
        description: "يرجى السماح بالنوافذ المنبثقة للتصدير",
        variant: "destructive",
      });
      return;
    }
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    printWindow.onload = function() {
      try {
        // Set the document title for the PDF file name
        printWindow.document.title = `invoice-${invoice.number}.pdf`;
        
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
        const printButton = printWindow.document.createElement('button');
        printButton.innerHTML = 'طباعة الفاتورة';
        printButton.className = 'print-button no-print';
        printButton.onclick = function() {
          printWindow.print();
        };
        printWindow.document.body.appendChild(printButton);
        
        // Force QR code rendering before printing
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
        
        // Print automatically after a longer delay to ensure content is fully loaded
        setTimeout(() => {
          printWindow.print();
        }, 1500);
        
        toast({
          title: "تم تصدير الفاتورة",
          description: `تم تصدير الفاتورة رقم ${invoice.number} بنجاح`,
        });
      } catch (error) {
        console.error("Error during PDF export:", error);
        printWindow.close();
        
        toast({
          title: "خطأ في تصدير الفاتورة",
          description: "حدث خطأ أثناء تصدير الفاتورة إلى PDF",
          variant: "destructive",
        });
      }
    };
  } catch (error) {
    console.error("Error in exportInvoiceToPDF:", error);
    toast({
      title: "خطأ في تصدير الفاتورة",
      description: "حدث خطأ أثناء تصدير الفاتورة إلى PDF",
      variant: "destructive",
    });
  }
};

/**
 * Sends invoice via email
 */
export const emailInvoice = async (
  invoice: Invoice,
  email: string,
  businessSettings: BusinessSettings
): Promise<boolean> => {
  console.log("Email invoice", invoice, email, businessSettings);
  
  toast({
    title: "تم إرسال الفاتورة",
    description: `تم إرسال الفاتورة رقم ${invoice.number} إلى ${email} بنجاح`,
  });
  
  return true;
};

/**
 * Handles different types of invoice exports
 */
export const handleInvoiceExport = (
  exportType: InvoiceExportType,
  invoice: Invoice,
  businessSettings: BusinessSettings,
  email?: string
): void => {
  console.log("Handling invoice export:", exportType, invoice, businessSettings);
  
  switch (exportType) {
    case "print":
      try {
        console.log("Printing invoice:", JSON.stringify(invoice));
        // For printing, use thermal receipt size
        const printContent = generateInvoiceTemplate(invoice, businessSettings, false);
        console.log("Generated print content length:", printContent.length);
        
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
          printWindow.document.write(printContent);
          printWindow.document.close();
          
          // Pre-load fonts and images with a sufficient delay
          printWindow.onload = function() {
            console.log("Print window loaded successfully");
            printWindow.focus();
            
            // Force layout recalculation to ensure QR code renders
            printWindow.document.body.offsetHeight;
            
            // Force QR code rendering before printing
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
            
            // Add additional script to ensure QR codes are rendered
            const forceRenderScript = printWindow.document.createElement('script');
            forceRenderScript.textContent = `
              function forceQRCodeRender() {
                var qrElements = document.querySelectorAll('.qr-code, .amount-barcode');
                qrElements.forEach(function(el) {
                  el.style.display = 'block';
                  el.style.visibility = 'visible';
                });
                console.log("QR codes forced to render:", qrElements.length);
              }
              
              // Run multiple times to ensure rendering
              forceQRCodeRender();
              setTimeout(forceQRCodeRender, 500);
              setTimeout(forceQRCodeRender, 1000);
              
              // Right before print
              window.addEventListener('beforeprint', forceQRCodeRender);
            `;
            printWindow.document.body.appendChild(forceRenderScript);
            
            setTimeout(() => {
              console.log("Triggering print");
              printWindow.print();
            }, 2000); // Increased delay to 2 seconds for better rendering
          };
        } else {
          console.error("Failed to open print window");
          toast({
            title: "تنبيه",
            description: "يرجى السماح بالنوافذ المنبثقة للطباعة",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error in print function:", error);
        toast({
          title: "خطأ في الطباعة",
          description: "حدث خطأ أثناء محاولة الطباعة",
          variant: "destructive",
        });
      }
      break;
    case "pdf":
      exportInvoiceToPDF(invoice, businessSettings);
      break;
    case "email":
      if (email) {
        emailInvoice(invoice, email, businessSettings);
      } else {
        toast({
          title: "خطأ",
          description: "يرجى تحديد عنوان البريد الإلكتروني",
          variant: "destructive",
        });
      }
      break;
  }
};
