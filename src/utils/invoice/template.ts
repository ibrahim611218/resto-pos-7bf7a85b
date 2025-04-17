
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
  
  // Generate QR code data with timestamp to prevent caching
  const qrCodeData = generateInvoiceQRCodeData(invoice);
  
  // Generate main QR code with inline SVG (more reliable for printing)
  const qrCodeSize = isPdf ? 120 : 90;
  const qrCodeElement = React.createElement(QRCodeCanvas, { 
    value: qrCodeData, 
    size: qrCodeSize,
    style: { 
      width: `${qrCodeSize}px`, 
      height: `${qrCodeSize}px`, 
      display: 'inline-block' 
    },
    bgColor: "#FFFFFF",
    fgColor: "#000000",
    level: "M",
    includeMargin: true,
  });
  const qrCodeString = renderToString(qrCodeElement);
  
  // Generate amount barcode with inline SVG
  const parsedQRData = JSON.parse(qrCodeData);
  const amountBarcodeSize = isPdf ? 80 : 60;
  const amountBarcodeElement = React.createElement(QRCodeCanvas, { 
    value: parsedQRData.total.toString(), 
    size: amountBarcodeSize,
    style: { 
      width: `${amountBarcodeSize}px`, 
      height: `${amountBarcodeSize}px`, 
      display: 'inline-block' 
    },
    bgColor: "#FFFFFF",
    fgColor: "#000000",
    level: "M",
    includeMargin: true,
  });
  const amountBarcodeString = renderToString(amountBarcodeElement);
  
  // Add watermark for refunded invoices
  const refundedWatermark = invoice.status === "refunded" ? `
    <div class="watermark">
      مسترجعة
    </div>
  ` : '';
  
  // Create more reliable QR code container with inline styles for printing
  const explicitQRCode = `
    <div class="qr-code-container" style="display: flex; flex-direction: column; align-items: center; margin: 10px auto; width: 100%; page-break-inside: avoid; break-inside: avoid;">
      <div class="qr-code" style="text-align: center; margin: 8px auto; border: 1px solid #ddd; padding: 5px; background-color: white; border-radius: 5px; min-height: ${qrCodeSize}px; min-width: ${qrCodeSize}px;">
        ${qrCodeString}
      </div>
      <div class="amount-barcode" style="text-align: center; margin: 8px auto; border: 1px solid #ddd; padding: 5px; background-color: white; border-radius: 5px; min-height: ${amountBarcodeSize}px; min-width: ${amountBarcodeSize}px;">
        <div style="font-size: 9px; margin-bottom: 3px; font-weight: bold; text-align: center;">رمز المبلغ</div>
        ${amountBarcodeString}
        <div style="font-size: 9px; margin-top: 3px; text-align: center;">المبلغ: ${parsedQRData.total.toFixed(2)} ر.س</div>
      </div>
    </div>
  `;
  
  const containerClass = isPdf ? 'invoice-container pdf-mode' : 'invoice-container';
  
  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <title>فاتورة ${invoice.number}</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        ${getInvoiceStyles()}

        /* Additional print-specific styles for QR codes */
        @media print {
          .qr-code-container {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            margin: 20px auto !important;
            width: 100% !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            visibility: visible !important;
          }
          
          .qr-code, .amount-barcode {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            background-color: white !important;
            border: 1px solid #ddd !important;
            padding: 5px !important;
            margin: 10px auto !important;
            display: block !important;
            visibility: visible !important;
          }
          
          .qr-code canvas, .qr-code img, .qr-code svg,
          .amount-barcode canvas, .amount-barcode img, .amount-barcode svg {
            display: block !important;
            margin: 0 auto !important;
            visibility: visible !important;
            max-height: 100px !important;
            max-width: 100px !important;
          }
          
          .barcode-label, .barcode-amount {
            visibility: visible !important;
            display: block !important;
          }
        }
        
        /* Hide content while loading to prevent flicker */
        .delayed-content {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .content-loaded {
          opacity: 1;
        }
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
        
        ${explicitQRCode}
        
        ${generateInvoiceFooter(settings)}
      </div>

      <script>
        window.onload = function() {
          console.log("Invoice print window loaded");
          
          // Show content once loaded
          document.querySelector('.delayed-content').classList.add('content-loaded');
          
          // Force QR code rendering
          function forceQRCodeRender() {
            console.log("Forcing QR code rendering");
            var qrElements = document.querySelectorAll('.qr-code, .amount-barcode');
            qrElements.forEach(function(el) {
              // Force redraw of elements
              el.style.display = 'block';
              el.style.visibility = 'visible';
              el.style.opacity = '0.99';
              setTimeout(function() {
                el.style.opacity = '1';
              }, 50);
              
              // Make sure all SVGs inside are visible
              var svgs = el.querySelectorAll('svg, canvas, img');
              svgs.forEach(function(svg) {
                svg.style.display = 'block';
                svg.style.visibility = 'visible';
              });
            });
          }
          
          // Run rendering multiple times
          forceQRCodeRender();
          setTimeout(forceQRCodeRender, 500);
          setTimeout(forceQRCodeRender, 1000);
          
          // Also force rendering before print
          window.addEventListener('beforeprint', forceQRCodeRender);
          
          setTimeout(function() {
            window.focus();
            forceQRCodeRender(); // Force one more time before print
            // Don't auto-print in PDF mode
            ${!isPdf ? 'window.print();' : ''}
          }, 2000);
        };
      </script>
    </body>
    </html>
  `;
  
  return htmlContent;
};
