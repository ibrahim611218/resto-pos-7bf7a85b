
import { Invoice } from "@/types";
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
  
  // Parse the data for amount barcode
  const parsedQRData = JSON.parse(qrCodeData);
  
  // Generate sizes based on document type
  const qrCodeSize = isPdf ? 120 : 100;
  const amountBarcodeSize = isPdf ? 80 : 70;
  
  // Use QR code API service instead of SVG generation
  const qrCodeString = `
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=${qrCodeSize}x${qrCodeSize}&data=${encodeURIComponent(qrCodeData)}&margin=5" 
         alt="QR Code" 
         style="width: ${qrCodeSize}px; height: ${qrCodeSize}px; display: block; margin: 0 auto;" 
         class="qr-code-img" />
  `;
  
  const amountBarcodeString = `
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=${amountBarcodeSize}x${amountBarcodeSize}&data=${encodeURIComponent(parsedQRData.total.toString())}&margin=2" 
         alt="Amount Barcode" 
         style="width: ${amountBarcodeSize}px; height: ${amountBarcodeSize}px; display: block; margin: 0 auto;" 
         class="amount-code-img" />
  `;
  
  // Create more reliable QR code container with inline styles for printing
  const explicitQRCode = `
    <div class="qr-code-container" 
         style="display: flex !important; flex-direction: column !important; align-items: center !important; margin: 20px auto !important; width: 100% !important; page-break-inside: avoid !important; break-inside: avoid !important; visibility: visible !important;">
      
      <div class="qr-code" 
           style="text-align: center !important; margin: 8px auto !important; border: 1px solid #ddd !important; padding: 5px !important; background-color: white !important; border-radius: 5px !important; min-height: ${qrCodeSize}px !important; min-width: ${qrCodeSize}px !important; display: block !important; visibility: visible !important;">
        ${qrCodeString}
      </div>
      
      <div class="amount-barcode"
           style="text-align: center !important; margin: 8px auto !important; border: 1px solid #ddd !important; padding: 5px !important; background-color: white !important; border-radius: 5px !important; min-height: ${amountBarcodeSize}px !important; min-width: ${amountBarcodeSize}px !important; display: block !important; visibility: visible !important;">
        <div style="font-size: 9px !important; margin-bottom: 3px !important; font-weight: bold !important; text-align: center !important; display: block !important; visibility: visible !important;">رمز المبلغ</div>
        ${amountBarcodeString}
        <div style="font-size: 9px !important; margin-top: 3px !important; text-align: center !important; display: block !important; visibility: visible !important;">المبلغ: ${parsedQRData.total.toFixed(2)} ر.س</div>
      </div>
    </div>
  `;
  
  return {
    qrCodeString,
    amountBarcodeString,
    explicitQRCode
  };
};
