
import { Invoice, BusinessSettings, Product, Category } from "@/types";
import { IInvoiceService } from "./invoices/InvoiceService";
import { ISettingsService } from "./settings/SettingsService";
import { UserWithPassword } from "@/features/users/types";

// Define a type for our database service
export interface IDatabaseService extends IInvoiceService, ISettingsService {
  // Product methods
  getProducts: () => Promise<Product[]>;
  
  // Category methods
  getCategories: () => Promise<Category[]>;
  
  // User management methods
  getUsers: () => Promise<UserWithPassword[]>;
  saveUser: (user: UserWithPassword) => Promise<any>;
  updateUser: (user: UserWithPassword) => Promise<any>;
  deleteUser: (userId: string) => Promise<any>;
  updateUserPermissions: (userId: string, permissions: string[]) => Promise<any>;
  updateUserPassword: (userId: string, hashedPassword: string) => Promise<any>;
}
