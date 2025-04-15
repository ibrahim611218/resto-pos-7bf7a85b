
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface InventoryTableHeaderProps {
  isArabic: boolean;
  ExportButtons: React.ReactNode;
}

const InventoryTableHeader: React.FC<InventoryTableHeaderProps> = ({
  isArabic,
  ExportButtons,
}) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>{isArabic ? "تقرير المخزون" : "Inventory Report"}</CardTitle>
      <div className="flex gap-2">{ExportButtons}</div>
    </CardHeader>
  );
};

export default InventoryTableHeader;
