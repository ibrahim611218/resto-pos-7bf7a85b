
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
  console.log("Generating invoice template for invoice:", invoice.id, invoice.number);
  console.log("Using business settings:", businessSettings);
  
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
  
  // Generate QR code with explicit size
  const qrCodeElement = React.createElement(QRCodeCanvas, { 
    value: generateInvoiceQRCodeData(invoice), 
    size: 120,
    style: { width: '100px', height: '100px' }
  });
  const qrCodeString = renderToString(qrCodeElement);
  
  // إضافة العلامة المائية إذا كانت الفاتورة مسترجعة
  const refundedWatermark = invoice.status === "refunded" ? `
    <div class="watermark">
      مسترجعة
    </div>
  ` : '';
  
  console.log("Invoice items:", invoice.items.length);
  console.log("Invoice status:", invoice.status);
  
  // Force inline styles for QR code to ensure it displays properly
  const explicitQRCode = `
    <div class="qr-code" style="text-align: center; margin: 20px auto; padding: 10px; background-color: white; display: block; width: fit-content; border-radius: 8px; border: 1px solid #e5e5e5;">
      ${qrCodeString.replace('<canvas', '<canvas style="width: 100px; height: 100px; display: inline-block !important;"')}
    </div>
  `;
  
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
      <div class="invoice-container">
        ${refundedWatermark}
        
        ${generateInvoiceHeader(settings)}
        
        ${generateInvoiceDetails(invoice)}
        
        ${generateInvoiceItemsTable(invoice)}
        
        ${generateInvoiceSummary(invoice, settings)}
        
        ${explicitQRCode}
        
        ${generateInvoiceFooter(settings)}
      </div>

      <script>
        window.onload = function() {
          console.log("Invoice print window loaded");
          // Force print after short delay to ensure everything is rendered
          setTimeout(function() {
            document.body.offsetHeight;
            window.focus();
          }, 300);
        };
      </script>
    </body>
    </html>
  `;
  
  console.log("HTML content generated with length:", htmlContent.length);
  return htmlContent;
};
