
/**
 * Styles for invoice summary sections
 */
export const getSummaryStyles = (): string => `
  .invoice-details { 
    margin-bottom: 12px; 
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #e5e5e5;
  }
  
  .invoice-details h2 {
    text-align: center;
    font-size: 15px;
    font-weight: 700;
    margin: 0 0 8px 0;
    line-height: 1.4;
  }
  
  .invoice-details p {
    font-size: 12px;
    line-height: 1.6;
    margin: 4px 0;
  }
  
  .invoice-summary { 
    margin-top: 10px; 
    text-align: left;
    width: 100%;
    max-width: 350px;
    margin-left: auto;
    background-color: #f9f9f9;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
  }
  
  .invoice-summary p {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    font-size: 12px;
  }
  
  .customer-info {
    margin-top: 8px;
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  @media print {
    .invoice-details,
    .invoice-summary {
      background-color: #f9f9f9 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      padding: 8px;
      margin: 6px auto;
    }
    
    .invoice-summary p {
      margin: 3px 0;
      font-size: 11px;
    }
  }
`;
