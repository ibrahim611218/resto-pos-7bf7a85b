
import React from "react";
import InventoryReport from "@/features/reports/inventory-report/InventoryReport";
import { ScrollArea } from "@/components/ui/scroll-area";

const InventoryReportPage: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <InventoryReport />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default InventoryReportPage;
