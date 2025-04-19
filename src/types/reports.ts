
// Define report types
export interface SalesByPaymentMethod {
  method: string;
  total: number;
}

export interface SalesByOrderType {
  type: string;
  total: number;
}

export interface TopSellingProduct {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
}

export interface VatReportPeriod {
  startDate: string | Date;
  endDate: string | Date;
  type: "monthly" | "quarterly" | "annual"; // Making type required
}

export interface VatReportItem {
  totalSalesBeforeTax: number;
  salesTax: number;
  totalPurchasesBeforeTax: number;
  purchasesTax: number;
  netTaxDue: number;
  period: VatReportPeriod;
}
