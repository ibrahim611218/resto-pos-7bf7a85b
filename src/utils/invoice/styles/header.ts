
/**
 * Styles for invoice header section
 */
export const getHeaderStyles = (): string => `
  .invoice-header { 
    text-align: center; 
    margin-bottom: 10px; 
  }
  
  .logo { 
    max-width: 120px; 
    max-height: 60px; 
    margin: 0 auto;
    display: block;
  }
  
  .brand-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
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
`;
