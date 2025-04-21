import { mockProducts } from "@/features/pos/data/mockData";
import { sampleCategories } from "@/data/sampleData";
import { mockInvoices } from "@/features/invoices/data/mockInvoices";
import { mockCustomers } from "@/features/customers/hooks/useCustomers";
import categoryService from "@/services/categories/CategoryService";

export const deleteAllProducts = () => {
  localStorage.removeItem('products');
  localStorage.removeItem('stored-products');
  mockProducts.length = 0;
  window.dispatchEvent(new CustomEvent('product-updated'));
};

export const deleteAllCategories = async () => {
  try {
    console.log('Deleting all categories');
    const success = await categoryService.deleteAllCategories();
    
    if (success) {
      // Dispatch events to ensure UI updates
      window.dispatchEvent(new CustomEvent('category-updated'));
      window.dispatchEvent(new CustomEvent('data-updated'));
      return true;
    } else {
      console.error('Failed to delete all categories');
      return false;
    }
  } catch (error) {
    console.error('Error deleting all categories:', error);
    return false;
  }
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

export const deleteAllPurchases = () => {
  localStorage.removeItem('stored-purchases');
  localStorage.removeItem('stored-suppliers');
};

export const deleteAllData = () => {
  if (confirm('هل أنت متأكد من حذف جميع البيانات؟')) {
    deleteAllProducts();
    deleteAllCategories();
    deleteAllInventory(); 
    deleteAllInvoices();
    deleteAllCustomers();
    deleteKitchenData();
    deleteVatReports();
    deleteAllUsers();
    deleteAllPurchases();
    
    localStorage.removeItem('business-settings');
    localStorage.removeItem('display-settings');
    localStorage.removeItem('stored-settings');
    
    localStorage.removeItem('defaultProducts');
    localStorage.removeItem('defaultCategories');
    localStorage.removeItem('defaultInventory');
    localStorage.removeItem('lastInvoiceNumber');
    
    // Final refresh of UI
    window.dispatchEvent(new CustomEvent('data-updated'));
  }
};
