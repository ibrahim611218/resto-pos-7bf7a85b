
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { InventoryItem } from '../types';
import { toast } from '@/hooks/use-toast';
import { calculateInventoryPercentage, getInventoryStatusColor } from './inventory-utils';
import { loadFontsForPDF, getFontStylesForPDF } from '@/assets/fonts';

/**
 * Export inventory report to PDF
 */
export const exportInventoryReportPDF = (
  inventoryData: InventoryItem[],
  isArabic: boolean
): boolean => {
  try {
    console.log("Starting inventory PDF export, isArabic:", isArabic);
    
    // Create PDF document
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      compress: true
    });
    
    // Load fonts for PDF
    loadFontsForPDF(doc, isArabic);
    
    // Get font styles
    const fontStyles = getFontStylesForPDF(isArabic);
    
    // Set text direction and font
    if (isArabic) {
      doc.setFont('Tajawal', 'normal');
      doc.setR2L(true);
      console.log('Inventory report font:', doc.getFont());
    }
    
    // Add title
    doc.setFontSize(18);
    const title = isArabic ? "تقرير المخزون" : "Inventory Report";
    const titleX = isArabic ? doc.internal.pageSize.width - 20 : 20;
    doc.text(title, titleX, 20, { align: isArabic ? "right" : "left" });
    
    // Create table headers
    const headers = [
      isArabic ? "رقم" : "ID",
      isArabic ? "اسم المنتج" : "Product Name",
      isArabic ? "الكمية" : "Quantity",
      isArabic ? "الوحدة" : "Unit",
      isArabic ? "حد إعادة الطلب" : "Reorder Level",
      isArabic ? "آخر تحديث" : "Last Updated",
      isArabic ? "نسبة المخزون" : "Inventory %"
    ];
    
    // Create table data
    const data = inventoryData.map(item => [
      item.id,
      item.name,
      item.quantity.toFixed(2),
      item.unit,
      item.reorderLevel.toString(),
      item.lastUpdated,
      `${calculateInventoryPercentage(item.quantity, item.originalQuantity)}%`
    ]);
    
    // Generate table
    // @ts-ignore - jspdf-autotable typing issue
    doc.autoTable({
      startY: 30,
      head: [headers],
      body: data,
      theme: 'grid',
      headStyles: {
        fillColor: [16, 185, 129],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: isArabic ? 'right' : 'left',
        font: fontStyles.font
      },
      styles: {
        font: fontStyles.font,
        halign: isArabic ? 'right' : 'left'
      },
      didDrawPage: function(data: any) {
        // Reset RTL setting and font on each page for Arabic
        if (isArabic) {
          doc.setR2L(true);
          doc.setFont('Tajawal', 'normal');
        }
      },
      didDrawCell: function(data: any) {
        // Ensure font is maintained after each cell draw for Arabic
        if (isArabic && data.row && data.row.section === 'body') {
          doc.setFont('Tajawal', 'normal');
          doc.setR2L(true);
        }
      }
    });
    
    // Save the PDF
    doc.save("inventory_report.pdf");
    
    // Show success message
    toast({
      title: isArabic ? "تم التصدير بنجاح" : "Export Successful",
      description: isArabic ? "تم تصدير تقرير المخزون بنجاح" : "Inventory report has been exported successfully"
    });
    
    return true;
  } catch (error) {
    console.error("Error generating inventory PDF:", error);
    
    // Show error message
    toast({
      title: isArabic ? "خطأ في التصدير" : "Export Failed",
      description: isArabic ? "حدث خطأ أثناء تصدير التقرير" : "An error occurred while exporting the report",
      variant: "destructive"
    });
    
    return false;
  }
};
