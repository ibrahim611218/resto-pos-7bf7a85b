
export type Language = "en" | "ar";
export type UserRole = "owner" | "admin" | "supervisor" | "cashier" | "kitchen";
export type ProductType = "single" | "sized";
export type Size = "small" | "medium" | "large";
export type InvoiceExportType = "print" | "pdf" | "email";

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
  paymentMethod: "cash" | "card" | "online";
  cashierName: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  customer?: Customer;
  notes?: string;
  createdAt?: string;
  status?: "completed" | "cancelled" | "refunded" | "pending";
}

export interface InvoiceItem {
  id: string;
  name: string;
  nameAr?: string;
  quantity: number;
  price: number;
  size: string;
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
