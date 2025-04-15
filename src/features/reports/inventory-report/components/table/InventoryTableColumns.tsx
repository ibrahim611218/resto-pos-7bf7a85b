
import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

interface InventoryTableColumnsProps {
  isArabic: boolean;
}

const InventoryTableColumns: React.FC<InventoryTableColumnsProps> = ({ isArabic }) => {
  return (
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
  );
};

export default InventoryTableColumns;
