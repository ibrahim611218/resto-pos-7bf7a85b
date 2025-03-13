
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { exportToExcel } from "@/utils/reports/export";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// نمط المنتج في المخزون
interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  lastUpdated: string;
  originalQuantity?: number; // الكمية الأصلية قبل البيع
}

// بيانات المخزون الأولية
const initialInventoryData: InventoryItem[] = [
  { id: "1", name: "دجاج", quantity: 25, unit: "كيلو", reorderLevel: 10, lastUpdated: "2023-08-10" },
  { id: "2", name: "لحم بقري", quantity: 15, unit: "كيلو", reorderLevel: 5, lastUpdated: "2023-08-12" },
  { id: "3", name: "أرز", quantity: 50, unit: "كيلو", reorderLevel: 15, lastUpdated: "2023-08-05" },
  { id: "4", name: "زيت", quantity: 30, unit: "لتر", reorderLevel: 10, lastUpdated: "2023-08-07" },
  { id: "5", name: "طماطم", quantity: 20, unit: "كيلو", reorderLevel: 8, lastUpdated: "2023-08-11" },
];

// خريطة تربط معرفات المنتجات بالمكونات
const productIngredients: Record<string, { ingredientId: string, amount: number }[]> = {
  "product1": [
    { ingredientId: "1", amount: 0.5 }, // دجاج
    { ingredientId: "3", amount: 0.25 } // أرز
  ],
  "product2": [
    { ingredientId: "2", amount: 0.3 }, // لحم بقري
    { ingredientId: "5", amount: 0.2 }  // طماطم
  ],
  "product3": [
    { ingredientId: "4", amount: 0.1 }, // زيت
    { ingredientId: "5", amount: 0.15 } // طماطم
  ]
};

const InventoryReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { invoices } = useInvoices();
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  
  // تحديث المخزون بناءً على الفواتير
  useEffect(() => {
    // نبدأ بنسخة من البيانات الأولية
    const updatedInventory = initialInventoryData.map(item => ({
      ...item,
      originalQuantity: item.quantity // حفظ الكمية الأصلية
    }));
    
    // تحديث المخزون بناءً على المنتجات المباعة
    if (invoices && invoices.length > 0) {
      invoices.forEach(invoice => {
        // تحديد المضاعف بناءً على حالة الفاتورة (مسترجعة أم لا)
        const multiplier = invoice.status === "refunded" ? 1 : -1; // عند الاسترجاع نضيف للمخزون، وعند البيع نخصم
        
        invoice.items.forEach(item => {
          // البحث عن مكونات المنتج
          const ingredients = productIngredients[item.productId];
          if (ingredients) {
            ingredients.forEach(ingredient => {
              // البحث عن المكون في المخزون
              const inventoryIndex = updatedInventory.findIndex(inv => inv.id === ingredient.ingredientId);
              if (inventoryIndex !== -1) {
                // تحديث الكمية في المخزون
                updatedInventory[inventoryIndex].quantity += multiplier * ingredient.amount * item.quantity;
                updatedInventory[inventoryIndex].lastUpdated = new Date().toISOString().split('T')[0];
              }
            });
          }
        });
      });
    }
    
    // تحديث حالة المخزون
    setInventoryData(updatedInventory);
  }, [invoices]);
  
  const calculateInventoryPercentage = (current: number, original: number | undefined): number => {
    if (!original || original === 0) return 100;
    return Math.round((current / original) * 100);
  };
  
  const getInventoryStatusColor = (percentage: number): string => {
    if (percentage < 20) return "text-red-600";
    if (percentage < 50) return "text-yellow-600";
    return "text-green-600";
  };

  const handleExport = () => {
    const headers = isArabic 
      ? ["رقم", "اسم المنتج", "الكمية", "الوحدة", "حد إعادة الطلب", "آخر تحديث", "نسبة المخزون"]
      : ["ID", "Product Name", "Quantity", "Unit", "Reorder Level", "Last Updated", "Inventory %"];
    
    const data = inventoryData.map(item => [
      item.id,
      item.name,
      item.quantity.toFixed(2),
      item.unit,
      item.reorderLevel.toString(),
      item.lastUpdated,
      `${calculateInventoryPercentage(item.quantity, item.originalQuantity)}%`
    ]);
    
    exportToExcel(headers, data, 'inventory_report');
  };
  
  const handleExportPDF = () => {
    const doc = new jsPDF(isArabic ? "p" : "p", "mm", "a4");
    
    // إضافة عنوان التقرير
    doc.setFontSize(18);
    const title = isArabic ? "تقرير المخزون" : "Inventory Report";
    doc.text(title, isArabic ? 170 : 20, 20, isArabic ? { align: "right" } : undefined);
    
    // إنشاء البيانات للجدول
    const tableData = inventoryData.map(item => [
      item.id,
      item.name,
      item.quantity.toFixed(2),
      item.unit,
      item.reorderLevel.toString(),
      item.lastUpdated,
      `${calculateInventoryPercentage(item.quantity, item.originalQuantity)}%`
    ]);
    
    // إنشاء الجدول
    // @ts-ignore
    doc.autoTable({
      startY: 30,
      head: [[
        isArabic ? "رقم" : "ID",
        isArabic ? "اسم المنتج" : "Product Name",
        isArabic ? "الكمية" : "Quantity",
        isArabic ? "الوحدة" : "Unit",
        isArabic ? "حد إعادة الطلب" : "Reorder Level",
        isArabic ? "آخر تحديث" : "Last Updated",
        isArabic ? "نسبة المخزون" : "Inventory %"
      ]],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] },
      styles: { 
        font: 'helvetica',
        halign: isArabic ? 'right' : 'left',
        textColor: [0, 0, 0]
      }
    });
    
    // حفظ الملف
    doc.save("inventory_report.pdf");
  };

  return (
    <div className="container p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isArabic ? "تقرير المخزون" : "Inventory Report"}</CardTitle>
          <div className="flex gap-2">
            <Button onClick={handleExport}>
              <FileDown className="h-4 w-4 mr-2" />
              {isArabic ? "تصدير Excel" : "Export Excel"}
            </Button>
            <Button onClick={handleExportPDF} variant="outline">
              <FileDown className="h-4 w-4 mr-2" />
              {isArabic ? "تصدير PDF" : "Export PDF"}
            </Button>
          </div>
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
                <TableHead>{isArabic ? "نسبة المخزون" : "Inventory %"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => {
                const percentage = calculateInventoryPercentage(item.quantity, item.originalQuantity);
                const statusColor = getInventoryStatusColor(percentage);
                
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity.toFixed(2)}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.reorderLevel}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell className={statusColor}>
                      {`${percentage}%`}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryReport;
