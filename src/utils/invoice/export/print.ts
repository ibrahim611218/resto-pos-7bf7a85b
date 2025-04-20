
import { Invoice, BusinessSettings } from "@/types";
import { 
  generateInvoiceHeader, 
  generateInvoiceDetails, 
  generateInvoiceItemsTable, 
  generateInvoiceSummary, 
  generateInvoiceFooter, 
  generateInvoiceQRCode
} from "../components";

export interface PrintWindowOptions {
  title?: string;
  stylesheets?: string[];
  additionalStyles?: string;
  onAfterPrint?: () => void;
}

/**
 * Open a print window with invoice content
 */
export const printInvoice = (invoice: Invoice, settings?: BusinessSettings): void => {
  try {
    console.log("Printing invoice:", invoice.id, invoice.number);
    
    // Generate HTML sections
    const headerHtml = settings ? generateInvoiceHeader(settings) : '<h1>فاتورة</h1>';
    const detailsHtml = generateInvoiceDetails(invoice);
    const itemsHtml = generateInvoiceItemsTable(invoice);
    const summaryHtml = settings ? generateInvoiceSummary(invoice, settings) : '';
    const footerHtml = settings ? generateInvoiceFooter(settings) : '';
    const qrCodeHtml = generateInvoiceQRCode(invoice);
    
    const printContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <title>فاتورة ${invoice.number}</title>
          <style>
            @media print {
              @page { size: 80mm auto; margin: 0; }
              body { font-family: Arial, sans-serif; padding: 5mm; }
              .receipt { width: 70mm; max-width: 70mm; }
              .invoice-header { text-align: center; margin-bottom: 10px; }
              .logo { max-width: 60mm; max-height: 30mm; }
              .invoice-details { margin-bottom: 10px; font-size: 12px; }
              .invoice-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 12px; }
              .invoice-table th, .invoice-table td { padding: 5px; text-align: right; border-bottom: 1px dashed #ddd; }
              .invoice-summary { margin: 10px 0; font-size: 12px; }
              .total-row { font-weight: bold; }
              .qr-code-container { text-align: center; margin: 10px 0; }
              .qr-code img { display: block; margin: 0 auto; }
              .invoice-footer { text-align: center; font-size: 10px; margin-top: 10px; }
            }
            body { font-family: Arial, sans-serif; }
            .receipt { width: 100%; }
            .invoice-header { text-align: center; margin-bottom: 20px; }
            .logo { max-width: 200px; max-height: 100px; }
            .invoice-details { margin-bottom: 20px; }
            .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .invoice-table th, .invoice-table td { padding: 8px; text-align: right; border-bottom: 1px solid #ddd; }
            .invoice-summary { margin: 20px 0; }
            .total-row { font-weight: bold; }
            .qr-code-container { text-align: center; margin: 20px 0; }
            .qr-code img { display: block; margin: 0 auto; }
            .invoice-footer { text-align: center; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="receipt">
            ${headerHtml}
            ${detailsHtml}
            ${itemsHtml}
            ${summaryHtml}
            ${qrCodeHtml}
            ${footerHtml}
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error("Could not open print window. Please check if pop-ups are blocked.");
      return;
    }
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load before printing
    printWindow.onload = () => {
      try {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      } catch (err) {
        console.error("Error while printing:", err);
        printWindow.close();
      }
    };
    
  } catch (error) {
    console.error("Error in printInvoice:", error);
  }
};
