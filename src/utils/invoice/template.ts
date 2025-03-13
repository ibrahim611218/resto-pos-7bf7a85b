
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
  
  // إضافة العلامة المائية إذا كانت الفاتورة مسترجعة
  const refundedWatermark = invoice.status === "refunded" ? `
    <div class="watermark">
      مسترجعة
    </div>
  ` : '';
  
  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
      <title>فاتورة ${invoice.number}</title>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap">
      <style>
        ${getInvoiceStyles()}
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          font-size: 96px;
          color: rgba(255, 0, 0, 0.15);
          font-weight: bold;
          z-index: 100;
          pointer-events: none;
          white-space: nowrap;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        ${refundedWatermark}
        
        ${generateInvoiceHeader(settings)}
        
        ${generateInvoiceDetails(invoice)}
        
        ${generateInvoiceItemsTable(invoice)}
        
        ${generateInvoiceSummary(invoice, settings)}
        
        <div class="qr-code">
          ${qrCodeString}
        </div>
        
        ${generateInvoiceFooter(settings)}
      </div>

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
