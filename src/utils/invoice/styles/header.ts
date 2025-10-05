
/**
 * Styles for invoice header section
 */
export const getHeaderStyles = (): string => `
  .invoice-header { 
    text-align: center; 
    margin-bottom: 12px;
    padding: 8px 0;
  }
  
  .invoice-header h1 {
    font-size: 18px;
    font-weight: 700;
    margin: 8px 0;
    line-height: 1.4;
  }
  
  .invoice-header p {
    font-size: 12px;
    line-height: 1.6;
    margin: 4px 0;
  }
  
  .logo { 
    max-width: 120px; 
    max-height: 60px; 
    margin: 0 auto 8px;
    display: block;
  }
  
  .brand-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }
  
  .brand-name {
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
    margin-top: 3px;
  }
  
  .brand-name-primary {
    color: #00825A;
  }
  
  .brand-name-accent {
    color: #FF6B00;
  }
  
  @media print {
    .invoice-header h1 {
      font-size: 16px;
    }
    
    .invoice-header p {
      font-size: 11px;
    }
  }
`;
