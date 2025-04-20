
import { mockProducts } from "@/features/pos/data/mockData";
import { sampleCategories } from "@/data/sampleData";
import { mockInvoices } from "@/features/invoices/data/mockInvoices";
import { mockCustomers } from "@/features/customers/hooks/useCustomers";

export const deleteAllProducts = () => {
  localStorage.removeItem('products');
  localStorage.removeItem('stored-products');
  mockProducts.length = 0;
};

export const deleteAllCategories = () => {
  localStorage.removeItem('categories');
  localStorage.removeItem('stored-categories');
  sampleCategories.length = 0;
};

export const deleteAllInventory = () => {
  localStorage.removeItem('inventory-items');
  localStorage.removeItem('stored-inventory');
  localStorage.removeItem('defaultInventory');
};

export const deleteAllInvoices = () => {
  localStorage.removeItem('invoices');
  localStorage.removeItem('stored-invoices');
  localStorage.setItem('lastInvoiceNumber', '0');
  mockInvoices.length = 0;
};

export const deleteAllCustomers = () => {
  localStorage.removeItem('customers');
  localStorage.removeItem('stored-customers');
  mockCustomers.length = 0;
};

export const deleteKitchenData = () => {
  localStorage.removeItem('kitchenOrders');
  localStorage.removeItem('completed-kitchen-orders');
  localStorage.removeItem('stored-kitchen-orders');
};

export const deleteVatReports = () => {
  localStorage.removeItem('stored-vat-reports');
};

export const deleteAllUsers = () => {
  const systemAdminKey = 'system_admin_initialized';
  const systemAdminInitialized = localStorage.getItem(systemAdminKey);
  
  localStorage.removeItem('stored-users');
  localStorage.removeItem('user_permissions_data');
  
  if (systemAdminInitialized) {
    localStorage.setItem(systemAdminKey, 'true');
  }
};

export const deleteAllData = () => {
  deleteAllProducts();
  deleteAllCategories();
  deleteAllInventory(); 
  deleteAllInvoices();
  deleteAllCustomers();
  deleteKitchenData();
  deleteVatReports();
  deleteAllUsers();
  
  localStorage.removeItem('business-settings');
  localStorage.removeItem('display-settings');
  localStorage.removeItem('stored-settings');
  
  localStorage.removeItem('defaultProducts');
  localStorage.removeItem('defaultCategories');
  localStorage.removeItem('defaultInventory');
  localStorage.removeItem('lastInvoiceNumber');
};
