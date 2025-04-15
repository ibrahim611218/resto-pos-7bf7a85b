
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";
import { InventoryItem } from "../../types";
import { calculateInventoryPercentage, getInventoryStatusColor } from "../../utils/inventory-utils";

interface InventoryTableRowProps {
  item: InventoryItem;
  isArabic: boolean;
}

const InventoryTableRow: React.FC<InventoryTableRowProps> = ({ item, isArabic }) => {
  const percentage = calculateInventoryPercentage(item.quantity, item.originalQuantity);
  const statusColor = getInventoryStatusColor(percentage);
  const displayName = isArabic && item.productNameAr ? item.productNameAr : (item.productName || item.name);

  return (
    <TableRow>
      <TableCell>{item.id}</TableCell>
      <TableCell>{displayName}</TableCell>
      <TableCell>{item.quantity.toFixed(2)}</TableCell>
      <TableCell>{item.unit}</TableCell>
      <TableCell>{item.reorderLevel}</TableCell>
      <TableCell>{item.lastUpdated}</TableCell>
      <TableCell className={statusColor}>
        {`${percentage}%`}
        {statusColor === "text-yellow-600" && (
          <AlertTriangle className="inline ml-2 h-4 w-4 text-yellow-500" />
        )}
      </TableCell>
    </TableRow>
  );
};

export default InventoryTableRow;
