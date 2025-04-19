
export type Language = "en" | "ar";
export type UserRole = "owner" | "admin" | "supervisor" | "cashier" | "kitchen" | "manager";
export type ProductType = "single" | "sized";
export type Size = "small" | "medium" | "large" | "regular";
export type InvoiceExportType = "print" | "pdf" | "email";
export type PaymentMethod = "cash" | "card" | "online" | "transfer";
export type KitchenOrderStatus = "pending" | "in-progress" | "preparing" | "ready" | "completed" | "cancelled";
export type KitchenItemStatus = "pending" | "preparing" | "ready";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

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

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  price?: number;
  categoryId: string;
  image?: string;
  type: ProductType;
  taxable: boolean;
  variants: ProductVariant[];
  sizes?: string[];
}

export interface ProductVariant {
  id: string;
  size: Size;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  image?: string;
  imageUrl?: string;
}

export interface BusinessSettings {
  name: string;
  nameAr: string;
  taxNumber: string;
  address: string;
  addressAr: string;
  phone: string;
  email: string;
  taxRate: number;
  taxIncluded: boolean;
  invoiceNotesAr: string;
  invoiceNotes?: string;
  commercialRegisterAr?: string;
  commercialRegister?: string;
  logo?: string;
  workStartTime?: string;
  workEndTime?: string;
}

export interface Customer {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  taxNumber?: string;
  commercialRegister?: string;
  address?: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  productNameAr?: string;
  quantity: number;
  unit?: string;
  minLevel?: number;
  maxLevel?: number;
  lowStockThreshold: number;
  lastUpdated: string;
  categoryId: string;
}

export interface IDatabaseService {
  getInvoices: () => Promise<Invoice[]>;
  saveInvoice: (invoice: Invoice) => Promise<any>;
  updateInvoice: (invoice: Invoice) => Promise<any>;
  getSettings: () => Promise<BusinessSettings>;
  saveSettings: (settings: BusinessSettings) => Promise<any>;
  getProducts: () => Promise<Product[]>;
  getCategories: () => Promise<Category[]>;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  nameAr?: string;
  price: number;
  quantity: number;
  image?: string;
  size: Size | "regular";
  variantId: string;
  categoryId: string;
  taxable: boolean;
}

export interface KitchenOrderItem {
  id: string;
  name: string;
  nameAr?: string;
  quantity: number;
  notes?: string;
  status: KitchenItemStatus;
  size: string;
}

export interface KitchenOrder {
  id: string;
  invoiceId: string;
  items: KitchenOrderItem[];
  status: KitchenOrderStatus;
  orderType?: "takeaway" | "dineIn";
  tableNumber?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  cashierName?: string;
}

// Sales Report Types
export interface SalesByPaymentMethod {
  method: PaymentMethod;
  amount: number;
  count: number;
  percentage?: number;
  paymentMethod?: string;  // Added missing property for compatibility
}

export interface SalesByOrderType {
  type: "takeaway" | "dineIn";
  amount: number;
  count: number;
  percentage?: number;
  orderType?: string;  // Added missing property for compatibility
}

export interface TopSellingProduct {
  id: string;
  name: string;
  nameAr?: string;
  quantity: number;
  revenue: number;
  productId?: string;  // Added missing property for compatibility
  productName?: string; // Added missing property for compatibility
}

// VAT Report Types
export interface VatReportItem {
  id?: string;
  period: {
    startDate: Date;
    endDate: Date;
    type: string;
  };
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
  type?: string;
}

// Purchase Types
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
