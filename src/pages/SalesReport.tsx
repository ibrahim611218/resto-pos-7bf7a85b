
import React from "react";
import SalesReport from "@/features/reports/SalesReport";
import { ScrollArea } from "@/components/ui/scroll-area";

const SalesReportPage: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <SalesReport />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SalesReportPage;
