
import React from "react";
import ExpensesReport from "@/features/reports/expenses-report/ExpensesReport";
import { ScrollArea } from "@/components/ui/scroll-area";

const ExpensesReportPage: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <ExpensesReport />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ExpensesReportPage;
