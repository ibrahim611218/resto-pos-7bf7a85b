
import * as XLSX from 'xlsx';
import { toast } from "@/hooks/use-toast";

interface ExcelExportConfig {
  headers: string[];
  data: (string | number)[][];
  fileName: string;
  title?: string;
  isArabic?: boolean;
}

/**
 * Enhanced Excel export with proper formatting and styling
 */
export const exportToExcel = ({
  headers,
  data,
  fileName,
  title,
  isArabic = false
}: ExcelExportConfig) => {
  try {
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);
    
    // Add title with merged cells if provided
    let rowIndex = 0;
    if (title) {
      XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: "A1" });
      ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }];
      rowIndex = 2; // Start after title row
    }
    
    // Add date row
    const dateText = isArabic 
      ? `تاريخ التقرير: ${new Date().toLocaleDateString("ar-SA")}`
      : `Report Date: ${new Date().toLocaleDateString("en-US")}`;
    XLSX.utils.sheet_add_aoa(ws, [[dateText]], { origin: `A${rowIndex + 1}` });
    
    if (!ws["!merges"]) ws["!merges"] = [];
    ws["!merges"].push({ s: { r: rowIndex, c: 0 }, e: { r: rowIndex, c: headers.length - 1 } });
    rowIndex += 2; // Add empty row after date
    
    // Add headers and data
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: `A${rowIndex + 1}` });
    XLSX.utils.sheet_add_aoa(ws, data, { origin: `A${rowIndex + 2}` });
    
    // Apply styles to cells
    applyExcelStyles(ws, headers.length, data.length + rowIndex + 2, isArabic);
    
    // Add worksheet to workbook with proper name
    XLSX.utils.book_append_sheet(wb, ws, fileName.substring(0, 31)); // Max 31 chars for sheet name
    
    // Generate filename with date
    const dateStr = new Date().toISOString().split('T')[0];
    const fullFileName = `${fileName}_${dateStr}.xlsx`;
    
    // Write file and trigger download
    XLSX.writeFile(wb, fullFileName);
    
    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    toast({
      title: isArabic ? "خطأ في التصدير" : "Export Error",
      description: isArabic ? "حدث خطأ أثناء إنشاء ملف Excel" : "An error occurred while creating the Excel file",
      variant: "destructive"
    });
    return false;
  }
};

/**
 * Applies styling to Excel worksheet cells
 */
const applyExcelStyles = (ws: XLSX.WorkSheet, colCount: number, rowCount: number, isArabic: boolean) => {
  // Set column widths
  ws["!cols"] = Array(colCount).fill({ wch: 15 });
  
  // Apply styles to cells
  const range = XLSX.utils.decode_range(ws["!ref"] || `A1:${String.fromCharCode(65 + colCount - 1)}${rowCount}`);
  
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell_ref = XLSX.utils.encode_cell({ r: R, c: C });
      if (!ws[cell_ref]) continue;
      
      // Initialize style object if it doesn't exist
      if (!ws[cell_ref].s) ws[cell_ref].s = {};
      
      // Title row - bold, centered, larger font
      if (R === 0) {
        ws[cell_ref].s.font = { bold: true, sz: 16 };
        ws[cell_ref].s.alignment = { horizontal: "center", vertical: "center" };
      }
      // Date row - medium size
      else if (R === 2) {
        ws[cell_ref].s.font = { sz: 12 };
        ws[cell_ref].s.alignment = { horizontal: "center", vertical: "center" };
      }
      // Header row - bold with background color
      else if (R === 3) {
        ws[cell_ref].s.font = { bold: true };
        ws[cell_ref].s.fill = { fgColor: { rgb: "DDDDDD" } };
        ws[cell_ref].s.alignment = { horizontal: isArabic ? "right" : "left", vertical: "center" };
      }
      // Data rows
      else {
        ws[cell_ref].s.alignment = { horizontal: isArabic ? "right" : "left", vertical: "center" };
      }
      
      // Add borders to all cells
      ws[cell_ref].s.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" }
      };
    }
  }
};
