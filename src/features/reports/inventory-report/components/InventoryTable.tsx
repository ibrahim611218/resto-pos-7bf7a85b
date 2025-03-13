
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";
import { InventoryItem } from "../types";
import { calculateInventoryPercentage, getInventoryStatusColor } from "../utils/inventory-utils";

interface InventoryTableProps {
  inventoryData: InventoryItem[];
  isArabic: boolean;
  ExportButtons: React.ReactNode;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  inventoryData,
  isArabic,
  ExportButtons,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{isArabic ? "تقرير المخزون" : "Inventory Report"}</CardTitle>
        <div className="flex gap-2">
          {ExportButtons}
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
              const displayName = isArabic && item.productNameAr ? item.productNameAr : (item.productName || item.name);
              
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{displayName}</TableCell>
                  <TableCell>{item.quantity.toFixed(2)}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.reorderLevel}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell className={statusColor}>
                    {`${percentage}%`}
                    {statusColor === "text-yellow-600" && <AlertTriangle className="inline ml-2 h-4 w-4 text-yellow-500" />}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;
