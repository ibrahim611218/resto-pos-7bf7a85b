
/**
 * Styles for invoice header section
 */
export const getHeaderStyles = (): string => `
  .invoice-header { 
    text-align: center; 
    margin-bottom: 20px; 
  }
  
  .logo { 
    max-width: 150px; 
    max-height: 80px; 
    margin: 0 auto;
    display: block;
  }
  
  .brand-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .brand-name {
    font-size: 24px;
    font-weight: bold;
    display: inline-block;
    margin-top: 5px;
  }
  
  .brand-name-primary {
    color: #00825A;
  }
  
  .brand-name-accent {
    color: #FF6B00;
  }
`;
