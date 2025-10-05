
/**
 * Table styles for invoice
 */
export const getTableStyles = (): string => `
  .invoice-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    table-layout: fixed;
  }
  
  .invoice-table th,
  .invoice-table td {
    padding: 8px 5px;
    border: 1px solid #d0d0d0;
    text-align: right;
    font-size: 13px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    max-width: 100%;
    font-weight: 500;
  }
  
  .invoice-table th {
    background-color: #f5f5f5;
    font-weight: 700;
    font-size: 14px;
  }
  
  .invoice-table th:nth-child(1) {
    width: 10%;
  }
  
  .invoice-table th:nth-child(2) {
    width: 40%;
  }
  
  .invoice-table th:nth-child(3),
  .invoice-table th:nth-child(4),
  .invoice-table th:nth-child(5) {
    width: 16.66%;
  }
  
  .invoice-table tr:nth-child(even) {
    background-color: #f8f8f8;
  }
  
  .invoice-empty-items {
    text-align: center;
    padding: 15px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    color: #999;
    margin: 12px 0;
  }
  
  @media print {
    .invoice-table {
      page-break-inside: auto;
      width: 100%;
    }
    
    .invoice-table tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }
    
    .invoice-table thead {
      display: table-header-group;
    }
    
    .invoice-table tfoot {
      display: table-footer-group;
    }

    .invoice-table th,
    .invoice-table td {
      padding: 8px 5px;
      font-size: 13px;
      font-weight: 500;
    }
    
    .invoice-table th {
      font-size: 14px;
      font-weight: 700;
      background-color: #f5f5f5 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;
