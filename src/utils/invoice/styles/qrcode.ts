
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
  }
  
  .qr-code canvas,
  .qr-code img,
  .qr-code svg {
    max-width: 100px !important;
    height: auto !important;
    margin: 0 auto;
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
  }
  
  .amount-barcode canvas,
  .amount-barcode img,
  .amount-barcode svg {
    max-width: 70px !important;
    height: auto !important;
    margin: 0 auto;
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
  
  @media print {
    .qr-code-container {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      margin: 20px auto !important;
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
    }
    
    .qr-code canvas,
    .qr-code img,
    .qr-code svg,
    .amount-barcode canvas,
    .amount-barcode img,
    .amount-barcode svg {
      display: block !important;
      margin: 0 auto !important;
    }
  }
`;
