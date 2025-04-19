export type Language = "en" | "ar";

export interface Invoice {
  id: string;
  number: string;
  date: string;
  customerName: string;
  customerPhone: string;
  items: InvoiceItem[];
  totalAmount: number;
  discount: number;
  paymentMethod: "cash" | "card" | "online";
  cashierName: string;
  notes?: string;
  createdAt?: string;
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
  price: number;
  categoryId: string;
  imageUrl?: string;
  sizes: string[];
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
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
  workStartTime?: string;  // New field
  workEndTime?: string;    // New field
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
