
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
      <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
        
        ${getInvoiceStyles()}
        
        /* Ensure invoice fits on one page */
        @page {
          size: ${isPdf ? 'A4' : '80mm auto'};
          margin: ${isPdf ? '5mm' : '0'};
        }
        
        * {
          box-sizing: border-box;
          font-family: 'Tajawal', sans-serif !important;
        }
        
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Tajawal', sans-serif !important;
        }
        
        .invoice-container {
          page-break-inside: avoid;
          page-break-after: always;
          font-family: 'Tajawal', sans-serif !important;
        }
        
        .compact-invoice {
          font-size: 100%;
          line-height: 1.4;
          font-family: 'Tajawal', sans-serif !important;
        }
        
        .compact-invoice p {
          margin: 4px 0;
          font-family: 'Tajawal', sans-serif !important;
        }
        
        .compact-invoice h1, .compact-invoice h2, .compact-invoice h3 {
          font-weight: 700;
          font-family: 'Tajawal', sans-serif !important;
        }
        
        @media print {
          * {
            font-family: 'Tajawal', sans-serif !important;
          }
          
          body, html {
            font-family: 'Tajawal', sans-serif !important;
          }
          
          p, h1, h2, h3, h4, h5, h6, span, div, td, th, label, input, button {
            font-family: 'Tajawal', sans-serif !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="${containerClass} delayed-content compact-invoice">
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
