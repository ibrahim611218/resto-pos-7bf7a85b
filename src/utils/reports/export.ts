import * as XLSX from 'xlsx';

export const exportToExcel = (
  headers: string[],
  data: (string | number)[][],
  fileName: string
) => {
  try {
    // Create worksheet with headers
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    
    // Create workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    
    // Generate file and trigger download
    XLSX.writeFile(wb, `${fileName}.xlsx`);
    
    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return false;
  }
};

export const exportToPdf = (content: HTMLElement, fileName: string) => {
  // PDF export functionality would go here
  console.log('PDF export not implemented yet');
  return false;
};
