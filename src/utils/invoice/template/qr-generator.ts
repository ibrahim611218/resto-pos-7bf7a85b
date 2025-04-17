
import { Invoice } from "@/types";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import { renderToString } from "react-dom/server";
import { generateInvoiceQRCodeData } from "../qrcode";

/**
 * Generate QR code content for invoice
 */
export const generateQRCodes = (invoice: Invoice, isPdf: boolean = false): {
  qrCodeString: string;
  amountBarcodeString: string;
  explicitQRCode: string;
} => {
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
  
  return {
    qrCodeString,
    amountBarcodeString,
    explicitQRCode
  };
};
