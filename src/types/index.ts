
export type Language = "en" | "ar";

export type UserRole = "admin" | "manager" | "cashier" | "kitchen" | "owner" | "supervisor";

export type Size = "small" | "medium" | "large";

export type ProductType = "food" | "drink" | "dessert" | "other" | "sized" | "single";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  image?: string;
}

export interface ProductVariant {
  id: string;
  size: Size;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  image?: string;
  categoryId: string;
  variants: ProductVariant[];
  taxable: boolean;
  type: ProductType;
  price?: number; // For single products without variants
  inStock?: number; // Quantity in stock
  lowStockThreshold?: number; // Threshold for low stock warning
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  nameAr?: string;
  variantId: string;
  size: Size;
  price: number;
  quantity: number;
  taxable: boolean;
}

export interface Customer {
  id?: string;
  name: string;
  phone?: string;
  email?: string;
  taxNumber?: string;
  commercialRegister?: string;
  address?: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: Date;
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  paymentMethod: "cash" | "card" | string;
  customer?: Customer;
  cashierId: string;
  cashierName: string;
  status: "completed" | "cancelled" | "refunded" | "pending";
  discount?: number;             // مبلغ الخصم أو نسبة الخصم
  discountType?: "percentage" | "fixed"; // نوع الخصم (نسبة مئوية أو مبلغ ثابت)
  orderType?: "takeaway" | "dineIn"; // نوع الطلب (سفري أو محلي)
  tableNumber?: string;          // رقم الطاولة (للطلبات المحلية)
}

export interface BusinessSettings {
  name: string;
  nameAr?: string;
  taxNumber: string;
  address: string;
  addressAr?: string;
  phone: string;
  email: string;
  logo?: string;
  taxRate: number;
  taxIncluded: boolean; // إضافة خيار جديد للتحكم في طريقة حساب الضريبة
  commercialRegister?: string;
  commercialRegisterAr?: string;
  invoiceNotes?: string;
  invoiceNotesAr?: string;
}

export interface ReportFilter {
  startDate?: Date;
  endDate?: Date;
  cashierId?: string;
  productId?: string;
  categoryId?: string;
}

// Kitchen Order Status Types
export type KitchenOrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled";

export type KitchenOrderItemStatus = KitchenOrderStatus;

export interface KitchenOrderItem {
  id: string;
  name: string;
  nameAr?: string;
  quantity: number;
  size: string;
  status: KitchenOrderItemStatus;
}

export interface KitchenOrder {
  id: string;
  invoiceId: string;
  status: KitchenOrderStatus;
  items: KitchenOrderItem[];
  createdAt: string;
  updatedAt: string;
}

// Inventory types
export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  productNameAr?: string;
  quantity: number;
  lowStockThreshold: number;
  lastUpdated: Date;
  categoryId: string;
}

// Invoice Export Options
export type InvoiceExportType = "print" | "pdf" | "email";

// Add payment methods type
export type PaymentMethod = "cash" | "card"; // نقدي أو شبكة

// Customer management types
export interface CustomerFilter {
  searchTerm?: string;
  sortBy?: "name" | "createdAt";
  sortDirection?: "asc" | "desc";
}

// Types for sales report data visualization
export interface SalesByPaymentMethod {
  paymentMethod: string;
  amount: number;
  percentage: number;
}

export interface SalesByOrderType {
  orderType: string;
  count: number;
  percentage: number;
}

export interface TopSellingProduct {
  productId: string;
  productName: string;
  quantity: number;
  revenue: number;
}

export interface SalesByTimeFrame {
  timeFrame: string;
  amount: number;
}
