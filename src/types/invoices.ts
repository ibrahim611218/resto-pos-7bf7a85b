
import { PaymentMethod } from './payment';
import { Customer } from './customers';

export interface Invoice {
  id: string;
  number: string;
  date: string;
  customerName: string;
  customerPhone: string;
  items: InvoiceItem[];
  totalAmount: number;
  discount: number;
  discountType?: "percentage" | "fixed";
  paymentMethod: PaymentMethod;
  cashierName: string;
  cashierId?: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  customer?: Customer;
  notes?: string;
  createdAt?: string;
  status?: "completed" | "cancelled" | "refunded" | "pending";
  orderType?: "takeaway" | "dineIn";
  tableNumber?: string;
  paidAmount: number;
  transferReceiptNumber?: string;
  taxIncluded?: boolean;
}

export interface InvoiceItem {
  id: string;
  name: string;
  nameAr?: string;
  quantity: number;
  price: number;
  size: string;
  productId?: string;
  variantId?: string;
  taxable?: boolean;
}

export type InvoiceExportType = "print" | "pdf" | "email";
