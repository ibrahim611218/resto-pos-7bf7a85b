
import { IDatabaseService } from "@/types/database";
import invoiceService from "./invoices/InvoiceService";
import settingsService from "./settings/SettingsService";
import { isElectron } from "./base/BaseService";
import productService from './products/ProductService';
import categoryService from './categories/CategoryService';
import userService from './users/UserService';
import companyService from './companies/CompanyService';
import purchasesService from './purchases/PurchasesService';
import kitchenOrderService from './kitchen/KitchenOrderService';

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
    return productService.getProducts();
  },
  
  // Category methods
  getCategories: async () => {
    return categoryService.getCategories();
  },

  // User methods
  getUsers: userService.getUsers,
  saveUser: userService.saveUser,
  updateUser: userService.updateUser,
  deleteUser: userService.deleteUser,
  updateUserPermissions: userService.updateUserPermissions,
  updateUserPassword: userService.updateUserPassword,

  // Company methods
  getCompanies: companyService.getCompanies,
  saveCompany: companyService.saveCompany,
  updateCompany: companyService.updateCompany,
  deleteCompany: companyService.deleteCompany,

  // Purchases methods
  getPurchaseInvoices: purchasesService.getPurchaseInvoices,
  savePurchaseInvoice: purchasesService.savePurchaseInvoice,

  // Kitchen methods
  createKitchenOrder: kitchenOrderService.createKitchenOrder,
  getKitchenOrders: kitchenOrderService.getKitchenOrders
};

export default databaseService;
export { isElectron };
export { default as invoiceService } from "./invoices/InvoiceService";
export { default as settingsService } from "./settings/SettingsService";
export {
  productService,
  categoryService,
  userService,
  companyService,
  purchasesService,
  kitchenOrderService
};
