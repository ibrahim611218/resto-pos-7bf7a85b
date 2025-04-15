
/**
 * Styles for QR code section
 */
export const getQRCodeStyles = (): string => `
  .qr-code { 
    text-align: center; 
    margin: 20px auto;
    padding: 10px;
    background-color: white;
    display: block;
    width: fit-content;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
  }
  
  .qr-code img {
    display: inline-block !important;
    width: 100px;
    height: 100px;
  }

  @media print {
    .qr-code {
      display: block !important;
      margin: 20px auto !important;
    }
    
    .qr-code img, .qr-code canvas {
      display: inline-block !important;
      width: 100px !important;
      height: 100px !important;
    }
  }
`;
