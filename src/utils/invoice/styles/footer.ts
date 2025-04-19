
/**
 * Styles for invoice footer section
 */
export const getFooterStyles = (): string => `
  .invoice-footer { 
    margin-top: 20px; 
    text-align: center; 
    font-size: 11px;
    color: #666;
    padding-top: 10px;
    border-top: 1px dashed #ddd;
  }
  
  .software-info {
    margin-top: 15px;
    text-align: center;
    font-size: 9px;
    color: #999;
    padding-top: 8px;
    border-top: 1px solid #eee;
  }
  
  @media print {
    .invoice-footer {
      margin-top: 10px;
      font-size: 10px;
    }
    
    .software-info {
      margin-top: 8px;
      font-size: 8px;
    }
  }
`;
