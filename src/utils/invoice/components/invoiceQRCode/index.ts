
import { Invoice } from "@/types";
import { generateInvoiceQRCodeData } from "../../qrcode";

/**
 * Generates HTML for the invoice QR code section
 */
export const generateInvoiceQRCode = (invoice: Invoice, isPdf: boolean = false): string => {
  console.log("Generating QR code for invoice:", invoice.id, invoice.number);
  
  try {
    // Generate QR code data
    const qrCodeData = generateInvoiceQRCodeData(invoice);
    const parsedData = JSON.parse(qrCodeData);
    
    // Set size based on document type
    const qrCodeSize = isPdf ? 120 : 100;
    const amountBarcodeSize = isPdf ? 80 : 70;
    
    return `
      <div class="qr-code-container" 
           style="display: flex !important; flex-direction: column !important; align-items: center !important; margin: 20px auto !important; width: 100% !important; page-break-inside: avoid !important; break-inside: avoid !important; visibility: visible !important;">
        
        <!-- Main QR Code with explicit styling for print -->
        <div class="qr-code" 
             style="text-align: center !important; margin: 8px auto !important; border: 1px solid #ddd !important; padding: 5px !important; background-color: white !important; border-radius: 5px !important; min-height: ${qrCodeSize}px !important; min-width: ${qrCodeSize}px !important; display: block !important; visibility: visible !important;">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=${qrCodeSize}x${qrCodeSize}&data=${encodeURIComponent(qrCodeData)}&margin=5" 
               alt="QR Code" 
               style="width: ${qrCodeSize}px !important; height: ${qrCodeSize}px !important; display: block !important; margin: 0 auto !important; visibility: visible !important;" 
               class="qr-code-img" />
        </div>
        
        <!-- Amount Barcode with explicit styling for print -->
        <div class="amount-barcode"
             style="text-align: center !important; margin: 8px auto !important; border: 1px solid #ddd !important; padding: 5px !important; background-color: white !important; border-radius: 5px !important; min-height: ${amountBarcodeSize}px !important; min-width: ${amountBarcodeSize}px !important; display: block !important; visibility: visible !important;">
          <div style="font-size: 9px !important; margin-bottom: 3px !important; font-weight: bold !important; text-align: center !important; display: block !important; visibility: visible !important;">رمز المبلغ</div>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=${amountBarcodeSize}x${amountBarcodeSize}&data=${encodeURIComponent(parsedData.total.toString())}&margin=2" 
               alt="Amount Barcode" 
               style="width: ${amountBarcodeSize}px !important; height: ${amountBarcodeSize}px !important; display: block !important; margin: 0 auto !important; visibility: visible !important;" 
               class="amount-code-img" />
          <div style="font-size: 9px !important; margin-top: 3px !important; text-align: center !important; display: block !important; visibility: visible !important;">المبلغ: ${parsedData.total.toFixed(2)} ر.س</div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return `<div class="error-message">خطأ في إنشاء رمز الاستجابة السريعة</div>`;
  }
};
