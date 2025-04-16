
/**
 * Styles for the QR code section of the invoice
 */
export const getQRCodeStyles = (): string => `
  .qr-code-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px auto;
    width: 100%;
  }
  
  .qr-code {
    text-align: center;
    margin: 8px auto;
    max-width: 100px;
  }
  
  .qr-code canvas,
  .qr-code img,
  .qr-code svg {
    max-width: 90px !important;
    height: auto !important;
    margin: 0 auto;
    display: block !important;
  }
  
  .amount-barcode {
    text-align: center;
    margin: 8px auto;
    max-width: 80px;
  }
  
  .amount-barcode canvas,
  .amount-barcode img,
  .amount-barcode svg {
    max-width: 60px !important;
    height: auto !important;
    margin: 0 auto;
    display: block !important;
  }
  
  .barcode-label {
    font-size: 9px;
    margin-bottom: 3px;
    font-weight: bold;
    text-align: center;
  }
  
  .barcode-amount {
    font-size: 9px;
    margin-top: 3px;
    text-align: center;
  }
  
  @media print {
    .qr-code-container {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    
    .qr-code,
    .amount-barcode {
      break-inside: avoid;
      page-break-inside: avoid;
      margin-left: auto;
      margin-right: auto;
    }
    
    .qr-code canvas,
    .qr-code img,
    .qr-code svg,
    .amount-barcode canvas,
    .amount-barcode img,
    .amount-barcode svg {
      display: block !important;
      margin: 0 auto;
    }
  }
`;
