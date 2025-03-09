
export type Language = "en" | "ar";

export type UserRole = "admin" | "manager" | "cashier" | "kitchen";

export type Size = "small" | "medium" | "large";

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
}

export interface Invoice {
  id: string;
  number: string;
  date: Date;
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  paymentMethod: string;
  customer?: Customer;
  cashierId: string;
  cashierName: string;
  status: "completed" | "cancelled" | "refunded";
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
}

export interface ReportFilter {
  startDate?: Date;
  endDate?: Date;
  cashierId?: string;
  productId?: string;
  categoryId?: string;
}
