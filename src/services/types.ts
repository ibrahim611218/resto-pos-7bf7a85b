
import { Invoice, BusinessSettings, Product, Category } from "@/types";
import { IInvoiceService } from "./invoices/InvoiceService";
import { ISettingsService } from "./settings/SettingsService";

// Define a type for our database service
export interface IDatabaseService extends IInvoiceService, ISettingsService {
  // Product methods
  getProducts: () => Promise<Product[]>;
  
  // Category methods
  getCategories: () => Promise<Category[]>;
}
