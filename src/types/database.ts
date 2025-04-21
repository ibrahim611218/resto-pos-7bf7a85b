
import { Invoice, InvoiceStatus } from "./invoices";
import { User, UserRole } from "./auth";
import { Product, Category } from "./products";
import { Company } from "@/features/users/types";
import { KitchenOrder } from "./kitchen";
import { BusinessSettings } from "./settings";
import { PurchaseInvoice } from "./purchases";
import { Supplier } from "./purchases";

export interface IDatabaseService {
  // Invoices
  getInvoices: () => Promise<Invoice[]>;
  saveInvoice: (invoice: Invoice) => Promise<{ success: boolean; id?: string }>;
  updateInvoice: (invoice: Invoice) => Promise<{ success: boolean }>;
  
  // Settings
  getSettings: () => Promise<BusinessSettings>;
  saveSettings: (settings: BusinessSettings) => Promise<{ success: boolean }>;
  
  // Products
  getProducts: () => Promise<Product[]>;

  // Categories
  getCategories: () => Promise<Category[]>;
  deleteCategory: (categoryId: string) => Promise<boolean>;
  deleteAllCategories: () => Promise<boolean>;
  
  // Users
  getUsers: () => Promise<User[]>;
  saveUser: (user: User) => Promise<{ success: boolean; id?: string }>;
  updateUser: (user: User) => Promise<{ success: boolean }>;
  deleteUser: (userId: string) => Promise<{ success: boolean }>;
  updateUserPermissions: (userId: string, permissions: string[]) => Promise<{ success: boolean }>;
  updateUserPassword: (userId: string, newPassword: string) => Promise<{ success: boolean }>;

  // Companies
  getCompanies: () => Promise<Company[]>;
  saveCompany: (company: Company) => Promise<boolean>;
  updateCompany: (company: Company) => Promise<boolean>;
  deleteCompany: (companyId: string) => Promise<boolean>;

  // Purchases
  getPurchaseInvoices: () => Promise<PurchaseInvoice[]>;
  savePurchaseInvoice: (invoice: PurchaseInvoice) => Promise<{ success: boolean; id?: string }>;

  // Kitchen
  createKitchenOrder: (items: KitchenOrder) => Promise<{ success: boolean; id?: string }>;
  getKitchenOrders: () => Promise<KitchenOrder[]>;
}
