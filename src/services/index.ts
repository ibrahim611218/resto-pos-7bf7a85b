
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
import { UserWithPassword } from "@/features/users/types";
import { User } from "@/types";

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
  deleteCategory: async (categoryId: string) => {
    const result = await categoryService.deleteCategory(categoryId);
    return { success: result };
  },
  deleteAllCategories: async () => {
    const result = await categoryService.deleteAllCategories();
    return { success: result };
  },

  // User methods
  getUsers: userService.getUsers,
  saveUser: async (user) => {
    // Convert User to UserWithPassword if necessary
    const userWithProperties = {
      ...user,
      isActive: (user as UserWithPassword).isActive !== undefined ? 
        (user as UserWithPassword).isActive : true
    } as UserWithPassword;
    
    const result = await userService.saveUser(userWithProperties);
    return { success: !!result, id: user.id };
  },
  updateUser: async (user) => {
    // Convert User to UserWithPassword if necessary
    const userWithProperties = {
      ...user,
      isActive: (user as UserWithPassword).isActive !== undefined ? 
        (user as UserWithPassword).isActive : true
    } as UserWithPassword;
    
    const result = await userService.updateUser(userWithProperties);
    return { success: !!result };
  },
  deleteUser: async (userId) => {
    const result = await userService.deleteUser(userId);
    return { success: !!result };
  },
  updateUserPermissions: async (userId, permissions) => {
    const result = await userService.updateUserPermissions(userId, permissions);
    return { success: !!result };
  },
  updateUserPassword: async (userId, newPassword) => {
    const result = await userService.updateUserPassword(userId, newPassword);
    return { success: !!result };
  },

  // Company methods
  getCompanies: companyService.getCompanies,
  saveCompany: async (company) => {
    const result = await companyService.saveCompany(company);
    return { success: !!result, id: company.id };
  },
  updateCompany: async (company) => {
    const result = await companyService.updateCompany(company);
    return { success: !!result };
  },
  deleteCompany: async (companyId) => {
    const result = await companyService.deleteCompany(companyId);
    return { success: !!result };
  },

  // Purchases methods
  getPurchaseInvoices: purchasesService.getPurchaseInvoices,
  savePurchaseInvoice: async (invoice) => {
    const result = await purchasesService.savePurchaseInvoice(invoice);
    return { success: !!result, id: invoice.id };
  },

  // Kitchen methods
  createKitchenOrder: async (items) => {
    try {
      // Handle type conversion - createKitchenOrder expects an Invoice, but we're receiving a KitchenOrder
      // This is a workaround for the type mismatch
      const result = await kitchenOrderService.createKitchenOrder(items as any);
      return { success: true, id: result.id };
    } catch (error) {
      console.error("Error creating kitchen order:", error);
      return { success: false };
    }
  },
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
