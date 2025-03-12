
import { Invoice, BusinessSettings } from "@/types";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import { renderToString } from "react-dom/server";
import { generateInvoiceQRCodeData } from "./qrcode";
import { getInvoiceStyles } from "./styles";
import { generateInvoiceHeader } from "./components/invoiceHeader";
import { generateInvoiceDetails } from "./components/invoiceDetails";
import { generateInvoiceItemsTable } from "./components/invoiceItems";
import { generateInvoiceSummary } from "./components/invoiceSummary";
import { generateInvoiceFooter } from "./components/invoiceFooter";

/**
 * Generates HTML content for printable invoice
 */
export const generateInvoiceTemplate = (invoice: Invoice, businessSettings?: BusinessSettings): string => {
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
  
  // Generate QR code
  const qrCodeElement = React.createElement(QRCodeCanvas, { value: generateInvoiceQRCodeData(invoice), size: 100 });
  const qrCodeString = renderToString(qrCodeElement);
  
  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
      <title>فاتورة ${invoice.number}</title>
      <meta charset="UTF-8">
      <style>
        ${getInvoiceStyles()}
      </style>
    </head>
    <body>
      ${generateInvoiceHeader(settings)}
      
      ${generateInvoiceDetails(invoice)}
      
      ${generateInvoiceItemsTable(invoice)}
      
      ${generateInvoiceSummary(invoice, settings)}
      
      <div class="qr-code">
        ${qrCodeString}
      </div>
      
      ${generateInvoiceFooter(settings)}

      <script>
        window.onload = function() {
          // Auto print when loaded
          // window.print();
        };
      </script>
    </body>
    </html>
  `;
  
  return htmlContent;
};
