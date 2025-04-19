
import { PaymentMethod } from './payment';

export interface SalesByPaymentMethod {
  method: PaymentMethod;
  amount: number;
  count: number;
  percentage?: number;
}

export interface SalesByOrderType {
  type: "takeaway" | "dineIn";
  amount: number;
  count: number;
  percentage?: number;
}

export interface TopSellingProduct {
  id: string;
  name: string;
  nameAr?: string;
  quantity: number;
  revenue: number;
}

export interface VatReportItem {
  id?: string;
  period: VatReportPeriod;
  totalSalesBeforeTax: number;
  salesTax: number;
  totalPurchasesBeforeTax: number;
  purchasesTax: number;
  netTaxDue: number;
  createdAt?: string;
  status?: "draft" | "submitted" | "approved";
}

export interface VatReportPeriod {
  startDate: Date;
  endDate: Date;
  type: string;
}
