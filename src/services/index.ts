import { IDatabaseService } from "./types";
import invoiceService from "./invoices/InvoiceService";
import settingsService from "./settings/SettingsService";
import { isElectron } from "./base/BaseService";
import productService from './products/ProductService';
import categoryService from './categories/CategoryService';

// Create a combined service that implements all interfaces
const databaseService: IDatabaseService = {
  // Invoice methods
  getInvoices: invoiceService.getInvoices,
  saveInvoice: invoiceService.saveInvoice,
  updateInvoice: invoiceService.updateInvoice,
  
  // Settings methods
  getSettings: settingsService.getSettings,
  saveSettings: settingsService.saveSettings,
  
  // Product methods
  getProducts: async () => {
    if (window.db) {
      return await window.db.getProducts();
    }
    return productService.getProducts();
  },
  
  // Category methods
  getCategories: async () => {
    if (window.db) {
      return await window.db.getCategories();
    }
    return categoryService.getCategories();
  },
};

export default databaseService;
export { isElectron };
export { default as invoiceService } from "./invoices/InvoiceService";
export { default as settingsService } from "./settings/SettingsService";
export {
  productService,
  categoryService
};
