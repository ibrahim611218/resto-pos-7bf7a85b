
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { InventoryItem } from "../types";
import InventoryTableHeader from "./table/InventoryTableHeader";
import InventoryTableColumns from "./table/InventoryTableColumns";
import InventoryTableRow from "./table/InventoryTableRow";

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
      <InventoryTableHeader isArabic={isArabic} ExportButtons={ExportButtons} />
      <CardContent>
        <Table>
          <InventoryTableColumns isArabic={isArabic} />
          <TableBody>
            {inventoryData.map((item) => (
              <InventoryTableRow 
                key={item.id}
                item={item}
                isArabic={isArabic}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;
