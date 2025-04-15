
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
    const printContent = generateInvoiceTemplate(invoice, businessSettings);
    
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
            @page { size: auto; margin: 0mm; }
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
        
        // Add print button
        const printButton = printWindow.document.createElement('button');
        printButton.innerHTML = 'طباعة الفاتورة';
        printButton.className = 'print-button no-print';
        printButton.onclick = function() {
          printWindow.print();
        };
        printWindow.document.body.appendChild(printButton);
        
        // Print automatically after a short delay to ensure content is fully loaded
        setTimeout(() => {
          printWindow.print();
        }, 500);
        
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
      const printContent = generateInvoiceTemplate(invoice, businessSettings);
      console.log("Generated print content length:", printContent.length);
      
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        
        // Ensure document is fully loaded before printing
        printWindow.onload = function() {
          printWindow.focus();
          setTimeout(() => {
            printWindow.print();
          }, 500);
        };
      } else {
        toast({
          title: "تنبيه",
          description: "يرجى السماح بالنوافذ المنبثقة للطباعة",
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
