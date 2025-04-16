
/**
 * Styles for the QR code section of the invoice
 */
export const getQRCodeStyles = (): string => `
  .qr-code {
    text-align: center;
    margin: 10px auto;
    max-width: 120px;
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
    margin: 8px auto 15px;
    max-width: 90px;
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
    font-size: 9px;
    margin-bottom: 3px;
    font-weight: bold;
  }
  
  .barcode-amount {
    font-size: 9px;
    margin-top: 3px;
  }
  
  @media print {
    .qr-code,
    .amount-barcode {
      break-inside: avoid;
      page-break-inside: avoid;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;
