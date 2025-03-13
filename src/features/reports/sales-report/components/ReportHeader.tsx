
import React from "react";
import ReportActions from "./ReportActions";
import { Invoice } from "@/types";

interface ReportHeaderProps {
  title: string;
  filteredInvoices: Invoice[];
  totalSales: number;
  startDate?: Date;
  endDate?: Date;
  isArabic: boolean;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  title,
  filteredInvoices,
  totalSales,
  startDate,
  endDate,
  isArabic
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <ReportActions
        filteredInvoices={filteredInvoices}
        totalSales={totalSales}
        startDate={startDate}
        endDate={endDate}
        isArabic={isArabic}
      />
    </div>
  );
};

export default ReportHeader;
