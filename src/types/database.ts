
import { Invoice } from './invoices';
import { BusinessSettings } from './settings';
import { Product } from './products';
import { Category } from './products';

export interface IDatabaseService {
  getInvoices: () => Promise<Invoice[]>;
  saveInvoice: (invoice: Invoice) => Promise<any>;
  updateInvoice: (invoice: Invoice) => Promise<any>;
  getSettings: () => Promise<BusinessSettings>;
  saveSettings: (settings: BusinessSettings) => Promise<any>;
  getProducts: () => Promise<Product[]>;
  getCategories: () => Promise<Category[]>;
}
