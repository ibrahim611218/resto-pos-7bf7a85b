
/**
 * Styles for the QR code section of the invoice
 */
export const getQRCodeStyles = (): string => `
  .qr-code-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
    width: 100%;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .qr-code {
    text-align: center;
    margin: 10px auto;
    max-width: 120px;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 5px;
    background-color: white;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .qr-code canvas,
  .qr-code img,
  .qr-code svg {
    max-width: 100px !important;
    height: auto !important;
    margin: 0 auto !important;
    display: block !important;
  }
  
  .amount-barcode {
    text-align: center;
    margin: 10px auto;
    max-width: 90px;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 5px;
    background-color: white;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .amount-barcode canvas,
  .amount-barcode img,
  .amount-barcode svg {
    max-width: 70px !important;
    height: auto !important;
    margin: 0 auto !important;
    display: block !important;
  }
  
  .barcode-label {
    font-size: 11px;
    margin-bottom: 5px;
    font-weight: bold;
    text-align: center;
  }
  
  .barcode-amount {
    font-size: 11px;
    margin-top: 5px;
    text-align: center;
  }
  
  /* Add more explicit print media styles */
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
    
    .qr-code,
    .amount-barcode {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      background-color: white !important;
      border: 1px solid #ddd !important;
      padding: 8px !important;
      margin-left: auto !important;
      margin-right: auto !important;
      margin-top: 10px !important;
      margin-bottom: 10px !important;
      visibility: visible !important;
      display: block !important;
    }
    
    .qr-code canvas,
    .qr-code img,
    .qr-code svg,
    .amount-barcode canvas,
    .amount-barcode img,
    .amount-barcode svg {
      max-height: 100px !important;
      width: auto !important;
      margin: 0 auto !important;
      display: block !important;
      visibility: visible !important;
    }
    
    .barcode-label,
    .barcode-amount {
      visibility: visible !important;
      display: block !important;
    }
  }
`;
