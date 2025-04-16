
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
  
  // Generate main QR code with explicit size
  const qrCodeData = generateInvoiceQRCodeData(invoice);
  const qrCodeElement = React.createElement(QRCodeCanvas, { 
    value: qrCodeData, 
    size: 120,
    style: { width: '120px', height: '120px', display: 'inline-block' },
    bgColor: "#FFFFFF",
    fgColor: "#000000",
    level: "H",
    includeMargin: true,
  });
  const qrCodeString = renderToString(qrCodeElement);
  
  // Generate amount barcode
  const parsedQRData = JSON.parse(qrCodeData);
  const amountBarcodeElement = React.createElement(QRCodeCanvas, { 
    value: parsedQRData.total.toString(), 
    size: 80,
    style: { width: '80px', height: '80px', display: 'inline-block' },
    bgColor: "#FFFFFF",
    fgColor: "#000000",
    level: "M",
    includeMargin: true,
  });
  const amountBarcodeString = renderToString(amountBarcodeElement);
  
  // إضافة العلامة المائية إذا كانت الفاتورة مسترجعة
  const refundedWatermark = invoice.status === "refunded" ? `
    <div class="watermark">
      مسترجعة
    </div>
  ` : '';
  
  // Force inline styles for QR code to ensure it displays properly
  const explicitQRCode = `
    <div class="qr-code">
      ${qrCodeString}
    </div>
    <div class="amount-barcode">
      <div class="barcode-label">رمز المبلغ</div>
      ${amountBarcodeString}
      <div class="barcode-amount">المبلغ: ${parsedQRData.total.toFixed(2)} ر.س</div>
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
          setTimeout(function() {
            window.focus();
            window.print();
          }, 1000);
        };
      </script>
    </body>
    </html>
  `;
  
  return htmlContent;
};
