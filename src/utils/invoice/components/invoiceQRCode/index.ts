
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
    
    // Set size based on document type - smaller for PDF to fit on one page
    const qrCodeSize = isPdf ? 100 : 100;
    
    return `
      <div class="qr-code-container" 
           style="display: flex !important; flex-direction: column !important; align-items: center !important; margin: ${isPdf ? '10px' : '20px'} auto !important; width: 100% !important; page-break-inside: avoid !important; break-inside: avoid !important; visibility: visible !important;">
        
        <!-- Main QR Code with explicit styling for print -->
        <div class="qr-code" 
             style="text-align: center !important; margin: 0 auto !important; border: 1px solid #ddd !important; padding: ${isPdf ? '5px' : '5px'} !important; background-color: white !important; border-radius: 5px !important; min-height: ${qrCodeSize}px !important; min-width: ${qrCodeSize}px !important; display: block !important; visibility: visible !important;">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=${qrCodeSize}x${qrCodeSize}&data=${encodeURIComponent(qrCodeData)}&margin=5" 
               alt="QR Code" 
               style="width: ${qrCodeSize}px !important; height: ${qrCodeSize}px !important; display: block !important; margin: 0 auto !important; visibility: visible !important;" 
               class="qr-code-img" />
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return `<div class="error-message">خطأ في إنشاء رمز الاستجابة السريعة</div>`;
  }
};
