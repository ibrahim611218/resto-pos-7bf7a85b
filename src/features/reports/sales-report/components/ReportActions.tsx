
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, FileSpreadsheet } from "lucide-react";
import { printSalesReport, exportSalesReportExcel } from "../utils/export-utils";
import { Invoice } from "@/types";

interface ReportActionsProps {
  filteredInvoices: Invoice[];
  totalSales: number;
  startDate?: Date;
  endDate?: Date;
  isArabic: boolean;
}

const ReportActions: React.FC<ReportActionsProps> = ({
  filteredInvoices,
  totalSales,
  startDate,
  endDate,
  isArabic
}) => {
  const handlePrint = () => {
    printSalesReport({
      filteredInvoices,
      totalSales,
      startDate,
      endDate,
      isArabic
    });
  };
  
  const handleExportExcel = () => {
    exportSalesReportExcel({
      filteredInvoices,
      totalSales,
      startDate,
      endDate,
      isArabic
    });
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handlePrint}>
        <Printer className="h-4 w-4 mr-2" />
        {isArabic ? "طباعة" : "Print"}
      </Button>
      <Button onClick={handleExportExcel}>
        <FileSpreadsheet className="h-4 w-4 mr-2" />
        {isArabic ? "تصدير Excel" : "Export Excel"}
      </Button>
    </div>
  );
};

export default ReportActions;
