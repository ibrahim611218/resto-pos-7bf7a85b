
export interface PurchaseInvoice {
  id: string;
  invoiceNumber: string;
  supplier: Supplier;
  date: Date;
  items: PurchaseItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  notes?: string;
  paymentStatus: "paid" | "pending" | "partial";
  paymentMethod: "cash" | "card" | "transfer";
  createdBy: string;
  createdAt: Date;
}

export interface PurchaseItem {
  id: string;
  productId: string;
  productName: string;
  productNameAr?: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  totalPrice: number;
}

export interface Supplier {
  id: string;
  name: string;
  nameAr?: string;
  phone?: string;
  email?: string;
  taxNumber?: string;
  address?: string;
  contactPerson?: string;
}
