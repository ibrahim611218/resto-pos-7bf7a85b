
/**
 * Styles for the QR code section of the invoice
 */
export const getQRCodeStyles = (): string => `
  .qr-code-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px auto;
    width: 100%;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .qr-code {
    text-align: center;
    margin: 5px auto;
    max-width: 100px;
    border: 1px solid #ddd;
    padding: 5px;
    border-radius: 5px;
    background-color: white;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .qr-code canvas,
  .qr-code img,
  .qr-code svg {
    max-width: 90px !important;
    height: auto !important;
    margin: 0 auto !important;
    display: block !important;
  }
  
  @media print {
    .qr-code-container {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      margin: 10px auto !important;
      width: 100% !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      visibility: visible !important;
    }
    
    .qr-code {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      background-color: white !important;
      border: 1px solid #ddd !important;
      padding: 3px !important;
      margin-left: auto !important;
      margin-right: auto !important;
      margin-top: 5px !important;
      margin-bottom: 5px !important;
      visibility: visible !important;
      display: block !important;
    }
  }
`;
