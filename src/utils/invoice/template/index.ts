
import { Invoice, BusinessSettings } from "@/types";
import { getInvoiceStyles } from "../styles";
import { 
  generateInvoiceHeader,
  generateInvoiceDetails,
  generateInvoiceItemsTable,
  generateInvoiceSummary,
  generateInvoiceFooter,
  generateInvoiceQRCode
} from "../components";
import { generateRefundedWatermark } from "./watermark";
import { generateScriptContent } from "./scripts";

/**
 * Generates HTML content for printable invoice
 */
export const generateInvoiceTemplate = (invoice: Invoice, businessSettings?: BusinessSettings, isPdf: boolean = false): string => {
  console.log("Generating invoice template for invoice:", invoice.id, invoice.number);
  
  // Use default settings if none provided
  const settings = businessSettings || {
    name: "مطعم الذواق",
    nameAr: "مطعم الذواق",
    taxNumber: "300000000000003",
    address: "الرياض، المملكة العربية السعودية",
    addressAr: "الرياض، المملكة العربية السعودية",
    phone: "966500000000",
    email: "info@example.com",
    taxRate: 15,
    taxIncluded: false,
    invoiceNotesAr: "شكراً لزيارتكم"
  };
  
  // Generate refunded watermark if needed
  const refundedWatermark = generateRefundedWatermark(invoice);
  
  // Set container class based on the document type
  const containerClass = isPdf ? 'invoice-container pdf-mode' : 'invoice-container';
  
  // Generate scripts content
  const scriptContent = generateScriptContent(isPdf);
  
  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <title>فاتورة ${invoice.number}</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        ${getInvoiceStyles()}
      </style>
      <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body>
      <div class="${containerClass} delayed-content">
        ${refundedWatermark}
        
        ${generateInvoiceHeader(settings)}
        
        ${generateInvoiceDetails(invoice)}
        
        ${generateInvoiceItemsTable(invoice)}
        
        ${generateInvoiceSummary(invoice, settings)}
        
        ${generateInvoiceQRCode(invoice, isPdf)}
        
        ${generateInvoiceFooter(settings)}
      </div>

      <script>
        ${scriptContent}
      </script>
    </body>
    </html>
  `;
  
  return htmlContent;
};
