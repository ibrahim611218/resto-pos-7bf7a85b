
import { Invoice } from "@/types";

export interface ExportPDFProps {
  filteredInvoices: Invoice[];
  totalSales: number;
  startDate?: Date;
  endDate?: Date;
  isArabic: boolean;
}
