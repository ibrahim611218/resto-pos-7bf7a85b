
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { exportToExcel } from "@/utils/reports/export";

// Mock inventory data
const inventoryData = [
  { id: "1", name: "دجاج", quantity: 25, unit: "كيلو", reorderLevel: 10, lastUpdated: "2023-08-10" },
  { id: "2", name: "لحم بقري", quantity: 15, unit: "كيلو", reorderLevel: 5, lastUpdated: "2023-08-12" },
  { id: "3", name: "أرز", quantity: 50, unit: "كيلو", reorderLevel: 15, lastUpdated: "2023-08-05" },
  { id: "4", name: "زيت", quantity: 30, unit: "لتر", reorderLevel: 10, lastUpdated: "2023-08-07" },
  { id: "5", name: "طماطم", quantity: 20, unit: "كيلو", reorderLevel: 8, lastUpdated: "2023-08-11" },
];

const InventoryReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [reportData] = useState(inventoryData);

  const handleExport = () => {
    const headers = isArabic 
      ? ["رقم", "اسم المنتج", "الكمية", "الوحدة", "حد إعادة الطلب", "آخر تحديث"]
      : ["ID", "Product Name", "Quantity", "Unit", "Reorder Level", "Last Updated"];
    
    const data = reportData.map(item => [
      item.id,
      item.name,
      item.quantity.toString(),
      item.unit,
      item.reorderLevel.toString(),
      item.lastUpdated
    ]);
    
    exportToExcel(headers, data, 'inventory_report');
  };

  return (
    <div className="container p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isArabic ? "تقرير المخزون" : "Inventory Report"}</CardTitle>
          <Button onClick={handleExport}>
            <FileDown className="h-4 w-4 mr-2" />
            {isArabic ? "تصدير" : "Export"}
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isArabic ? "رقم" : "ID"}</TableHead>
                <TableHead>{isArabic ? "اسم المنتج" : "Product Name"}</TableHead>
                <TableHead>{isArabic ? "الكمية" : "Quantity"}</TableHead>
                <TableHead>{isArabic ? "الوحدة" : "Unit"}</TableHead>
                <TableHead>{isArabic ? "حد إعادة الطلب" : "Reorder Level"}</TableHead>
                <TableHead>{isArabic ? "آخر تحديث" : "Last Updated"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.reorderLevel}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryReport;
