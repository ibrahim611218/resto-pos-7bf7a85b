
import { Invoice, BusinessSettings, InvoiceExportType } from "@/types";
import { toast } from "@/hooks/use-toast";
import { printInvoice } from "./print";
import { exportInvoiceToPDF } from "./pdf";
import { emailInvoice } from "./email";

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
      printInvoice(invoice, businessSettings);
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

// Re-export everything for backward compatibility
export { printInvoice } from "./print";
export { exportInvoiceToPDF } from "./pdf";
export { emailInvoice } from "./email";
export * from "./types";
