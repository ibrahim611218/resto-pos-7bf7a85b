
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
export const generateInvoiceTemplate = (invoice: Invoice, businessSettings: BusinessSettings): string => {
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
      ${generateInvoiceHeader(businessSettings)}
      
      ${generateInvoiceDetails(invoice)}
      
      ${generateInvoiceItemsTable(invoice)}
      
      ${generateInvoiceSummary(invoice, businessSettings)}
      
      <div class="qr-code">
        ${qrCodeString}
      </div>
      
      ${generateInvoiceFooter(businessSettings)}

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
