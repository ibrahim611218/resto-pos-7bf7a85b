
/**
 * Styles for the QR code section of the invoice
 */
export const getQRCodeStyles = (): string => `
  .qr-code {
    text-align: center;
    margin: 20px auto;
    max-width: 140px;
  }
  
  .qr-code canvas,
  .qr-code img {
    max-width: 120px !important;
    height: auto !important;
    margin: 0 auto;
    display: block !important;
  }
  
  .amount-barcode {
    text-align: center;
    margin: 10px auto 20px;
    max-width: 100px;
  }
  
  .amount-barcode canvas,
  .amount-barcode img {
    max-width: 80px !important;
    height: auto !important;
    margin: 0 auto;
    display: block !important;
  }
  
  .barcode-label {
    font-size: 10px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .barcode-amount {
    font-size: 10px;
    margin-top: 5px;
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
