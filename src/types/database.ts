
import { Invoice } from './invoices';
import { BusinessSettings } from './settings';
import { Product } from './products';
import { Category } from './products';
import { UserWithPassword } from '../features/users/types';
import { Company } from '../features/users/types';
import { PurchaseInvoice } from './purchases';
import { KitchenOrder } from './kitchen';

export interface IDatabaseService {
  getInvoices: () => Promise<Invoice[]>;
  saveInvoice: (invoice: Invoice) => Promise<any>;
  updateInvoice: (invoice: Invoice) => Promise<any>;
  getSettings: () => Promise<BusinessSettings>;
  saveSettings: (settings: BusinessSettings) => Promise<any>;
  getProducts: () => Promise<Product[]>;
  getCategories: () => Promise<Category[]>;
  
  // Category operations
  deleteCategory: (categoryId: string) => Promise<any>;
  deleteAllCategories: () => Promise<any>;
  
  // User management operations
  getUsers: () => Promise<UserWithPassword[]>;
  saveUser: (user: UserWithPassword) => Promise<any>;
  updateUser: (user: UserWithPassword) => Promise<any>;
  deleteUser: (userId: string) => Promise<any>;
  updateUserPermissions: (userId: string, permissions: string[]) => Promise<any>;
  updateUserPassword: (userId: string, hashedPassword: string) => Promise<any>;
  
  // Company management operations
  getCompanies: () => Promise<Company[]>;
  saveCompany: (company: Company) => Promise<any>;
  updateCompany: (company: Company) => Promise<any>;
  deleteCompany: (companyId: string) => Promise<any>;
  
  // Purchases operations
  getPurchaseInvoices: () => Promise<PurchaseInvoice[]>;
  savePurchaseInvoice: (invoice: PurchaseInvoice) => Promise<any>;
  
  // Kitchen operations
  createKitchenOrder: (invoice: Invoice) => Promise<KitchenOrder>;
  getKitchenOrders: () => Promise<KitchenOrder[]>;
}
