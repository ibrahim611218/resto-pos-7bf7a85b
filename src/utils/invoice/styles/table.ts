
/**
 * Styles for invoice table
 */
export const getTableStyles = (): string => `
  .invoice-table { 
    width: 100%; 
    border-collapse: collapse; 
    margin: 20px 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .invoice-table th, .invoice-table td { 
    border: 1px solid #ddd; 
    padding: 8px; 
    text-align: right; 
  }
  
  .invoice-table th { 
    background-color: #004d40; 
    color: white;
    font-weight: bold;
  }
  
  .invoice-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .total-row {
    font-weight: bold;
    font-size: 1.2em;
    background-color: #f0f7f4 !important;
  }
  
  .invoice-empty-items {
    text-align: center;
    padding: 20px;
    border: 1px dashed #ddd;
    margin: 20px 0;
  }

  @media print {
    .invoice-table th {
      background-color: #004d40 !important;
      color: white !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .invoice-table tr:nth-child(even) {
      background-color: #f2f2f2 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .total-row {
      background-color: #f0f7f4 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;
